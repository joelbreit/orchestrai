import Logger from "../services/Logger";

const voiceLineStartRegex = /^[a-gz{|%w"()}[]/i;
// const nonNoteNotationRegex = /[[\]:|\\n]/i;

// TODO '|'s can appear inside of ( )'s
// TODO deal with obvious octave errors
// TODO Voice names can be different for the same voice
// TODO remove ||'s

class ABCNotation {
	constructor(abcNotation) {
		this.warnings = [];
		this.failed = false;
		try {
			this.abcNotation = this.cleanUpNotation(abcNotation);
			this.title = this.extractTitle();
			this.voices = new Map(); // map of voice names to all the text in that voice
			this.measureTextMatrix = [];
			this.measureBeatsMatrix = [];
			this.parse();
			// TODO log if there are any outstanding issues

			this.numFixes = 0;

			// TODO deal with mismatched # of measures
			const sameNumMeasures = this.measureTextMatrix.every(
				(measures) =>
					measures.length === this.measureTextMatrix[0].length
			);
			if (!sameNumMeasures) {
				const measureNumbers = this.measureTextMatrix.map(
					(measures) => measures.length
				);
				const error = `Error: mismatched number of measures between voices. Measure numbers: ${measureNumbers}`;
				Logger.error(error);
				this.warnings.push(error);
			}

			if (this.measureTextMatrix.length > 1) {
				// There are multiple voices

				for (const voice of this.measureTextMatrix) {
					for (const measure of voice) {
						if (measure.includes("/")) {
							const index = measure.indexOf("/");
							const numPriorQuotes = measure
								.slice(0, index)
								.split('"').length;
							if (numPriorQuotes % 2 !== 0) {
								// '/' is not in a chord
								const error = `Error: composition contains '/' syntax which cannot be addressed by this parser`;
								this.warnings.push(error);
								throw error;
							}
						}
					}
				}
				this.fixBadMeasures();
				this.fixMismatchedRepeats();
			}
			this.parse();
		} catch (error) {
			this.failed = true;
			Logger.debug("ABCNotationParser: ", this);
			Logger.error("Error in ABCNotationParser: " + error);
			this.warnings.push("Unexpected error in ABCNotationParser: " + error);
		}
	}

	parse() {
		this.voices = new Map();
		this.measureTextMatrix = [];
		this.measureBeatsMatrix = [];
		const voiceLines = this.getRelevantLines();
		this.organizeVoices(voiceLines);
		this.populateTextMatrix();
		this.populateBeatsMatrix();
	}

	cleanUpNotation(text) {
		let lines = text.split("\n");
		const originalNumLines = lines.length;
		// Add new lines after ] characters if they appear in the first 10 characters
		for (const line of lines) {
			if (line.slice(0, 10).includes("]")) {
				const index = line.indexOf("]");
				lines.splice(lines.indexOf(line) + 1, 0, line.slice(index + 1));
				lines[lines.indexOf(line)] = line.slice(0, index + 1);
			}
		}
		// Remove leading and trailing whitespace
		lines = lines.map((line) => line.trim());
		// Remove empty lines
		lines = lines.filter((line) => line !== "");
		// Lines that start with "w" are words, not notes
		// lines = lines.filter((line) => !line.startsWith("w"));

		const cleanedText = lines.join("\n");
		const newNumLines = cleanedText.split("\n").length;
		const numLinesRemoved = originalNumLines - newNumLines;
		if (numLinesRemoved > 0) {
			// TODO log each line that was removed
			Logger.debug(
				`Cleaned up notation: removed ${numLinesRemoved} lines`
			);
			this.numFixes += numLinesRemoved;
		}
		return cleanedText;
	}

	extractTitle() {
		try {
			const titleMatch = this.abcNotation.match(/^T:(.*)$/m);
			return titleMatch ? titleMatch[1].trim() : "Untitled";
		} catch (error) {
			Logger.error("Error in extractTitle: " + error);
			this.warnings.push("Unexpected error in extractTitle: " + error);
			return "Untitled";
		}
	}

	/* 	Takes the entire ABC notation text and returns the lines that
		aren't comments, words, or redundant voice names */
	getRelevantLines() {
		let lines = this.abcNotation.split("\n");
		// Remove empty lines
		lines = lines.filter((line) => line !== "");
		// Lines that start with "%" are comments
		lines = lines.filter((line) => !line.startsWith("%"));
		// Lines that start with "w" are words, not notes
		lines = lines.filter((line) => !line.startsWith("w"));
		/* 
			Remove all consecutive lines that start with "V"
			This only occurs when the voices are redundantly named
			at the top of the file
		*/
		if (lines.some((line) => line.startsWith("V:"))) {
			let index = lines.findIndex((line) => line.startsWith("V:"));
			let areConsecutive = false;
			while (lines[index + 1].startsWith("V:")) {
				lines.splice(index + 1, 1);
				areConsecutive = true;
			}
			if (areConsecutive) {
				lines.splice(index, 1);
			}
		}
		return lines;
	}

	/*
	 */
	organizeVoices(lines) {
		let line = "";
		// Break up
		for (let i = 0; i < lines.length; i++) {
			line = lines[i];
			if (line.startsWith("[V:") || line.startsWith("V:")) {
				i += this.readVoiceSection(lines, i);
			}
		}
	}

	populateTextMatrix() {
		for (let [, voice] of this.voices) {
			const measures = this.breakVoiceIntoMeasures(voice);
			this.measureTextMatrix.push(measures);
		}
	}

	populateBeatsMatrix() {
		for (let i = 0; i < this.measureTextMatrix.length; i++) {
			// For each voice
			const measures = this.measureTextMatrix[i];
			let beats = [];
			for (let j = 0; j < measures.length; j++) {
				// For each measure
				const measure = measures[j];
				let measureBeats = 0;
				let anyNotesSoFar = false;
				for (let k = 0; k < measure.length; k++) {
					// For each character in measure
					const currentChar = measure[k];
					if (currentChar.match(/[a-gz]/i)) {
						measureBeats += 1;
						anyNotesSoFar = true;
					} else if (currentChar === "(") {
						// Deal with triplets
						let sum = 0;
						while (sum < 3) {
							if (measure[k].match(/[a-gz2]/i)) {
								// The number could only ever be 2, right?
								sum += 1;
							}
							k++;
						}
					} else if (currentChar.match(/[2-9]/i) && anyNotesSoFar) {
						// Checks if there are any notes yet in the measure
						// because numbers can be used at the beginning of a
						// measure to indicate ending numbers
						// May have to deal with note lengths longer than 9 in the future
						measureBeats += parseInt(currentChar) - 1;
					} else if (currentChar === '"') {
						// Exclude chord names in quotes
						do {
							k++;
						} while (measure[k] !== '"');
					} else if (
						currentChar === "[" &&
						measure[k + 1].match(/[a-gz]/i)
					) {
						// Parse chords
						// get everything up to the closing bracket
						let chord = "";
						while (measure[k] !== "]") {
							chord += measure[k];
							k++;
						}
						let chordBeats = 0;
						// If there are numbers set the chordBeats to the first number
						if (chord.match(/[2-9]/i)) {
							chordBeats = parseInt(chord.match(/[2-9]/i)[0]);
						} else {
							chordBeats = 1;
						}
						measureBeats += chordBeats;
					}
				}
				beats.push(measureBeats);
			}
			// Remove any 0s from the beats array
			beats = beats.filter((beat) => beat !== 0);
			this.measureBeatsMatrix.push(beats);
		}
		// Logger.log(`Measures matrix: ${this.measureTextMatrix}`);
	}

	readVoiceSection(lines, index) {
		let text = "";
		let name = lines[index];
		// Up to the first space is the voice name
		if (name.includes(" ")) {
			name = name.slice(0, name.indexOf(" "));
		}
		let linesAdvanced = 0;
		for (let i = index + 1; i < lines.length; i++) {
			let line = lines[i];
			let firstChar = line.charAt(0);

			if (
				firstChar.match(voiceLineStartRegex) &&
				!line.startsWith("[V")
			) {
				text += line + "\n";
				linesAdvanced++;
			} else {
				break;
			}
		}
		// If a voice with that name exists, add to it, otherwise create a new voice
		if (this.voices.has(name)) {
			this.voices.set(name, this.voices.get(name) + text);
		} else {
			this.voices.set(name, text);
		}
		return linesAdvanced;
	}

	breakVoiceIntoMeasures(voiceText) {
		let buffer = "";
		let measures = [];
		for (let i = 0; i < voiceText.length; i++) {
			const currentChar = voiceText[i];
			if (currentChar === "|") {
				measures.push(buffer);
				buffer = "";
				// } else if (currentChar === "\"") {
				// 	// Exclude chord names in quotes
				// 	while (voiceText[i] !== "\"") {
				// 		i++;
				// 	}
				// } else if (!currentChar.match(nonNoteNotationRegex)) {
				// 	buffer += currentChar;
				// }
			} else {
				buffer += currentChar;
			}
		}
		// Remove any measure that doesn't have an a-g, or z
		measures = measures.filter((measure) => measure.match(/[a-gz]/i));
		return measures;
	}

	getMostCommonMeasureLength() {
		let lengths = [];
		for (let i = 0; i < this.measureBeatsMatrix.length; i++) {
			const beats = this.measureBeatsMatrix[i];
			for (let j = 0; j < beats.length; j++) {
				const beat = beats[j];
				if (!lengths.includes(beat)) {
					lengths.push(beat);
				}
			}
		}
		let mostCommonLength = 0;
		let mostCommonLengthCount = 0;
		for (let i = 0; i < lengths.length; i++) {
			const length = lengths[i];
			let count = 0;
			for (let j = 0; j < this.measureBeatsMatrix.length; j++) {
				const beats = this.measureBeatsMatrix[j];
				for (let k = 0; k < beats.length; k++) {
					const beat = beats[k];
					if (beat === length) {
						count++;
					}
				}
			}
			if (count > mostCommonLengthCount) {
				mostCommonLength = length;
				mostCommonLengthCount = count;
			}
		}
		return mostCommonLength;
	}

	fixBadMeasures() {
		this.getMostCommonMeasureLength();
		let pickupMeasures = [];
		let shortMeasures = [];
		let longMeasures = [];
		for (let i = 0; i < this.measureBeatsMatrix.length; i++) {
			const beats = this.measureBeatsMatrix[i];
			for (let j = 0; j < beats.length; j++) {
				let beat = beats[j];
				if (beat !== this.getMostCommonMeasureLength()) {
					// Measure has a different length than the most common length
					let halfMeasureLength =
						this.getMostCommonMeasureLength() / 2;
					// If length is closer to 0 than the most common length, it's a pickup measure
					if (beat < halfMeasureLength) {
						pickupMeasures.push([i, j]);
						Logger.debug(`Found pickup measure: ${beat} beats`);
					} else if (beat < this.getMostCommonMeasureLength()) {
						shortMeasures.push([i, j]);
						Logger.debug(`Found short measure: ${beat} beats`);
					} else {
						longMeasures.push([i, j]);
						Logger.debug(`Found long measure: ${beat} beats`);
					}
				}
			}
		}
		// TODO deal with pickup measures
		for (let i = 0; i < pickupMeasures.length; i++) {
			const measure = pickupMeasures[i];
			const voiceIndex = measure[0];
			const measureIndex = measure[1];
			const beats = this.measureBeatsMatrix[voiceIndex][measureIndex];
			// Check if other voices have the same length measure
			// let allMatch = true;
			for (let j = 0; j < this.measureBeatsMatrix.length; j++) {
				if (this.measureBeatsMatrix[j][measureIndex] !== beats) {
					// allMatch = false;
					const error = `Error: pickup measure found with mismatched length in voices ${voiceIndex} and ${j}`;
					this.warnings.push(error);
					Logger.error(error);
					break;
				}
			}
		}

		for (let i = 0; i < shortMeasures.length; i++) {
			const measure = shortMeasures[i];
			const voiceIndex = measure[0];
			const measureIndex = measure[1];
			const originalText =
				this.measureTextMatrix[voiceIndex][measureIndex];
			const beats = this.measureBeatsMatrix[voiceIndex][measureIndex];
			const difference = this.getMostCommonMeasureLength() - beats;
			let newMeasure = "";
			// let notes = 0;
			// Add 'z'*difference after the last space
			// Get the index of the last space
			let lastSpaceIndex = originalText.lastIndexOf(" ");
			// Add the first part of the measure up to the last space
			newMeasure += originalText.slice(0, lastSpaceIndex);
			newMeasure += " ";
			// Add the difference number of z's
			// for (let k = 0; k < difference; k++) {
			// 	newMeasure += "z";
			// }
			if (difference === 1) {
				newMeasure += "z";
			} else {
				newMeasure += "z" + difference;
			}
			// Add the rest of the measure
			newMeasure += originalText.slice(lastSpaceIndex);
			// Search and replace the original measure with the new measure
			//  + "|" ensures that the measure is not a substring of another measure
			this.abcNotation = this.abcNotation.replace(
				originalText + "|",
				newMeasure + "|"
			);
			this.measureTextMatrix[voiceIndex][measureIndex] = newMeasure;
			Logger.log(`Fixed short measure: ${originalText} -> ${newMeasure}`);

			this.numFixes++;
		}
		for (let i = 0; i < longMeasures.length; i++) {
			const measure = longMeasures[i];
			const voiceIndex = measure[0];
			const measureIndex = measure[1];
			const originalText =
				this.measureTextMatrix[voiceIndex][measureIndex];
			const beats = this.measureBeatsMatrix[voiceIndex][measureIndex];
			const difference = beats - this.getMostCommonMeasureLength();
			const generateNewMeasure = (originalText, difference) => {
				// Traverse backwards through the measure
				for (let j = originalText.length - 1; j >= 0; j--) {
					const currentChar = originalText[j];
					if (currentChar.match(/[2-9]/i)) {
						if (parseInt(currentChar) - difference > 1) {
							const newMeasure =
								originalText.slice(0, j) +
								(parseInt(currentChar) - difference) +
								originalText.slice(j + 1);
							return newMeasure;
						} else if (parseInt(currentChar) - difference === 1) {
							// We don't want to have a not length of 1, so we remove the number all together
							const newMeasure =
								originalText.slice(0, j) +
								originalText.slice(j + 1);
							return newMeasure;
						} else {
							difference -= parseInt(currentChar);
							const updatedText =
								originalText.slice(0, j) +
								originalText.slice(j + 1);
							return generateNewMeasure(updatedText, difference);
						}
					}
					if (currentChar.match(/[a-gz]/i)) {
						// Number of commas or apostrophes immediately after the note
						let numOctaveModifiers = 0;
						if (originalText[j + 1].match(/'|,/)) {
							numOctaveModifiers++;
							if (originalText[j + 2].match(/'|,/)) {
								numOctaveModifiers++;
								if (originalText[j + 3].match(/'|,/)) {
									// Assume a max of 3 octave modifiers
									numOctaveModifiers++;
								}
							}
						}
						if (difference === 1) {
							const newMeasure =
								originalText.slice(0, j) +
								originalText.slice(j + 1 + numOctaveModifiers);
							return newMeasure;
						} else {
							difference--;
							const updatedText =
								originalText.slice(0, j) +
								originalText.slice(j + 1 + numOctaveModifiers);
							return generateNewMeasure(updatedText, difference);
						}
					}
					// TODO this will fail with chords, simultaneous notes, and triplets
				}
				Logger.error("Error: could not fix long measure");
				this.warnings.push(
					"Error: could not fix long measure: " + originalText
				);
			};
			const newMeasure = generateNewMeasure(originalText, difference);
			// Search and replace the original measure with the new measure
			//  + "|" ensures that the measure is not a substring of another measure
			this.abcNotation = this.abcNotation.replace(
				originalText + "|",
				newMeasure + "|"
			);
			this.measureTextMatrix[voiceIndex][measureIndex] = newMeasure;
			Logger.log(`Fixed long measure: ${originalText} -> ${newMeasure}`);

			this.numFixes++;
		}
	}

	fixMismatchedRepeats() {
		// loop through all voices simultaneously
		// For each measure
		// if any voice's measure has a ':'
		// if any voice's measure does not have a ':'
		// if the ':' is at the end of the measure
		// add a ':' to the end of the other voice's measure
		// else
		// add a ':' to the beginning of the other voice's measure

		let measuresWithMultipleMatches = [];

		// Fix the easy ones
		for (let i = 0; i < this.measureTextMatrix.length; i++) {
			const measures = this.measureTextMatrix[i];
			for (let j = 0; j < measures.length; j++) {
				const measure = measures[j];
				if (measure.includes(":")) {
					for (let k = 0; k < this.measureTextMatrix.length; k++) {
						if (k !== i) {
							const originalText = this.measureTextMatrix[k][j];
							if (!originalText.includes(":")) {
								if (measure.endsWith(":")) {
									this.measureTextMatrix[k][j] =
										originalText + ":";
								} else {
									if (originalText.includes("\n")) {
										// put it after the newline
										const newlineIndex =
											originalText.indexOf("\n") + 1;
										this.measureTextMatrix[k][j] =
											originalText.slice(
												0,
												newlineIndex
											) +
											"|:" +
											originalText.slice(newlineIndex);
									} else {
										// TODO if this doesn't cause issues, the if statement can be removed
										this.measureTextMatrix[k][j] =
											"|:" + originalText;
									}
								}
								// Try to update it in the abcNotation
								const newText = this.measureTextMatrix[k][j];
								// count the number of times the original text appears in the abcNotation
								const matches = this.abcNotation
									.match(new RegExp(originalText + "|", "g"))
									.filter((match) => match.length > 0);
								// replace the first instance of the original text with the new text
								if (matches.length > 1) {
									measuresWithMultipleMatches.push({
										originalText: originalText,
										newText: newText,
									});
								} else {
									this.abcNotation = this.abcNotation.replace(
										originalText + "|",
										newText + "|"
									);
									Logger.log(
										`Fixed mismatched repeat: ${originalText} -> ${newText}`
									);
									this.numFixes++;
								}
							}
						}
					}
				}
			}
		}

		this.parse();

		const countMismatchedRepeats = () => {
			Logger.debug("measureTextMatrix: ", this.measureTextMatrix);
			let numMismatchedRepeats = 0;
			let measuresWithRepeats = [];
			for (
				let firstVoiceIndex = 0;
				firstVoiceIndex < this.measureTextMatrix.length;
				firstVoiceIndex++
			) {
				const measures = this.measureTextMatrix[firstVoiceIndex];
				for (
					let measureIndex = 0;
					measureIndex < measures.length;
					measureIndex++
				) {
					const measure = measures[measureIndex];
					if (
						measure.includes(":") &&
						!measuresWithRepeats.includes(measureIndex)
					) {
						measuresWithRepeats.push(measureIndex);
						// Logger.debug(
						// 	`This measure: ${measure}, has a ':', so checking other measures`
						// );
						let voicesWithMismatchedRepeats = [];
						for (
							let secondVoiceIndex = 0;
							secondVoiceIndex < this.measureTextMatrix.length;
							secondVoiceIndex++
						) {
							// Logger.debug(
							// 	`firstVoiceIndex: ${firstVoiceIndex}, secondVoiceIndex: ${secondVoiceIndex}`
							// );
							if (secondVoiceIndex !== firstVoiceIndex) {
								const originalText =
									this.measureTextMatrix[secondVoiceIndex][
										measureIndex
									];
								if (!originalText.includes(":")) {
									numMismatchedRepeats++;
									Logger.debug(
										`Mismatched repeat: ${measure} and ${originalText}`
									);
									voicesWithMismatchedRepeats.push(
										secondVoiceIndex
									);
								} else {
									// Logger.debug(
									// 	`This measure: ${originalText}, does include a ':'`
									// );
								}
							}
						}
						if (voicesWithMismatchedRepeats.length > 0) {
							const voicesList =
								voicesWithMismatchedRepeats.join(", ");
							Logger.debug(
								`Voice ${firstVoiceIndex} has repeats, but voices ${voicesList} do not`
							);
						}
					}
				}
			}
			Logger.log("numMismatchedRepeats: ", numMismatchedRepeats);
			return numMismatchedRepeats;
		};

		for (let i = 0; i < measuresWithMultipleMatches.length; i++) {
			// For each match, try to replace it with the new text
			// If it fails, try the next match
			// If it succeeds, break out of the loop
			let numMismatchesBefore = countMismatchedRepeats();
			let previousNotation = this.abcNotation;
			if (numMismatchesBefore === 0) {
				break;
			}
			const measure = measuresWithMultipleMatches[i];

			Logger.debug(`measure.originalText: ${measure.originalText}`);
			Logger.debug(`this.abcNotation: ${this.abcNotation}`);
			const matches = this.abcNotation
				.match(new RegExp(measure.originalText + "|", "g"))
				.filter((match) => match.length > 0);

			Logger.debug(
				`${measure.originalText} has ${matches.length} matches`
			);
			// Ensure special characters in originalText are escaped for regex
			// function escapeRegExp(string) {
			// 	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
			// }

			function replaceNthOccurrence(str, original, replacement, n) {
				let index = -1;
				for (let i = 0; i < n + 1; i++) {
					index = str.indexOf(original, index + 1);
					if (index === -1) break; // Break if the original string is not found
				}

				// If the original string was found n times, replace the nth occurrence
				if (index !== -1) {
					return (
						str.substring(0, index) +
						replacement +
						str.substring(index + original.length)
					);
				}

				return str; // Return the original string if no replacement was made
			}

			for (let l = 0; l < matches.length; l++) {
				Logger.debug(`Trying match ${l}`);

				Logger.debug(`Before: ${this.abcNotation}`);
				const old = this.abcNotation;
				this.abcNotation = replaceNthOccurrence(
					this.abcNotation,
					measure.originalText + "|",
					measure.newText + "|",
					l
				);
				Logger.debug(`After: ${this.abcNotation}`);

				if (old === this.abcNotation) {
					Logger.debug(`Failed to replace match ${l}`);
				} else {
					Logger.debug(`Successfully replaced match ${l}`);
				}

				this.parse();
				const numMismatchesAfter = countMismatchedRepeats();
				if (numMismatchesAfter < numMismatchesBefore) {
					Logger.log(
						`Fixed mismatched repeat: ${measure.originalText} -> ${measure.newText}`
					);
					Logger.debug(`abcNotation: ${this.abcNotation}`);
					this.numFixes++;

					Logger.log(
						"Successfully replaced mismatched repeat: ",
						measure[0],
						measure[1]
					);
				} else {
					this.abcNotation = previousNotation;
					Logger.debug(
						`Replacing mismatched repeat: ${measure.originalText} -> ${measure.newText} at ${l}th occurrence did not fix the mismatch`
					);
					this.parse();
				}
			}
		}
		if (countMismatchedRepeats() > 0) {
			// Replace all instances of '|:' with '|' and ':|' with '|'
			this.abcNotation = this.abcNotation.replace(/\|:/g, "|");
			this.abcNotation = this.abcNotation.replace(/:\|/g, "|");
			const warning = `Error: could not fix mismatched repeats. All repeats were removed`;
			this.warnings.push(warning);
			Logger.warn(warning);
		}
	}
}

export default ABCNotation;
