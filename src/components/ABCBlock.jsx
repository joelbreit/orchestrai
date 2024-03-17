import Prism from "prismjs";
import React, { useEffect } from "react";
import "../assets/AbcNotationSyntax.js";
import Logger from "../services/Logger.js";

const ABCBlock = ({ code }) => {
	useEffect(() => {
		// Highlight all syntax once the component mounts
		Prism.highlightAll();
		Logger.debug("Code highlighting useEffect");
	}, [code]);

	return (
		<pre
			className="language-abc"
			style={{
				border: "1px solid #dee2e6",
				padding: "10px",
				borderRadius: "5px",
			}}
		>
			<code
				style={{
					whiteSpace: "pre-wrap",
					minHeight: "100px",
					height: `${code.split("\n").length * 25}px`,
				}}
			>
				{code || "\n\n\n"}
			</code>
		</pre>
	);
};

export default ABCBlock;
