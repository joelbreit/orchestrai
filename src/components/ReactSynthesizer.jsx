import React, { useState } from "react";
import { Editor, Midi, Notation } from "react-abc";

const ReactSynthesizer = () => {
	const [abcNotation, setAbcNotation] = useState(
		`X:1
T:Pirate's Horizon
C:AI Composer
M:4/4
L:1/8
Q:1/4=120
K:Dm
% The main melody
V:1 clef=treble
|: "Dm"d2A2 A2fd | "C"e2G2 G2ec | "Bb"A2F2 F2Bd | "A"A2E2 E4 |
"Dm"d2A2 A2fd | "C"e2G2 G2ec | "Bb"A2F2 "A"E2D2 |1 "Dm"D4 D4 :|2 "Dm"D4 z4 |
% The counter melody
V:2 clef=treble
|: "Dm"A2d2 f2a2 | "C"g2e2 e2g2 | "Bb"f2d2 d2f2 | "A"e2^c2 c4 |
"Dm"A2d2 f2a2 | "C"g2e2 e2g2 | "Bb"f2d2 "A"e2^c2 |1 "Dm"d4 d4 :|2 "Dm"d4 z4 |
% The bass line
V:3 clef=bass
|: "Dm"D4 F4 | "C"E4 G4 | "Bb"B,4 D4 | "A"A,4 E4 |
"Dm"D4 F4 | "C"E4 G4 | "Bb"B,4 "A"C4 |1 "Dm"D4 D4 :|2 "Dm"D4 z4 |`
	);
	const id = "abc";

	return (
		<div>
			{/* <Editor abc={abcNotation} onChange={setAbcNotation} /> */}

			<div>
				<textarea defaultValue={abcNotation} id={id} />
				<Editor editArea={id} />
			</div>

			{/* <Notation abc={abcNotation} /> */}
			{/* <Midi abc={abcNotation} /> */}

			<Notation notation={abcNotation} />
			<Midi notation={abcNotation} />
		</div>
	);
};

export default ReactSynthesizer;
