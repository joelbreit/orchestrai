import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Input, Row, Spinner } from "reactstrap";
import ABCNotations from "../assets/ABCNotations";
import FileUploader from "./FileUploader";
import Synthesizer from "./Synthesizer";

const apiUrl = process.env.REACT_APP_API_URL;

const ABCEditorContent = ({ tuneId }) => {
	const defaultContent = ABCNotations["3-part Pirates ABC"];
	const [abcNotation, setAbcNotation] = useState(defaultContent);
	const [file, setFile] = useState(null);
	const [didUpload, setDidUpload] = useState(false);
	const [description, setDescription] = useState("");
	const [title, setTitle] = useState("");
	const [creationDate, setCreationDate] = useState("");
	const [prompt, setPrompt] = useState("");

	// Tune retrieval state
	const [retrievalState, setRetrievalState] = useState("");
	const [retrievalStatusCode, setRetrievalStatusCode] = useState(0);

	useEffect(() => {
		const getTune = async () => {
			setRetrievalState("Loading");
			try {
				console.log("Retrieving tune...");
				const response = await fetch(`${apiUrl}/getTune`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ tuneId }),
				});

				// Handle the response
				const body = await response.json();
				const statusCode = response.status;

				if (statusCode === 200) {
					console.log("Tune retrieved successfully");
					setAbcNotation(body.notation);
					setDescription(body.description);
					setTitle(body.title);
					setCreationDate(body.date);
					setPrompt(body.prompt);

					setRetrievalState("success");
				} else {
					console.error(
						"Retrieval error: ",
						body.error || statusCode
					);
					setRetrievalState("error");
				}
				setRetrievalStatusCode(statusCode);
			} catch (error) {
				console.error("Error:", error);
			}
			setRetrievalState("Complete");
		};
		if (tuneId) {
			getTune();
		}
	}, [tuneId]);

	useEffect(() => {
		if (file && !tuneId) {
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
	}, [file, tuneId]);

	const handleInputChange = (e) => {
		setAbcNotation(e.target.value);
	};

	return (
		<div className="container px-4">
			<Container>
				<h1 className="border-bottom">ABC Notation Editor</h1>

				{retrievalState === "Loading" && (
					<Alert color="primary">
						<Spinner
							as="span"
							animation="border"
							size="sm"
							role="status"
							aria-hidden="true"
						/>{" "}
						Saving tune...
					</Alert>
				)}
				{retrievalState === "Complete" && (
					<div>
						<Alert
							color={
								retrievalStatusCode === 200
									? "success"
									: "danger"
							}
						>
							{retrievalStatusCode === 200
								? "Tune retrieved successfully!"
								: "There was an error retrieving your tune."}
						</Alert>

						<Row className="mt-2">
							<Col>
								<h2>Title</h2>
								{title ? (
									<p>{title}</p>
								) : (
									<p>No title provided</p>
								)}
							</Col>
							<Col>
								<h2>Date</h2>
								{creationDate ? (
									<p>{creationDate}</p>
								) : (
									<p>No date provided</p>
								)}
							</Col>
							<Col>
								<h2>Prompt</h2>
								{prompt ? (
									<p>{prompt}</p>
								) : (
									<p>No prompt provided</p>
								)}
							</Col>
						</Row>
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
					</div>
				)}

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
