import React, { useEffect, useState } from "react";
import { Button, Col, Container, Input, Row } from "reactstrap";

import ABCNotations from "../assets/ABCNotations";
import FileUploader from "./FileUploader";
import Synthesizer from "./Synthesizer";

const ABCEditorContent = () => {
	const defaultContent = ABCNotations["3-part Pirates ABC"];
	const [abcNotation, setAbcNotation] = useState(defaultContent);
	const [file, setFile] = useState(null);
	const [didUpload, setDidUpload] = useState(false);
	const [description, setDescription] = useState("");

	useEffect(() => {
		if (file) {
			setDidUpload(true);
			const reader = new FileReader();

			reader.onload = (e) => {
				const contents = e.target.result;
				// Get text between "Description: " and "ABC Notation: abc"
				const description = e.target.result
					.split("Description: ")[1]
					.split("ABC Notation: abc")[0]
					.trim();
				setDescription(description);
				if (contents.startsWith("Date")) {
					// Get text from "ABC Notation: abc" to the end
					const abc_Notation = e.target.result
						.split("ABC Notation: abc")[1]
						.trim();
					setAbcNotation(abc_Notation);
				} else if (contents.startsWith("Version: 1.0.0")) {
					// Get text between "ABC Notation: abc" and "Thread ID"
					const abc_Notation = e.target.result
						.split("ABC Notation: abc")[1]
						.split("Thread ID")[0]
						.trim();
					setAbcNotation(abc_Notation);
				} else {
					alert("Unrecognized file format");
				}
			};

			reader.readAsText(file);
		}
	}, [file]);

	const handleInputChange = (e) => {
		setAbcNotation(e.target.value);
	};

	return (
		<div className="container px-4">
			<Container>
				<h1 className="border-bottom">ABC Notation Editor</h1>
				<h2>Enter ABC Notation</h2>
				<Input
					type="textarea"
					value={abcNotation}
					onChange={handleInputChange}
					placeholder="Enter ABC notation here"
					rows={10}
				/>
				<Row className="mt-2">
					<Col className="d-flex justify-content-end">
						<Button
							onClick={() => setAbcNotation("")}
							color="danger"
							outline
							size="sm"
							style={{ marginRight: "10px" }}
						>
							Clear
						</Button>
						<FileUploader handleFile={setFile} />
					</Col>
				</Row>
				{didUpload && (
					<Row className="mt-2">
						<Col>
							<h2>Description</h2>
							{description ? (
								<p>{description}</p>
							) : (
								<p>No description provided</p>
							)}
						</Col>
					</Row>
				)}
				<Row className="mt-2">
					<Col>
						<h2>Rendered Sheet Music</h2>
						<Synthesizer abcNotation={abcNotation} index={0} />
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default ABCEditorContent;
