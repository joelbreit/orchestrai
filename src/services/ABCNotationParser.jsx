import Logger from "../services/Logger";

const voiceLineStartRegex = /^[a-gz{|%w"()}[]/i;
// const nonNoteNotationRegex = /[[\]:|\\n]/i;

// TODO '|'s can appear inside of ( )'s
// TODO deal with obvious octave errors
// TODO Voice names can be different for the same voice

class ABCNotation {
	constructor(abcNotation) {
		this.numWarnings = 0;
		this.warnings = [];
		this.failed = false;
		try {
			this.abcNotation = this.cleanUpNotation(abcNotation);
			// this.title = this.extractTitle();
			this.voices = new Map(); // map of voice names to all the text in that voice
			this.measureTextMatrix = [];
			this.measureBeatsMatrix = [];
			this.parse();

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
				this.numWarnings++;
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
								this.numWarnings++;
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
			// TODO double check that measure numbers match up across voices
			Logger.debug("ABCNotationParser: ", this);
		} catch (error) {
			this.failed = true;
			Logger.debug("ABCNotationParser: ", this);
			Logger.error("Error in ABCNotationParser: " + error);
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
		lines = lines.filter((line) => !line.startsWith("w"));

		const cleanedText = lines.join("\n");
		return cleanedText;
	}

	extractTitle() {
		const titleMatch = this.abcNotation.match(/^T:(.*)$/m);
		return titleMatch ? titleMatch[1].trim() : "Untitled";
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
		for (let [voiceName, voice] of this.voices) {
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
		Logger.log(this.measureTextMatrix);
	}

	readVoiceSection(lines, index) {
		let text = "";
		let name = lines[index];
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
		Logger.log(mostCommonLength);
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
					} else if (beat < this.getMostCommonMeasureLength()) {
						shortMeasures.push([i, j]);
					} else {
						longMeasures.push([i, j]);
					}
				}
			}
		}
		Logger.log(pickupMeasures);
		Logger.log(shortMeasures);
		Logger.log(longMeasures);
		// TODO deal with pickup measures
		for (let i = 0; i < pickupMeasures.length; i++) {
			const measure = pickupMeasures[i];
			const voiceIndex = measure[0];
			const measureIndex = measure[1];
			const beats = this.measureBeatsMatrix[voiceIndex][measureIndex];
			// Check if other voices have the same length measure
			let allMatch = true;
			for (let j = 0; j < this.measureBeatsMatrix.length; j++) {
				if (this.measureBeatsMatrix[j][measureIndex] !== beats) {
					allMatch = false;
					const error = `Error: pickup measure found with mismatched length in voices ${voiceIndex} and ${j}`;
					this.warnings.push(error);
					Logger.error(error);
					this.numWarnings++;
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
			let notes = 0;
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
			Logger.log("original: " + originalText);
			Logger.log("new: " + newMeasure);

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
						const numOctaveModifiers = 0;
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
			Logger.log("original: " + originalText);
			Logger.log("new: " + newMeasure);
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
										this.measureTextMatrix[k][j] =
											":" + originalText;
									}
								}
								// Try to update it in the abcNotation
								const newText = this.measureTextMatrix[k][j];
								// count the number of times the original text appears in the abcNotation
								const numMatches = this.abcNotation
									.match(new RegExp(originalText + "|", "g"))
									.filter((match) => match.length > 0).length;
								// replace the first instance of the original text with the new text
								if (numMatches > 1) {
									Logger.error(
										"Error: mismatched repeats were found, but a unique match could not be found"
									);
									this.warnings.push(
										"Error: mismatched repeats were found, but a unique match could not be found"
									);
									this.numWarnings++;
								} else {
									this.abcNotation = this.abcNotation.replace(
										originalText + "|",
										newText + "|"
									);
								}
								this.numFixes++;
							}
						}
					}
				}
			}
		}
	}
}

