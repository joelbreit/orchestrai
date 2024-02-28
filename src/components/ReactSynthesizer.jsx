import React, { useState } from "react";
import { Editor, Midi, Notation } from "react-abc";

const ReactSynthesizer = () => {
	const [abcNotation, setAbcNotation] = useState(
		'X:1\nT:Cooley\'s\nM:4/4\nL:1/8\nK:G\n|"G"GA Bc dedB|d2 dB AGEG|'
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
