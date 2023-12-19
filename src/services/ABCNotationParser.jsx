// import ABCJS from "abcjs";

const voiceLineStartRegex = /^[a-gz\{\|%w"\()}]/i;
const nonNoteNotationRegex = /[\[\]\:\|\\n]/i;

class ABCNotation {
	constructor(abcNotation) {
		this.abcNotation = abcNotation;
        this.title = this.extractTitle();
		this.voices = new Map();
		this.measureTextMatrix = [];
		this.measureBeatsMatrix = [];
		this.readNotation();
	}

    extractTitle() {
        const titleMatch = this.abcNotation.match(/^T:(.*)$/m);
        return titleMatch ? titleMatch[1].trim() : 'Untitled';
    }

	readNotation() {
		let lines = this.abcNotation.split("\n");
		lines = lines.filter((line) => line !== "");
		lines = lines.filter((line) => !line.startsWith("%"));
		lines = lines.filter((line) => !line.startsWith("w"));
		// Remove all consecutive lines that start with "V"
		if (lines.some((line) => line.startsWith("V:"))) {
			let index = lines.findIndex((line) => line.startsWith("V:"));
			while (lines[index + 1].startsWith("V:")) {
				lines.splice(index + 1, 1);
			}
		}

		let state = "";
		let line = "";
		for (let i = 0; i < lines.length; i++) {
			line = lines[i];
			let firstChar = line.charAt(0);

			if (line.startsWith("[V:") || line.startsWith("V:")) {
				i += this.readVoice(lines, i);
			}
		}
		for (let [voiceName, voice] of this.voices) {
			const measures = this.breakVoiceIntoMeasures(voice);
			this.measureTextMatrix.push(measures);
		}
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
		console.log(this.measureTextMatrix);
	}

	readVoice(lines, index) {
		let text = "";
		let name = lines[index];
		let linesAdvanced = 0;
		for (let i = index + 1; i < lines.length; i++) {
			let line = lines[i];
			let firstChar = line.charAt(0);

			if (firstChar.match(voiceLineStartRegex)) {
				text += line + "\n";
				linesAdvanced++;
			} else {
				break;
			}
		}
		// If  a voice with that name exists, add to it, otherwise create a new voice
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
		return measures;
	}

	createMeasureMatrix() {
		this.voices.forEach((voice, voiceName) => {
			let lines = voice.split("\n");
			lines = lines.filter((line) => line !== "");
			lines = lines.filter((line) => !line.startsWith("%"));
			let measures = [];
			let measure = "";
			for (let i = 0; i < lines.length; i++) {
				let line = lines[i];
				let firstChar = line.charAt(0);

				if (firstChar.match(voiceLineStartRegex)) {
					measure += line + "\n";
				} else {
					measures.push(measure);
					measure = "";
				}
			}
			this.measureTextMatrix.push(measures);
		});
	}
}

const abc = `X:1
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

const abc2 = `X:1
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

const abcNotation = new ABCNotation(abc);

const abcNotation2 = new ABCNotation(abc2);

console.log(abcNotation.measureTextMatrix);

// export default ABCNotation;
