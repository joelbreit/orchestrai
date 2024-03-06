import React, { useEffect } from "react";
import Prism from "prismjs";
import "../assets/AbcNotationSyntax.js";

const ABCBlock = ({ code }) => {
	useEffect(() => {
		// Highlight all syntax once the component mounts
		Prism.highlightAll();
	}, [code]);

	return (
		<pre className="language-abc">
			<code>{code}</code>
		</pre>
	);
};

export default ABCBlock;