// Second voice is mostly in 7/8
// Both voices have unnecessary pickup notes
// Second voice has extra pickup notes
const exampleWithManyMistakes = `X:1
T:Reunion Rhapsody
C:OrchestrAI
M:4/4
L:1/8
Q:1/4=120
K:G

% The introduction symbolizes the anticipation of the reunion
V:1
"G" D2 |: "G" B2D2 G2B2 | "D" A4- A2B2 | "C" c4- c2E2 | "D7" D6 D2 | 
"G" B2D2 G2B2 | "D" A4- A2B2 | "C" e4- e2c2 | "D7" d6 z2 :|
V:2
z2 |: [G,2B,2] z B2B,2 | [A,2E2] z A2A,2 | [C2E2] z E2E,2 | [D2F2] z F2F,2 | 
[G,2B,2] z B2B,2 | [A,2E2] z A2A,2 | [C2E2] z E2E,2 | [D2F2] z F2F,2 :|

% The next section represents the joyous greeting between friends
V:1
"G" Bc | "G" d4 B2G2 | "Em" B4 A2G2 | "Am" A4 c3e | "D7" d6 z2 |
"G" B4 d3B | "C" e4 c2A2 | "G" D4 G2B2 | "D7" A6 z2 |
V:2
|: z2 | [G,2D2] z G,2D2 | [E2B,2] z E2B,2 | [A,2E2] z A,2E2 | [D2A,2] z D2A,2 | 
[G,2D2] z G,2D2 | [C2G,2] z C2G,2 | [G,2D2] z G,2D2 | [D2A,2] z D2A,2 :|

% The middle section reflects the warmth and affection in the embrace
V:1
"C" E2 | "Em" E4- E2G2 | "Am" A4- A2c2 | "D" D4- D2F2 | "G" G6 B2 |
"C" E4- E2G2 | "Am" A2c2 A2G2 | "Em" G4- G2E2 | "D7" D6 z2 |
V:2
z2 |: [E2G2] z E2G,2 | [A2C2] z A2A,2 | [D2F2] z D2D,2 | [G2B,2] z G2G,2 | 
[E2G2] z E2G,2 | [A2C2] z A2A,2 | [E2G2] z E2E,2 | [D2F2] z D2F,2 :|

% The final section symbolizes the lively chatter and catch-up
V:1
"G" D2 | "G" d2B2 G2D2 | "C" c2E2 A2c2 | "G" B2d2 G2B2 | "D7" A4 F2D2 |
"G" G2B2 D2G2 | "C" c2E2 G2c2 | "G" B2d2 "D7" F2A2 | "G" G8 :|
V:2
z2 |: [G,2B,2] z B2D2 | [C,2E2] z E2A,2 | [G,2B,2] z B2D2 | [D2F2] z F2A,2 | 
[G,2B,2] z B2D2 | [C,2E2] z E2G,2 | [G,2B,2] z B2D2 | [G,2B,2] z8 :|
`;

// Second voice has several 3/4 measures
const exampleWithSimpleMistakes = `X:1
T:Forest Dusk Serenade
C:OrchestrAI
M:4/4
L:1/8
Q:1/4=80
K:Am
V:1 clef=treble
%%MIDI program 71
|:"Am" A3 B c2 de |"G" G4- G2 FE |"F" F3 G A2 cB |"E7" E6 z2 |
w: The melo-dy starts gent-ly, sug-gest-ing the rhyth-mic sway-ing of tree branch-es.
"Am" A3 B c2 de |"C" c4- c2 E2 |"G" G3 A B2 d^c |"Am" A6 z2 |
w: The soft cho-rds rep-re-sent twi-light's scep-ter as shadows blend to dark.
"E" e3 ^c d2 cB |"Am" A4- A2 ^c2 |"F" d3 c B2 AG |"E7" E6 z2 |
w: Eth-e-real sounds ech-o, as day-light whis-pers a ten-der fare-well.
"Am" A3 B "F" A2 F2 |"G" E4- E2 D2 |"Am" C3 D E2 ^C2 |"E7" E6 z2 :|
w: Soft con-clus-ion as the dusk falls more deep-ly in-to si-lence.
V:2 clef=bass
%%MIDI program 42
|:"Am" A,6 z2 |"G" [D,2G,2B,2] z4 |"F" F,6 z2 |"E7" [E,2G,2B,2] z4 |
"Am" A,2 C2 E2 A,2 |"C" [C,2E2G2] z4 |"G" D,2 G,2 B,2 D2 |"Am" A,6 z2 |
"E" [E2^G2B2] z4 |"Am" A,2 C2 E2 A,2 |"F" [F,2A,2C2] z4 |"E7" [E,2G,2B,2] z4 |
"Am" A,2 ^C2 E2 A,2 |"G" [D,2G,2B,2] z4 |"Am" [C,2E2A,2] z4 |"E7" [E,2G,2B,2] z4:|
`;

