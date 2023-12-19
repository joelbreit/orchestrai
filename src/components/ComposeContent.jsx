// Import dependencies
import React, { useContext, useEffect, useState } from "react";

// Import components
import {
	Alert,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Col,
	Collapse,
	Container,
	Form,
	FormFeedback,
	FormGroup,
	Input,
	Label,
	Nav,
	NavItem,
	NavLink,
	Progress,
	Spinner,
	TabContent,
	TabPane
} from "reactstrap";
import FeedbackForm from "./FeedbackForm";
import ProtectedContent from "./ProtectedContent";
import Synthesizer from "./Synthesizer";

// Import contexts
import { AppContext } from "../contexts/AppContext";

// Import constants
import {
	AVERAGE_ORCHESTRAI_COMPLETION_TIME as EXPECTED_DURATION,
	ORCHESTRAI_LOADING_MESSAGES as LOADING_MESSAGES,
	ORCHESTRAI_TIMEOUT_DURATION as MAX_DURATION,
	PROMPT_SUGGESTIONS,
	ORCHESTRAI_SAVE_FILE_VERSION as SAVE_FILE_VERSION,
	VIBE_SUGGESTIONS,
} from "../assets/Constants";
const apiUrl = process.env.REACT_APP_API_URL;

const ComposeContent = () => {
	// App context
	const { appState } = useContext(AppContext);

	// Parameters
	const [activeTab, setActiveTab] = useState("1");
	const [vibe, setVibe] = useState("");
	const [fullPrompt, setFullPrompt] = useState("");
	const [input, setInput] = useState("");

	// Loading state
	const [isLoading, setIsLoading] = useState(false);
	const [timeSoFar, setTimeSoFar] = useState(0);
	const [percentComplete, setPercentComplete] = useState(0);
	const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0]);
	const [hasGeneratedMusic, setHasGeneratedMusic] = useState(false);
	const [errorMessage, setErrorMessage] = useState();

	// Music generation state
	const [abcNotation, setAbcNotation] = useState("");
	const [description, setDescription] = useState("");

	// File download information
	const [thread, setThread] = useState("");
	const [run, setRun] = useState("");

	// Feedback form state
	const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

	const toggleTab = (tab) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	const handleNotationChange = (e) => {
		setAbcNotation(e.target.value);
	};

	// Calculate % complete
	useEffect(() => {
		let raw = 0;
		if (timeSoFar + 10 >= EXPECTED_DURATION) {
			raw = (timeSoFar / (timeSoFar + 10)) * 100;
		} else {
			raw = (timeSoFar / EXPECTED_DURATION) * 100;
		}
		const rounded = Math.round(raw);
		console.log("Percent complete:", rounded);
		setPercentComplete(rounded);
	}, [timeSoFar]);

	useEffect(() => {
		if (activeTab === "1") {
			setInput(vibe);
		} else if (activeTab === "3") {
			setInput(fullPrompt);
		}
	}, [activeTab, vibe, fullPrompt]);

	const suggestVibe = () => {
		const randomIndex = Math.floor(Math.random() * VIBE_SUGGESTIONS.length);
		setVibe(VIBE_SUGGESTIONS[randomIndex]);
	};

	const suggestFullPrompt = () => {
		const randomIndex = Math.floor(
			Math.random() * PROMPT_SUGGESTIONS.length
		);
		setFullPrompt(PROMPT_SUGGESTIONS[randomIndex]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const startTime = Date.now();
		setLoadingMessage(LOADING_MESSAGES[0]);
		setPercentComplete(0);
		setErrorMessage("");
		setIsLoading(true);
		setIsFeedbackOpen(false);

		try {
			let threadId = "";
			let runId = "";
			let content = "";

			// If tab 1
			if (activeTab === "1") {
				content = `Compose a tune that expresses the following vibe: ${vibe}`;
			} else if (activeTab === "3") {
				content = `Please create a tune for this prompt: ${fullPrompt}`;
			}

			const generateMusicResponse = await fetch(
				`${apiUrl}/generateMusic`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						UUID: appState.UUID,
						content: content,
					}),
				}
			);

			// Handle the response
			const generateMusicBody = await generateMusicResponse.json();
			const statusCode = generateMusicResponse.status;
			if (statusCode === 200) {
				console.log("Success:", generateMusicBody);
			} else {
				throw new Error(generateMusicBody.message);
			}
			console.log("Generate Music Response:", generateMusicBody.message);

			threadId = generateMusicBody.threadId;
			runId = generateMusicBody.runId;
			setThread(threadId);
			setRun(runId);

			let messageIndex = 0;

			// Check run status
			let runStatus;
			let secondsSoFar = 0;
			let messages = [];
			do {
				const checkStatusResponse = await fetch(
					`${apiUrl}/checkStatus`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							UUID: appState.UUID,
							threadId: threadId,
							runId: runId,
						}),
					}
				);

				// Handle the response
				const checkStatusBody = await checkStatusResponse.json();
				const statusCode = checkStatusResponse.status;
				if (statusCode === 200) {
					console.log("Success:", checkStatusBody);
				} else {
					throw new Error(checkStatusBody.message);
				}
				console.log("Check Status Response:", checkStatusBody.message);

				runStatus = checkStatusBody.status;
				messages = checkStatusBody.messages;

				console.log("Run status:", runStatus);

				// Wait for a few seconds before checking again
				const seconds = Math.floor(Math.random() * 8) + 2;
				await new Promise((resolve) =>
					setTimeout(resolve, 1000 * seconds)
				);

				secondsSoFar = Math.floor((Date.now() - startTime) / 1000);
				console.log("Seconds so far:", secondsSoFar);
				setTimeSoFar(secondsSoFar);
				const progress = secondsSoFar / EXPECTED_DURATION;
				const messagesLength = LOADING_MESSAGES.length;
				console.log("Progress:", Math.round(progress * 100), "%");
				messageIndex = Math.floor(progress * messagesLength);
				console.log("Message index:", messageIndex);
				setLoadingMessage(LOADING_MESSAGES[messageIndex]);

				if (secondsSoFar > MAX_DURATION) {
					setErrorMessage(
						"OrchestrAI took too long to generate music. Please try again."
					);
					setIsLoading(false);
					return;
				}
			} while (runStatus !== "completed");

			console.log("Messages:", messages);
			const output = messages[0].content[0].text.value;
			console.log("Output:", output);
			setAbcNotation(output.match(/```([^`]*)```/)[1]);
			setDescription(output.replace(/```([^`]*)```/, ""));
			setHasGeneratedMusic(true);
			console.log("Generated music:", abcNotation); // It's not updating here either
		} catch (error) {
			console.error("API call failed:", error);
			setErrorMessage(error.message);
			setIsLoading(false);
			return;
		} finally {
			setIsLoading(false);
		}
	};

	const handleDownload = (feedback) => {
		const element = document.createElement("a");
		const file = new Blob(
			[
				`Version: ${SAVE_FILE_VERSION}\n
Username: ${appState.username}\n
Date and Time: ${new Date().toLocaleString()}\n
Input: ${input}\n
Description: ${description}\n
ABC Notation: ${abcNotation}\n
Thread ID: ${thread}\n
Run ID: ${run}\n
Error Message: ${errorMessage}\n,
Feedback: ${feedback}\n`,
			],
			{ type: "text/plain" }
		);
		element.href = URL.createObjectURL(file);
		const fileName = `OrchestrAI_${new Date().toLocaleString()}.txt`;
		element.download = fileName;
		document.body.appendChild(element); // Required for this to work in FireFox
		element.click();
	};

	const toggleFeedback = () => {
		setIsFeedbackOpen(!isFeedbackOpen);
	};

	return (
		<div className="container px-4">
			<Container>
				<h1 className="border-bottom">Compose Music with GPT-4</h1>
				<p>
					This composition tool uses GPT-4's assistants API provided
					by OpenAI to generate music notation. You can provide
					basically any text description, and a piece of music will be
					generated in ABC notation which will then be rendered for
					you to watch, listen, edit and save.
				</p>
				{/* TODO separate the different error message areas */}
				{errorMessage && <Alert color="danger">{errorMessage}</Alert>}
				<ProtectedContent>
					<div>
						<h3>
							Customize Music{" "}
							<span className="icon-square flex-shrink-0">
								<i className={`bi bi-music-note-beamed`}></i>
							</span>
						</h3>

						<Nav tabs>
							<NavItem>
								<NavLink
									className={
										activeTab === "1" ? "active" : ""
									}
									onClick={() => {
										toggleTab("1");
									}}
								>
									Simple{" "}
									<span className="icon-square flex-shrink-0">
										<i className={`bi bi-brush`}></i>
									</span>
								</NavLink>
							</NavItem>
							{/* <NavItem>
								<NavLink
									className={
										activeTab === "2" ? "active" : ""
									}
									onClick={() => {
										toggleTab("2");
									}}
								>
									Intermediate{" "}
									<span className="icon-square flex-shrink-0">
										<i className={`bi bi-tools`}></i>
									</span>
								</NavLink>
							</NavItem> */}
							<NavItem>
								<NavLink
									className={
										activeTab === "3" ? "active" : ""
									}
									onClick={() => {
										toggleTab("3");
									}}
								>
									Advanced{" "}
									<span className="icon-square flex-shrink-0">
										<i
											className={`bi bi-gear-wide-connected`}
										></i>
									</span>
								</NavLink>
							</NavItem>
						</Nav>
						<TabContent activeTab={activeTab}>
							<TabPane tabId="1">
								<Form onSubmit={handleSubmit} className="mt-3">
									<FormGroup>
										<Label
											for="vibe"
											style={{ marginRight: "0.5rem" }}
										>
											Vibe of the composition
										</Label>
										<Button
											className="primary-button"
											size="sm"
											onClick={suggestVibe}
										>
											Suggest one for me{" "}
											<i className={`bi bi-magic`}></i>
										</Button>
										<Input
											type="text"
											id="vibe"
											value={vibe}
											onChange={(e) =>
												setVibe(e.target.value)
											}
											placeholder="Enter a vibe here"
											maxLength={100}
											className="mt-2"
										/>
										<span className="character-counter">
											{vibe.length}/100
										</span>
									</FormGroup>
									<FormFeedback>
										You must enter a vibe and an API key.
									</FormFeedback>
									<FormGroup>
										<Button
											type="submit"
											value="Generate Music"
											className="btn btn-primary primary-button"
											disabled={!vibe || isLoading}
										>
											{isLoading && (
												<>
													<Spinner
														as="span"
														animation="border"
														size="sm"
														role="status"
														aria-hidden="true"
													/>{" "}
												</>
											)}
											Generate Music{" "}
											<i
												className={`bi bi-music-note-beamed`}
											></i>
										</Button>
									</FormGroup>
								</Form>
							</TabPane>
							<TabPane tabId="3">
								<Form onSubmit={handleSubmit} className="mt-3">
									<FormGroup>
										<Label
											for="fullPrompt"
											style={{ marginRight: "0.5rem" }}
										>
											Prompt
										</Label>
										<Button
											className="primary-button"
											size="sm"
											onClick={suggestFullPrompt}
										>
											Suggest one for me{" "}
											<i className={`bi bi-magic`}></i>
										</Button>
										<Input
											type="textarea"
											id="fullPrompt"
											value={fullPrompt}
											onChange={(e) =>
												setFullPrompt(e.target.value)
											}
											placeholder="Write a full prompt for what you want the composition to be"
											className="mt-2"
										/>
									</FormGroup>
									<FormFeedback>
										You must enter a vibe and an API key.
									</FormFeedback>
									<FormGroup>
										<Button
											type="submit"
											value="Generate Music"
											className="btn btn-primary primary-button"
											disabled={!fullPrompt || isLoading}
										>
											{isLoading && (
												<>
													<Spinner
														as="span"
														animation="border"
														size="sm"
														role="status"
														aria-hidden="true"
													/>{" "}
												</>
											)}
											Generate Music{" "}
											<i
												className={`bi bi-music-note-beamed`}
											></i>
										</Button>
									</FormGroup>
								</Form>
							</TabPane>
							{/* <TabPane tabId="3">Hello, this is tab 3</TabPane> */}
						</TabContent>
						{isLoading && (
							<div>
								<p>{loadingMessage}</p>
								<Progress
									animated
									value={percentComplete}
									className="tertiary-progress-bar mb-3"
								>
									{percentComplete > 9 && (
										<>{percentComplete}%</>
									)}
								</Progress>
							</div>
						)}
						{hasGeneratedMusic && (
							<>
								<h2>Generated Description</h2>
								{vibe || fullPrompt ? (
									<>
										<h3>Output</h3>
										{description ? (
											<p>{description}</p>
										) : (
											<p>
												*No description was generated
												this time.*
											</p>
										)}
									</>
								) : (
									"Enter a vibe above to generate music."
								)}
								<div style={{ marginTop: "20px" }}>
									<h2>Rendered Sheet Music</h2>
									<Synthesizer
										abcNotation={abcNotation}
										index={0}
									/>
								</div>
								<h2>Generated ABC Notation</h2>
								<Input
									type="textarea"
									value={abcNotation}
									onChange={handleNotationChange}
									placeholder="Enter ABC notation here"
									rows={10}
								/>
								<Button
									onClick={handleDownload}
									className="btn btn-primary primary-button mt-3"
								>
									<div className="icon-square flex-shrink-0">
										{" "}
										Download{" "}
										<i className={`bi bi-download`}></i>
									</div>
								</Button>
								{/* TODO add this back */}
								{/* {!isFeedbackOpen && (
									<Button
										onClick={toggleFeedback}
										className="primary-button mt-3"
									>
										Submit Feedback{" "}
										<i
											className={`bi bi-chat-right-text`}
										></i>
									</Button>
								)} */}
								<hr />
							</>
						)}

						<Collapse isOpen={isFeedbackOpen}>
							<Card>
								<CardHeader>
									<h4>Feedback on Generated Composition</h4>
								</CardHeader>
								<CardBody>
									<FeedbackForm
										toggleFeedback={toggleFeedback}
									/>
								</CardBody>
								<CardFooter>
									<Col className="d-flex justify-content-between">
										<Button onClick={toggleFeedback}>
											Cancel
										</Button>
										<Button className="primary-button">
											Download{" "}
											<i className={`bi bi-download`}></i>
										</Button>
									</Col>
								</CardFooter>
							</Card>
						</Collapse>
					</div>
				</ProtectedContent>
			</Container>
		</div>
	);
};

export default ComposeContent;
