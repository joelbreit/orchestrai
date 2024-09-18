import Prism from "prismjs";
import React, { useEffect } from "react";
import { Button } from "reactstrap";
import "../assets/AbcNotationSyntax.js";
import Logger from "../services/Logger.js";

const ABCBlock = ({ code, setCode, onEdit }) => {
	useEffect(() => {
		// Highlight all syntax once the component mounts or code changes
		Prism.highlightAll();
	}, [code]);

	const handlePaste = async () => {
		try {
			const text = await navigator.clipboard.readText();
			setCode(text);
		} catch (err) {
			Logger.error("Failed to read clipboard contents: ", err);
		}
	};

	return (
		<pre
			className="language-abc"
			style={{
				padding: "10px",
				borderRadius: "6px",
				border: "1px solid #DADDE1",
				position: "relative",
				marginBottom: "0",
			}}
		>
			<code
				style={{
					whiteSpace: "pre-wrap",
				}}
			>
				{code || "\n\n\n"}
			</code>
			<div className="ABCFormButtons">
				<Button
					type="button"
					className="primary-button-outline btn-sm"
					onClick={handlePaste}
					style={{ marginRight: "5px" }}
				>
					Paste{" "}
					<span className="icon-square flex-shrink-0">
						<i className={`bi bi-clipboard`}></i>
					</span>
				</Button>
				<Button
					type="button"
					className="primary-button-outline btn-sm"
					onClick={onEdit}
				>
					Edit{" "}
					<span className="icon-square flex-shrink-0">
						<i className={`bi bi-pencil`}></i>
					</span>
				</Button>
			</div>
		</pre>
	);
};

export default ABCBlock;
