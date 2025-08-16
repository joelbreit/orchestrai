import abcjs from "abcjs";

// Read the text file (ensure the path is correct and relative)
// const filePath = `${__dirname}/../../assets/UncleanedNotation.abc`;

// TODO '|'s can appear inside of ( )'s
// TODO deal with obvious octave errors
// TODO Voice names can be different for the same voice
// TODO remove ||'s

/** 
Not accounted for:
- Tuplets other than (3 notation
- Chords within tuplets (e.g. (3[CE]FG )
- Header lines within the voices section (L:, M:, Q:, P:, K:, etc.)
- Repeat barlines (e.g. |[1 )
  - Definitely happens sometimes
- Inline headers like [K:G]
  - Occur, but probably should be discouraged
*/

// TODO move all regexes to this object
const REGEX = {
	voiceLineStart: /^[a-gz{|%w"()}[]/i,
	nonNoteNotation: /[[\]:|\\n]/i,
	inlineVoiceName: /^\[V:\d+\] /,
	headers: {
		// Always starts with X: and ends with K:
		// Can contain comments
		entireSection: /(^[X]:\s?.*\n)(^([A-Z]:\s?|%).*\n)*(^[K]:\s?.*\n)/m,
		index: /^X:(.*)$/,
		title: /^T:(.*)$/,
		tempo: /^Q:(.*)$/,
		noteLength: /^L:(.*)$/,
		meter: /^M:\s*([^ %]+).*$/,
		length: /^L:\s*([^ %]+).*$/,
		composer: /^C:(.*)$/,
		voice: /^V:(.*)$/,
		part: /^P:(.*)$/,
		key: /^K:(.*)$/,
	},
	referenceNumber: /X:\s*\d+/,
	origin: /O:\s*.*/,
	meterDefinition: /^((\d+)\/(\d+)|C\|?)$/,
	lengthDefinition: /^(\d+)\/(\d+)$/,
	commentLine: /^%.*$/,
	lyricLine: /^w.*$/,
	voiceDefinition: /^\[?V:.*/,
	partDefinition: /^P[\:].*/,
	numberedRepeat: /^[[|]?\d/,
	numberedRepeatMeasure: /^( ?[[|]?\d)(.*)/,
};

const voiceLineStartRegex = /^[a-gz{|%w"()}[]/i;

/**
 * Normalize text to a given width
 */
function limitTextLength(text, length) {
	if (text.length > length) {
		return text.slice(0, length - 3) + "...";
	}
}

class NoteLength {
	// TODO this does not deal with broken rhythms (e.g. D>E)

	constructor(text, parent) {
		this.regex = {
			valid: /^\d*(\/|>|<)*\d*$/i,
			simple: /^\d+$/i,
			simpleFraction: /^\d*\/\d+$/i,
			complexFraction: /^\d*\/\/+\d*$/,
			simpleBroken: /^(\d*)[<>]*$/i,
		};
		this.parent = parent;
		// remove all whitespace
		const cleanedText = text.replace(/\s/g, "");
		this.text = cleanedText;
		this.value = this.calculateLength();
	}

	calculateLength() {
		if (this.text.match(this.regex.valid)) {
			// Check for empty note lengths
			if (this.text === "") {
				return 1;
			} else if (this.text === "/") {
				return 0.5;
			} else if (this.text.match(this.regex.simple)) {
				return parseInt(this.text);
			} else if (this.text.match(this.regex.simpleFraction)) {
				let [numerator, denominator] = this.text.split("/");
				numerator = parseInt(numerator) || 1;
				denominator = parseInt(denominator) || 2;
				return numerator / denominator;
			} else if (this.text.match(this.regex.complexFraction)) {
				if (this.text.match(/^\/\/$/)) {
					// double slash
					return 0.25;
				}
				// TODO deal with complex fractions
				this.addWarning(
					"Complex fractions not yet supported: " + this.text
				);
				return 0.25;
			} else if (this.text.match(this.regex.simpleBroken)) {
				const [_, length] = this.text.match(this.regex.simpleBroken);
				if (length) {
					return parseInt(length);
				} else {
					return 1;
				}
			} else {
				this.addWarning("Unrecognized note length: " + this.text);
			}
		} else {
			// TODO deal with invalid note lengths
			this.addWarning("Invalid note length: " + this.text);
			return 1;
		}
	}

	addWarning(warning) {
		this.parent.addWarning(warning);
	}
}

class Note {
	constructor(preText, text, postText, parent, lengthMultiplier = 1) {
		this.regex = {
			valid: /^([.vu~])?(__|_|=|\^|\^\^)?([a-gz])(,|')*([^-]*)(-)?$/i,
		};
		this.parent = parent;
		this.preText = preText;
		this.text = text;
		this.postText = postText;
		this.lengthMultiplier = lengthMultiplier;
		this.warnings = [];
		this.fixes = [];
		this.index = this.parent.parts.length;

		this.parseNote();
		this.length = this.totalLength;
	}

	parseNote() {
		// remove '#'s
		if (this.text.match(/#/)) {
			this.text = this.text.replace(/#/g, "");
			this.addNormalizations("Removed '#' from note");
		}
		if (this.text.match(this.regex.valid)) {
			const [
				,
				articulation,
				accidental,
				noteLetter,
				octaveModifiers,
				noteLength,
				tie,
			] = this.text.match(this.regex.valid);
			this.articulation = articulation || "";
			this.accidental = accidental || "";
			this.noteLetter = noteLetter;
			this.octaveModifiers = octaveModifiers || "";
			this.noteLength = new NoteLength(noteLength, this);
			this.tie = tie || "";
		} else {
			// TODO deal with invalid notes
			this.addWarning("Invalid note: " + this.text);
			this.articulation = "";
			this.accidental = "";
			this.noteLetter = "";
			this.octaveModifiers = "";
			this.noteLength = new NoteLength("", this);
			this.tie = "";
		}
	}

	get fullText() {
		return this.preText + this.text + this.postText;
	}

	get totalLength() {
		return this.noteLength.value * this.lengthMultiplier;
	}

	addWarning(warning) {
		this.warnings.push(warning);
		const location = `Note ${this.index}: `;
		this.parent.addWarning(location + warning);
	}

	addNormalizations(normalization) {
		this.parent.addNormalizations(normalization);
	}
}

class Measure {
	constructor(preText, text, postText, parent) {
		this.regex = {
			note: /^([.vu~])?(__|_|=|\^|\^\^)?([a-gz])(,|')*([\d\/>]*)(-)?\s?/i,
			chordName: /^"[^"]*"/,
			graceNotes: /^{.*?}/,
		};
		this.warnings = [];
		this.fixes = [];
		this.parent = parent;
		this.preText = preText;
		this.text = text;
		this.postText = postText;
		this.parts = [];
		this.index = this.parent.measures.length;

		this.parse();
		this.length = this.totalLength;
	}

	parse() {
		// let content = this.removeChordNames(this.text);
		// content = this.removeGraceNotes(content);
		// content = this.removeSlurs(content);
		let preText = "";
		let part = "";
		let postText = "";
		let noteFound = false;
		let tupletsLeft = 0;
		let lengthMultiplier = 1;
		let inChord = false;
		let firstChordNote = false;
		const brokenRhythm = {
			value: "",
			relation: "",
		};
		const brokenRhythms = {
			before: {
				">": 1.5,
				">>": 1.75,
				">>>": 1.875,
				"<": 0.5,
				"<<": 0.25,
				"<<<": 0.125,
			},
			after: {
				">": 0.5,
				">>": 0.25,
				">>>": 0.125,
				"<": 1.5,
				"<<": 1.75,
				"<<<": 1.875,
			},
		};
		for (let i = 0; i < this.text.length; i++) {
			const currentChar = this.text[i];
			const remainingText = this.text.slice(i);

			if (noteFound) {
				if (currentChar.match(/[#\d/>,'-]/)) {
					// # not valid, but it's easier to just overlook it
					// note length
					part += currentChar;
					// broken rhythms
					if (currentChar === ">") {
						if (brokenRhythm.relation === "after") {
							this.addWarning(
								"Broken rhythm before and after note"
							);
						}
						brokenRhythm.value += ">";
						brokenRhythm.relation = "before";
					} else if (currentChar === "<") {
						if (brokenRhythm.relation === "after") {
							this.addWarning(
								"Broken rhythm before and after note"
							);
						}
						brokenRhythm.value += "<";
						brokenRhythm.relation = "before";
					}
				} else {
					// end of note
					if (currentChar === ")") {
						postText += ")";
						i++; // to negate the i-- below
					}
					if (inChord && !firstChordNote) {
						lengthMultiplier = 0;
					}
					if (brokenRhythm.value) {
						lengthMultiplier *=
							brokenRhythms[brokenRhythm.relation][
								brokenRhythm.value
							];
					}
					this.parts.push(
						new Note(
							preText,
							part,
							postText,
							this,
							lengthMultiplier
						)
					);
					// Assume broken rhythms don't overlap with tuplets because that would be insane
					if (brokenRhythm.relation === "before") {
						brokenRhythm.relation = "after";
						lengthMultiplier = 1;
					} else if (brokenRhythm.relation === "after") {
						brokenRhythm.relation = "";
						brokenRhythm.value = "";
						lengthMultiplier = 1;
					}
					tupletsLeft--;
					if (tupletsLeft === 0) {
						lengthMultiplier = 1;
					}
					preText = "";
					part = "";
					postText = "";
					noteFound = false;
					firstChordNote = false;
					i--;
				}
			} else {
				if (currentChar.match(/[.vu~=_^]/i)) {
					// articulation or accidental
					part += currentChar;
				} else if (currentChar.match(/[a-gz]/i)) {
					noteFound = true;
					part += currentChar;
				} else if (currentChar === " " || currentChar === "-") {
					preText += " ";
				} else if (currentChar === "(") {
					if (remainingText[1].match(/\d/i)) {
						// tuplet
						const tuplet = remainingText.match(/^\([\d:]/)[0];
						const tupletLength = tuplet.length;
						if (tuplet === "(3") {
							tupletsLeft = 3;
							lengthMultiplier = 2 / 3;
						} else {
							this.addWarning(
								"Tuplet other than triplet not yet supported: " +
									remainingText
							);
						}
						preText += tuplet;
						i += tupletLength - 1;
					} else {
						// start of a slur
						preText += "(";
					}
				} else if (currentChar === '"') {
					// chord name
					// TODO track these to verify that chord names match across voices
					const chordName = remainingText.match(
						this.regex.chordName
					)[0];
					const chordLength = chordName.length;
					preText += chordName;
					i += chordLength - 1;
				} else if (currentChar === "{") {
					// grace notes
					const graceNotes = remainingText.match(
						this.regex.graceNotes
					)[0];
					const graceLength = graceNotes.length;
					preText += graceNotes;
					i += graceLength - 1;
				} else if (currentChar === "[") {
					// begin chord
					preText += "[";
					inChord = true;
					firstChordNote = true;
					const lengthenedChordMatch =
						remainingText.match(/^\[[^\]]+\](\d+)/i);
					if (lengthenedChordMatch) {
						lengthMultiplier = parseInt(lengthenedChordMatch[1]);
					}
				} else if (currentChar === "]") {
					// end chord
					preText += "]";
					inChord = false;
					lengthMultiplier = 1;
					const chordLengthSuffix = remainingText.match(/^\](\d+)/i);
					if (chordLengthSuffix) {
						// lengthened chord
						preText += chordLengthSuffix[1];
						i += chordLengthSuffix[1].length;
					}
				} else {
					this.addWarning(
						"Unexpected char before note definition: " + currentChar
					);
				}
			}
		}
		if (noteFound) {
			if (inChord && !firstChordNote) {
				lengthMultiplier = 0;
			}
			this.parts.push(
				new Note(preText, part, postText, this, lengthMultiplier)
			);
		} else {
			try {
				this.parts[this.parts.length - 1].postText +=
					preText + part + postText;
			} catch (error) {
				this.addWarning(
					"Error in adding postText to last note: " + error
				);
			}
		}
	}

	get fullText() {
		const partsText = this.parts.map((part) => part.fullText).join("");
		return this.preText + partsText + this.postText;
	}

	get totalLength() {
		let length = this.parts.reduce(
			(acc, part) => acc + part.totalLength,
			0
		);

		// check that the length is an integer
		const remainder = length % 1;
		if (remainder !== 0) {
			if (remainder > 0.75 || remainder < 0.25) {
				// close enough, round to nearest integer
				length = Math.round(length);
			} else {
				this.addWarning("Fractional total measure length: " + length);
			}
		}
		return length;
	}

	addWarning(warning) {
		this.warnings.push(warning);
		const location = `Measure ${this.index}, `;
		this.parent.addWarning(location + warning);
	}

	addNormalizations(normalization) {
		this.parent.addNormalizations(normalization);
	}

	addFixes(fix) {
		this.fixes.push(fix);
		const location = `Measure ${this.index}, `;
		this.parent.addFixes(location + fix);
	}

	setMeasureLength(desiredLength) {
		const currentLength = this.totalLength;
		let lengthDifference = desiredLength - currentLength;

		// check that the difference is an integer
		let remainder = lengthDifference % 1;
		if (remainder !== 0) {
			if (remainder > 0.75 || remainder < 0.25) {
				// round to nearest integer
				lengthDifference = Math.round(lengthDifference);
			}
		}

		if (lengthDifference > 0) {
			// Add notes to the end of the measure
			let textToAdd = "";
			let validLength = false;
			remainder = lengthDifference % 1;
			if (lengthDifference >= 1) {
				const numWholeNotes = Math.floor(lengthDifference);
				textToAdd = "z" + numWholeNotes;
				const newNote = new Note("", textToAdd, "", this);
				this.parts.push(newNote);
				this.addFixes(
					`Added ${lengthDifference} rests to the end of the measure`
				);
			}
			if (remainder) {
				switch (remainder) {
					case 0.5:
						textToAdd = "z/";
						validLength = true;
						break;
					case 0.75:
						textToAdd = "z3/4";
						validLength = true;
						break;
					case 0.25:
						textToAdd = "z//";
						validLength = true;
						break;
					default:
						this.addWarning(
							`Can't add this length to measure: ${lengthDifference}`
						);
				}
				if (validLength) {
					const newNote = new Note("", textToAdd, "", this);
					this.parts.push(newNote);
					this.addFixes(
						`Added ${lengthDifference} rests to the end of the measure`
					);
				}
			}
		} else if (lengthDifference < 0) {
			// If last note is equal to the difference, remove it
			let remainingDifference = lengthDifference;
			while (remainingDifference < 0) {
				const lastNote = this.parts[this.parts.length - 1];
				if (lastNote) {
					// remove the last note
					this.parts.pop();
					remainingDifference += lastNote.totalLength;
				} else {
					// no more notes to remove
					break;
				}
			}
			if (remainingDifference !== 0) {
				this.setMeasureLength(desiredLength);
			} else {
				this.addFixes(
					`Removed ${-lengthDifference} notes from the end of the measure`
				);
			}
		}

		this.length = this.totalLength;
		return this.totalLength;
	}
}

class Line {
	constructor(pretext, text, postText, parent) {
		this.regex = {
			singleBarline: /^[|:]/,
			doubleBarline: /^\[\||^\|\]|^\|\||^\|:|^:\|/,
			tripleBarline: /^:\|\|/,
		};
		this.parent = parent;
		this.preText = pretext;
		this.text = text;
		this.postText = postText;
		this.measures = [];
		this.index = this.parent.lines.length;
		this.warnings = [];
		this.fixes = [];

		this.parse();
	}

	// oldparse() {
	// 	// Replace '[|', '|]', ':|', '|:', '||' with '|'
	// 	this.text = this.text.replace(/\[\||\|\]|\|\||\|:|:\|/g, "|");
	// 	// Split on '|' characters
	// 	const parts = this.text.split("|");
	// 	for (let i = 0; i < parts.length; i++) {
	// 		let part = parts[i].trim();
	// 		if (part !== "") {
	// 			this.measures.push(new Measure(part, this));
	// 		}
	// 	}
	// }

	parse() {
		let preText = "";
		let measure = "";
		let postText = "";
		let currChar = "";
		let inMeasure = false;
		let beginningOfLine = true;
		for (let i = 0; i < this.text.length; i++) {
			currChar = this.text[i];
			let remainingText = this.text.slice(i);
			if (!inMeasure || beginningOfLine) {
				if (
					remainingText.match(
						this.regex.singleBarline ||
							remainingText.match(this.regex.doubleBarline)
					)
				) {
					inMeasure = true;
					preText += currChar;
					if (remainingText.match(this.regex.doubleBarline)) {
						preText += this.text[i + 1];
						i++;
						if (remainingText.match(this.regex.tripleBarline)) {
							preText += this.text[i + 1];
							i++;
						}
					}
					remainingText = this.text.slice(i + 1);
					if (remainingText.match(REGEX.numberedRepeat)) {
						// Move numbered repeats to pretext
						const repeat = remainingText.match(
							REGEX.numberedRepeat
						)[0];
						const repeatLength = repeat.length;
						preText += repeat;
						i += repeatLength;
					}
				} else {
					// Start of a line that doesn't start with a barline
					i--;
					inMeasure = true;
				}
			} else {
				// if (remainingText.match(REGEX.numberedRepeat)) {
				// 	// Skip over numbered repeats
				// 	const repeat = remainingText.match(REGEX.numberedRepeat)[0];
				// 	const repeatLength = repeat.length;
				// 	preText += repeat;
				// 	i += repeatLength - 1;
				// } else
				if (currChar.match(this.regex.singleBarline)) {
					// Reached the end of the measure
					this.measures.push(
						new Measure(preText, measure, postText, this)
					);
					preText = "";
					measure = "";
					postText = "";
					inMeasure = false;
					i--;
				} else {
					measure += currChar;
				}
			}
			beginningOfLine = false;
		}
		if (this.measures.length === 0) {
			this.measures.push(new Measure(preText, measure, postText, this));
		} else {
			this.measures[this.measures.length - 1].postText +=
				preText + measure + postText;
		}
	}

	get fullText() {
		const measuresText = this.measures
			.map((measure) => measure.fullText)
			.join("");
		return this.preText + measuresText + this.postText;
	}

	get totalLength() {
		return this.measures.reduce(
			(acc, measure) => acc + measure.totalLength,
			0
		);
	}

	addWarning(warning) {
		this.warnings.push(warning);
		const location = `Line ${this.index}, `;
		this.parent.addWarning(location + warning);
	}

	addNormalizations(normalization) {
		this.parent.addNormalizations(normalization);
	}

	addFixes(fix) {
		this.fixes.push(fix);
		const location = `Line ${this.index}, `;
		this.parent.addFixes(location + fix);
	}
}

class Voice {
	constructor(pretext, text, postText, parent) {
		this.parent = parent;
		this.preText = pretext;
		this.text = text;
		this.postText = postText;
		this.lines = [];
		this.index = this.parent.parts.length;
		this.warnings = [];
		this.fixes = [];

		this.parse();
	}

	parse() {
		const lines = this.text.split("\n");
		let preText = "";
		for (const line of lines) {
			if (
				line.match(REGEX.commentLine) ||
				line.match(REGEX.lyricLine) ||
				line.match(REGEX.voiceDefinition) ||
				line.match(REGEX.partDefinition)
			) {
				preText += line + "\n";
			} else if (line !== "") {
				this.lines.push(new Line(preText, line, "\n", this));
				preText = "";
			}
		}
		if (this.lines) {
			this.lines[this.lines.length - 1].postText = preText + "\n";
		}
	}

	get fullText() {
		const linesText = this.lines.map((line) => line.fullText).join("");
		return this.preText + linesText + this.postText;
	}

	get totalLength() {
		return this.lines.reduce((acc, part) => acc + part.totalLength, 0);
	}

	addWarning(warning) {
		this.warnings.push(warning);
		const location = `Voice ${this.index}, `;
		this.parent.addWarning(location + warning);
	}

	addNormalizations(normalization) {
		this.parent.addNormalizations(normalization);
	}

	addFixes(fix) {
		this.fixes.push(fix);
		const location = `Voice ${this.index}, `;
		this.parent.addFixes(location + fix);
	}

	get measureLengths() {
		let lengths = [];
		for (const line of this.lines) {
			lengths = lengths.concat(
				line.measures.map((measure) => measure.totalLength)
			);
		}
		return lengths;
	}
}

class ABCNotation {
	constructor(abcNotation) {
		// Initialize all the properties
		this.warnings = [];
		this.fixes = [];
		this.notes = [];
		this.failed = false;
		this.normalizations = [];
		this.abcNotation = "";
		this.title = "";
		this.meter = "";
		this.length = "";
		this.notesPerMeasure = 8;
		this.voices = new Map(); // map of voice names to all the text in that voice
		this.voiceDefinitions = new Map(); // map of voice names to their leading text
		this.measureTextMatrix = [];
		this.headerText = "";
		this.parts = [];

		// Do the hard work
		try {
			this.abcNotation = this.normalizeText(abcNotation);
			this.title = "";
			const matches = this.abcNotation.match(REGEX.headers.title);
			if (matches) {
				this.title = matches[1];
			}
			this.measureTextMatrix = [];
			this.parse();
			// TODO log if there are any outstanding issues

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
				this.addWarning(error);
			}

			for (const [, voiceText] of this.voices) {
				// const preText = this.voiceDefinitions.get(voiceName);
				const voice = new Voice("", voiceText, "", this);

				this.parts.push(voice);
			}

			const desiredMeasureLength = this.determineDesiredMeasureLength();

			// TODO if all but one voice agree on measure length, enforce that measure length
			for (const voice of this.parts) {
				for (const line of voice.lines) {
					for (const measure of line.measures) {
						if (measure.totalLength !== desiredMeasureLength) {
							// check same measure in other voices
							const measureIndex = measure.index;
							const lineIndex = line.index;
							const otherVoices = this.parts.filter(
								(part) => part.index !== voice.index
							);
							const otherMeasures = otherVoices.map(
								(part) =>
									part.lines[lineIndex].measures[measureIndex]
							);
							const areSameLength = otherMeasures.every(
								(otherMeasure) =>
									otherMeasure.totalLength ===
									measure.totalLength
							);
							if (areSameLength) {
								this.addNote(
									"Not enforcing measure length for line " +
										lineIndex +
										", measure " +
										measureIndex
								);
							} else {
								measure.setMeasureLength(desiredMeasureLength);
							}
						}
					}
				}
			}
			// TODO enforceMeasuresPerVoice
			// TODO enforceMeasuresPerLine
			// TODO enforceMatching barlines

			this.checkForErrors();

			const tunes = abcjs.parseOnly(this.abcNotation);
			const abcWarnings = tunes[0].warnings;

			if (this.warnings.length > 0) {
				// add "abcjs" to the end of each warning
				this.warnings = this.warnings.concat(
					abcWarnings.map((warning) => warning + " (abcjs)")
				);
			}
		} catch (error) {
			this.failed = true; // TODO warnings should be errors and always imply failure
			this.addWarning("Unexpected error while parsing: " + error);
		}
	}

	get numFixes() {
		return this.fixes.length;
	}

	/**
	 * Normalize the given text by performing the following operations:
	 * 1. Adds new lines after any inline voice names
	 * 2. Removes leading and trailing whitespace from each line
	 * 3. Remove empty lines
	 * 4. Remove redundant voice definitions (consecutive lines that start with "V:")
	 *
	 * @param {string} text - The text to be normalized.
	 * @returns {string} - The normalized text.
	 */
	normalizeText(text) {
		let lines = text.split("\n");

		// Add new lines after any inline voice names
		let linesCopy = [...lines];
		for (const line of linesCopy) {
			const voiceNameMatch = line.match(/^\[V:\d+\] /);
			if (voiceNameMatch) {
				const index = voiceNameMatch[0].length;
				lines.splice(lines.indexOf(line) + 1, 0, line.slice(index));
				lines[lines.indexOf(line)] = line.slice(0, index);
				this.addNormalizations(`Added newline after voice name`);
			}
		}

		// Remove leading and trailing whitespace
		linesCopy = [...lines];
		for (const line of linesCopy) {
			if (line !== line.trim()) {
				lines[lines.indexOf(line)] = line.trim();
				this.addNormalizations(
					`Removed leading and trailing whitespace`
				);
			}
		}

		// Remove empty lines
		linesCopy = [...lines];
		for (const line of linesCopy) {
			if (line === "") {
				lines.splice(lines.indexOf(line), 1);
				this.addNormalizations(`Removed empty line`);
			}
		}
		// Lines that start with "w" are words, not notes
		// lines = lines.filter((line) => !line.startsWith("w"));

		// Remove redundant voice definitions (consecutive lines that start with "V:")
		if (lines.some((line) => line.startsWith("V:"))) {
			let numRemoved = 0;
			let index = lines.findIndex((line) => line.startsWith("V:"));
			let areConsecutive = false;
			while (lines[index + 1].startsWith("V:")) {
				lines.splice(index + 1, 1);
				areConsecutive = true;
				numRemoved++;
			}
			if (areConsecutive) {
				lines.splice(index, 1);
				numRemoved++;
			}
			if (numRemoved > 0) {
				this.addNormalizations(
					`Removed ${numRemoved} redundant voice definitions`
				);
			}
		}

		const cleanedText = lines.join("\n");
		return cleanedText;
	}

	parse() {
		let lineIndex = this.parseHeaders();
		this.parseVoices(lineIndex);
		this.populateTextMatrix();
	}

	/**
	 * Parse the headers of the ABC notation and store them in the appropriate properties.
	 * @returns {number} - The index of the first line of the music.
	 */
	parseHeaders() {
		const headerSection = this.abcNotation.match(
			REGEX.headers.entireSection
		);

		if (headerSection) {
			this.headerText = headerSection[0];
			let headers = headerSection[0].split("\n");
			// remove empty lines
			headers = headers.filter((line) => line !== "");
			for (const header of headers) {
				if (header.match(REGEX.headers.title)) {
					this.title = header.match(REGEX.headers.title)[1];
				} else if (header.match(REGEX.headers.meter)) {
					this.meter = header.match(REGEX.headers.meter)[1].trim();
				} else if (header.match(REGEX.headers.length)) {
					this.length = header.match(REGEX.headers.length)[1].trim();
				}
			}

			// TODO add warnings if essential headers are missing

			return headers.length;
		} else {
			this.addWarning("Failed to identify headers section");
			return 0;
		}
	}

	/**
	 * Goes through the whole notation body
	 * Does not create the Voice objects
	 * Maps voice text to their respective voices
	 * @param {number} lineIndex - The index of the first line of the body.
	 * @returns {void}
	 */
	parseVoices(lineIndex) {
		const lines = this.abcNotation.split("\n").slice(lineIndex);

		let line = "";
		// Break up
		for (let i = 0; i < lines.length; i++) {
			line = lines[i];
			if (line.startsWith("[V:") || line.startsWith("V:")) {
				i += this.readVoiceSection(lines, i);
			}
		}
		// If no voices were found, assume the whole thing is one voice
		if (this.voices.size === 0) {
			const text = lines.join("\n");
			this.voices.set("default", text);
		}
	}

	/* 	Takes the entire ABC notation text and returns the lines that
		aren't comments, words, or redundant voice names */
	getVoiceLines() {
		let lines = this.abcNotation.split("\n");
		// Remove empty lines
		lines = lines.filter((line) => line !== "");
		// Lines that start with "%" are comments
		lines = lines.filter((line) => !line.startsWith("%"));
		// Lines that start with "w" are words, not notes
		lines = lines.filter((line) => !line.startsWith("w"));
		return lines;
	}

	populateTextMatrix() {
		for (let [, voice] of this.voices) {
			const measures = this.breakVoiceIntoMeasures(voice);
			this.measureTextMatrix.push(measures);
		}
	}

	readVoiceSection(lines, index) {
		let text = lines[index] + "\n";
		let name = lines[index];
		let voiceDefinition = lines[index] + "\n";
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
			} else if (line.startsWith("%%MIDI")) {
				text = lines[index] + "\n";
				voiceDefinition += line + "\n";
			} else {
				break;
			}
		}
		// If a voice with that name exists, add to it, otherwise create a new voice
		if (this.voices.has(name)) {
			this.voices.set(name, this.voices.get(name) + text);
		} else {
			this.voices.set(name, text);
			this.voiceDefinitions.set(name, voiceDefinition);
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

	determineDesiredMeasureLength() {
		// get time signature and note length
		const interpretMeterAndLength = () => {
			try {
				// get time signature
				let timeNumorator = 4;
				let timeDenominator = 4;
				const timeSignature = this.meter.match(
					REGEX.meterDefinition
				)[1];
				if (!timeSignature) {
					this.addWarning("No time signature found");
				}
				if (timeSignature !== "C") {
					if (timeSignature === "C|") {
						// cut time
						timeNumorator = 2;
						timeDenominator = 2;
					} else {
						timeNumorator = this.meter.match(
							REGEX.meterDefinition
						)[2];
						timeDenominator = this.meter.match(
							REGEX.meterDefinition
						)[3];
					}
				}

				let lengthDefinition = "";
				let noteLength = 1;
				let noteDenominator = 8;

				if (this.length) {
					// get note length
					[lengthDefinition, noteLength, noteDenominator] = [
						...this.length.match(REGEX.lengthDefinition),
					];
					// const noteLength = this.length.match(REGEX.lengthDefinition)[1];
					if (noteLength !== "1") {
						this.addWarning(
							"Unexpected denominator of note length: " +
								lengthDefinition
						);
					}
					// const noteDenominator = this.length.match(REGEX.lengthDefinition)[2];
					if (!["2", "4", "8", "16"].includes(noteDenominator)) {
						this.addWarning(
							"Unexpected denominator of note length: " +
								lengthDefinition
						);
					}
				}

				const notesPerMeasure =
					timeNumorator * (noteDenominator / timeDenominator);

				this.notesPerMeasure = parseInt(notesPerMeasure);

				return notesPerMeasure;
			} catch (error) {
				this.addWarning(
					"Error in interpreting meter and length: " + error
				);
				return 8;
			}
		};

		const determineMeasureLengths = () => {
			const lengthFrequency = {};

			// count length of each measure and update frequency
			for (const voice of this.parts) {
				for (const line of voice.lines) {
					for (const measure of line.measures) {
						const length = measure.totalLength;
						if (lengthFrequency[length]) {
							lengthFrequency[length]++;
						} else {
							lengthFrequency[length] = 1;
						}
					}
				}
			}

			// find the most common measure length
			let mostCommonLength = null;
			let maxFrequency = 0;
			for (const length in lengthFrequency) {
				if (lengthFrequency[length] > maxFrequency) {
					maxFrequency = lengthFrequency[length];
					mostCommonLength = length;
				}
			}

			return parseInt(mostCommonLength);
		};

		const notesPerMeasure = interpretMeterAndLength();
		const mostCommonLength = determineMeasureLengths();

		if (notesPerMeasure !== mostCommonLength) {
			this.addNote(
				`Mismatch between notes per measure ${notesPerMeasure} and most common measure length ${mostCommonLength}`
			);
		}

		const desiredMeasureLength = mostCommonLength;
		return desiredMeasureLength;
	}

	checkForErrors() {
		try {
			// if any part has a different length than the others, log a warning
			const partsLengths = this.parts.map((part) => part.totalLength);
			if (partsLengths.some((length) => length !== partsLengths[0])) {
				this.addWarning("Mismatched part lengths: " + partsLengths);
			}

			// if any measure has a different length from corresponding measures in other parts, log a warning
			let lengthsMatrix = [];
			for (const part of this.parts) {
				lengthsMatrix.push(part.measureLengths);
			}
			for (let i = 0; i < lengthsMatrix[0].length; i++) {
				const measureLengths = lengthsMatrix.map((part) => part[i]);
				if (
					measureLengths.some(
						(length) => length !== measureLengths[0]
					)
				) {
					this.addWarning(
						`Measure ${i} has mismatched lengths: ${measureLengths}`
					);
				}
			}
		} catch (error) {
			this.addWarning("Error in checking for errors: " + error);
		}
	}

	get fullText() {
		const bodyText = this.parts.map((part) => part.fullText).join("");
		return this.headerText + bodyText;
	}

	get lengths() {
		let lengths = [];
		for (let part of this.parts) {
			lengths.push(part.totalLength);
		}
		return lengths;
	}

	addWarning(warning) {
		const message = limitTextLength(this.title, 20) + ": " + warning;
		console.warn(message);
		this.warnings.push(message);
	}

	addNote(note) {
		this.notes.push(note);
	}

	addNormalizations(normalization) {
		this.normalizations.push(normalization);
	}

	addFixes(fix) {
		const message = limitTextLength(this.title, 20) + ": " + fix;
		console.log(message);
		this.fixes.push(fix);
	}

	setReferenceNumber(number) {
		const newReference = `X:${number}`;
		this.headerText = this.headerText.replace(
			REGEX.referenceNumber,
			newReference
		);
	}

	setOrigin(origin) {
		const newOrigin = `O:${origin}`;
		if (this.headerText.match(REGEX.origin)) {
			this.headerText = this.headerText.replace(REGEX.origin, newOrigin);
		} else {
			// Place before the first K: line
			const kIndex = this.headerText.indexOf("K:");
			this.headerText =
				this.headerText.slice(0, kIndex) +
				newOrigin +
				"\n" +
				this.headerText.slice(kIndex);
		}
	}

	setHeader(H, value) {
		const newValue = `${H}:${value}`;
		// Replace H with value of H /H:\s*.*/,
		const customRegex = new RegExp(`^${H}:\\s*.+`, "m");
		if (this.headerText.match(customRegex)) {
			this.headerText = this.headerText.replace(customRegex, newValue);
		} else {
			// Place before the first K: line
			const kIndex = this.headerText.indexOf("K:");
			this.headerText =
				this.headerText.slice(0, kIndex) +
				newValue +
				"\n" +
				this.headerText.slice(kIndex);
		}
	}
}

export default ABCNotation;
