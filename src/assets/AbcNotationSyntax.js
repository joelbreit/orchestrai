import Prism from "prismjs";

// Define the custom ABC Notation language
Prism.languages.abc = {
	// Metadata (key-value pairs at the beginning of the notation)
	header: {
		pattern: /^[A-Z]:.+/m,
		inside: {
			// You can further define patterns inside headers
			keyword: /%%[a-zA-Z]+/,
			operator: /:/,
			value: /.+/,
		},
	},
	// Directives (e.g., %%MIDI)
	directive: {
		pattern: /%%.+/,
		inside: {
			keyword: /%%[a-zA-Z]+/,
		},
	},
	// Comments
	comment: /%[^\n]*/,
	// Lyrics
	lyrics: /w:.+/,
	// Chords
	chord: /"(.+?)"/,
	// Notes
	note: /[a-gA-GzZ]/,
	// Length of the note (e.g., "/2" for half note)
	length: /\/\d+/,
	// Unisons
	unison: /\[.+?\]/,
	// Barlines (e.g., |, ||, |], [|, :|, |:, |[0-9])
	barline: /\|:?[\]:]?\d*/,
	// More elements can be added based on ABC Notation complexity

};
