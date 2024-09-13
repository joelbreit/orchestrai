import Prism from "prismjs";
import React, { useEffect } from "react";
import "../assets/AbcNotationSyntax.js";
import Logger from "../services/Logger.js";
import { Button } from "reactstrap";

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
				padding: "10px",
				borderRadius: "6px",
				border: "1px solid #DADDE1",
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
			<Button
				type="button"
				className="primary-button-outline ABCFormButton btn-sm"
			>
				Edit{" "}
				<span className="icon-square flex-shrink-0">
					<i className={`bi bi-pencil`}></i>
				</span>
			</Button>
		</pre>
	);
};

export default ABCBlock;