const exampleWithNoMistakes = `X:1
T:Grooves in Motion
C:OrchestrAI
M:4/4
L:1/8
Q:1/4=140
K:C
V:1 clef=treble
%%MIDI program 74
|:"C"c2ec Gcec|"Am"A2eA EAEA|"F"f2cf Acfa|"G"g2dg FAdf|
"C"e2ge cegc|"Am"a2ea ace^g|"F"afdf cfAc|"G"bg^fg agfe:|
V:2 clef=treble
%%MIDI program 73
|"C"e4 z2E2|"Am"c4 z2A2|"F"A4 z2C2|"G"G,4 z2D2|
"C"E2G2 C2E2|"Am"A,2A,2 C2E2|"F"A2c2 A2f2|"G"G2B2 G2d2:|
V:3 clef=bass
%%MIDI program 34
|"C"C,4 E,2G,2|"Am"A,4 C2E2|"F"F,4 A,2c2|"G"G,4 B,2D2|
"C"C2E2 G2c2|"Am"A,2E2 A,2C2|"F"F2A2 c2f2|"G"G,2B,2 D2G2:|
V:4 clef=bass
%%MIDI program 34
|:"C"C,6 z2|"Am"A,6 z2|"F"F,4 C4|"G"G,4 D4|
"C"C,2E,2 G,2C2|"Am"A,2C2 E2A,2|"F"F,2A,2 C2F2|"G"G,2B,2 D2G2:|`;

const celebrationsDance = `X:1
T:Celebration's Dance
C:OrchestrAI
M:4/4
L:1/8
Q:1/4=120
K:Cmaj
V:1 treble
V:2 treble
V:3 bass
% Voice 1 - Melody
[V:1] "C" G4 | E4 | G4- | G2 A2 | Bc d2 | "G7" B4 | A2 G2 | F4 | "Am" e4 | "F" d4 | "G7" c3 B | "C" c4 | "Dm" d4 | "G" d4 | "C" c4 | G4 |
[V:1] "C" c2 e2 | "F" f2 a2 | "G" g2 e2 | "C" c4- | c3 B | "G7" A3 G | "C" F4 | E4 | "F" f2 f2 | "G7" e2 e2 | "Am" d4 | "F" c4 | "G7" B2 A2 | "C" G4 |
[V:1] "C" e2 c2 | "F" d2 f2 | "G" e2 G2 | "C" c4- | c2 B2 | "G7" A2 G2 | "C" F4 | E4 | "Am" e4 | "Dm" d4 | "G" c3 B | "C" c4- | c4 | "G7" d4 | "C" c4 | G4 :|
% Voice 2 - Harmony
[V:2] "C" E4 | C4 | E4- | E2 F2 | G2 A2 | "G7" F4 | G2 E2 | D4 | "Am" C4 | "F" A4 | "G7" B3 A | "C" G4 | "Dm" F4 | "G" B4 | "C" E4 | C4 |
[V:2] "C" G2 E2 | "F" A2 F2 | "G" B2 G2 | "C" E4- | E3 D | "G7" B3 A | "C" G4 | F4 | "F" A2 A2 | "G7" G2 G2 | "Am" F4 | "F" E4 | "G7" D2 G2 | "C" E4 |
[V:2] "C" C2 E2 | "F" D2 A2 | "G" G2 B2 | "C" E4- | E2 D2 | "G7" B2 A2 | "C" G4 | F4 | "Am" C4 | "Dm" A4 | "G" B3 A | "C" G4- | G4 | "G7" F4 | "C" E4 | C4 :|
% Voice 3 - Bass
[V:3] "C" C,4 | G,4 | E,4- | E,2 F,2 | G,2 A,2 | "G7" F,4 | D,2 E,2 | "C" C,4 | "Am" A,4 | "F" F,4 | "G7" B,,3 A,, | "C" C,4 | "Dm" D,4 | "G" B,,4 | "C" E,4 | G,4 |
[V:3] "C" G,2 C,2 | "F" F,2 C,2 | "G" D,2 G,2 | "C" G,4- | G,3 F, | "G7" E,3 F, | "C" C,4 | G,4 | "F" F,2 F,2 | "G7" E,2 E,2 | "Am" A,4 | "F" F,4 | "G7" D,2 G,2 | "C" C,4- | C,4 | G,4 |
[V:3] "C" E,2 C,2 | "F" A,,2 A,2 | "G" D,2 B,,2 | "C" G,4- | G,2 F,2 | "G7" E,2 D,2 | "C" C,4 | G,4 | "Am" A,4 | "Dm" D,4 | "G" G,,3 F, | "C" C,4- | C,4 | "G7" B,,4 | "C" E,4 | C,4 :|
`;

// const complexExample = new ABCNotation(exampleWithManyMistakes);
// const mediumExample = new ABCNotation(exampleWithSimpleMistakes);
// const simpleExample = new ABCNotation(exampleWithNoMistakes);
const celebrationsDanceExample = new ABCNotation(celebrationsDance);

// const output = complexExample.abcNotation;
// Logger.log(complexExample.abcNotation);
// Logger.log(mediumExample.abcNotation);
// Logger.log(simpleExample.abcNotation);

export default ABCNotation;
