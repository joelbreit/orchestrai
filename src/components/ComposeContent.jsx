// Import dependencies
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logger from "../services/Logger";

// Import components
import {
	Alert,
	Badge,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Col,
	Collapse,
	Container,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Form,
	FormGroup,
	FormText,
	Input,
	Label,
	Nav,
	NavItem,
	NavLink,
	Progress,
	Spinner,
	TabContent,
	TabPane,
} from "reactstrap";
// import ABCNotation from "../services/ABCNotationParser";
import ABCNotation from "../services/notation-editing/parser";
import FeedbackForm from "./FeedbackForm";

// Import contexts
import { AppContext } from "../contexts/AppContext";

// Import constants
import {
	AVERAGE_ORCHESTRAI_COMPLETION_TIME as EXPECTED_DURATION,
	ORCHESTRAI_LOADING_MESSAGES as LOADING_MESSAGES,
	ORCHESTRAI_TIMEOUT_DURATION as MAX_DURATION,
	OPEN_ROUTER_MODELS,
	PROMPT_SUGGESTIONS,
} from "../assets/Constants";
import GenerateId from "../services/GenerateId";
import TuneViewerComponent from "./TuneViewerComponent";
const apiUrl = process.env.REACT_APP_API_URL;

const ComposeContent = () => {
	// App context
	const { appState } = useContext(AppContext);

	// User Input
	const [activeTab, setActiveTab] = useState("1");
	const [advancedPrompt, setAdvancedPrompt] = useState("");
	const [openRouterPrompt, setOpenRouterPrompt] = useState("");
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [model, setModel] = useState("openai/gpt-4o");
	const [input, setInput] = useState("");
	const [advancedPromptIndex, setAdvancedPromptIndex] = useState(
		Math.floor(Math.random() * PROMPT_SUGGESTIONS.length)
	);

	// Loading state
	const [isLoading, setIsLoading] = useState(false);
	const [timeSoFar, setTimeSoFar] = useState(0);
	const [percentComplete, setPercentComplete] = useState(1);
	const [hasGeneratedMusic, setHasGeneratedMusic] = useState(false);
	const [errorMessage, setErrorMessage] = useState();
	const [runStatus, setRunStatus] = useState("");

	// Music generation state
	const [abcNotation, setAbcNotation] = useState("");
	const [uncleanedNotation, setUncleanedNotation] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	// ABC Cleaner state
	const [hasCleaned, setHasCleaned] = useState(false);
	const [numFixes, setNumFixes] = useState(0);
	const [warnings, setWarnings] = useState([]);
	const [fixesList, setFixesList] = useState([]);
	// TODO use this
	// const [failed, setFailed] = useState(false);

	// File download information
	const [thread, setThread] = useState("");
	const [run, setRun] = useState("");

	// Save tune state
	const [tuneId, setTuneId] = useState("");
	// Need to set displayTuneId after a tune is saved so that TuneViewerComponent updates
	const [displayTuneId, setDisplayTuneId] = useState("");
	const [saveState, setSaveState] = useState("");
	const [saveStatusCode, setSaveStatusCode] = useState(0);

	// Feedback form state
	const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

	const toggleTab = (tab) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

	const setPageTitle = (title) => {
		document.title = title;
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
		setPercentComplete(rounded);
	}, [timeSoFar]);

	useEffect(() => {
		if (activeTab === "1") {
			setInput("Compose whatever you want");
		} else if (activeTab === "2") {
			setInput(advancedPrompt);
		} else if (activeTab === "3") {
			setInput(openRouterPrompt);
		}
	}, [activeTab, advancedPrompt, openRouterPrompt]);

	useEffect(() => {
		const cleanedNotation = new ABCNotation(abcNotation);
		setAbcNotation(cleanedNotation.fullText);
		setHasCleaned(true);
		setNumFixes(cleanedNotation.fixes.length);
		setWarnings(cleanedNotation.warnings);
		setFixesList(cleanedNotation.fixes);
		// setFailed(cleanedNotation.failed);
	}, [abcNotation]);

	// When ready to save tune
	useEffect(() => {
		const handleSaveTune = async () => {
			setSaveState("Loading");

			const nycTime = new Date().toLocaleString("en-US", {
				timeZone: "America/New_York",
				hour12: false,
				hour: "numeric",
				minute: "numeric",
				second: "numeric",
			});
			const dateAndTime = `${new Date()
				.toISOString()
				.slice(0, 10)} ${nycTime}`;

			const newTitle = abcNotation.match(/^T:(.*)$/m)[1];
			setTitle(newTitle);

			const body = {
				tuneId: tuneId,
				accountId: appState.accountId || "m18g2y71", // NotLoggedIn account used for easy compose feature
				date: dateAndTime,
				thread: thread,
				run: run,
				title: newTitle,
				prompt: input || "Compose whatever you want", // TODO this might be wrong if the user switches tabs
				description: description,
				notation: abcNotation,
				warnings: warnings,
				fixes: numFixes,
				fixesList: fixesList,
				generationDuration: timeSoFar,
				uncleanedNotation: uncleanedNotation,
			};

			const saveTuneResponse = await fetch(`${apiUrl}/saveTune`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});

			// Handle the response
			const saveTuneBody = await saveTuneResponse.json();
			const statusCode = saveTuneResponse.status;
			if (statusCode === 200) {
				Logger.log("Success:", saveTuneBody);
			} else {
				Logger.error("Error:", saveTuneBody.message);
			}
			Logger.log("Save Tune Response:", saveTuneBody);

			setSaveStatusCode(statusCode);
			setSaveState("Complete");
			setDisplayTuneId(tuneId);
		};

		if (hasGeneratedMusic && hasCleaned && tuneId) {
			handleSaveTune();
		}
	}, [hasGeneratedMusic, hasCleaned, tuneId]); // eslint-disable-line react-hooks/exhaustive-deps

	const suggestAdvancedPrompt = () => {
		const nextIndex = (advancedPromptIndex + 1) % PROMPT_SUGGESTIONS.length;
		setAdvancedPrompt(PROMPT_SUGGESTIONS[nextIndex]);
		setAdvancedPromptIndex(nextIndex);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const startTime = Date.now();
		setPercentComplete(0);
		setErrorMessage("");
		setIsLoading(true);
		setIsFeedbackOpen(false);
		setRunStatus("Queued");

		const handleOpenAIAPI = async () => {
			let threadId = "";
			let runId = "";
			let content = "";

			// If tab 1
			if (activeTab === "1") {
				content = "Compose whatever you want";
			} else if (activeTab === "2") {
				content = `Please create a tune for this prompt: ${advancedPrompt}`;
			} else if (activeTab === "3") {
				content = `${openRouterPrompt}`;
			} else {
				Logger.warn("Unknown tab:", activeTab);
			}

			const generateMusicResponse = await fetch(
				`${apiUrl}/generateMusic`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						accountId: appState.accountId || "m18g2y71", // NotLoggedIn account used for easy compose feature
						content: content,
					}),
				}
			);

			// Handle the response
			const generateMusicBody = await generateMusicResponse.json();
			const statusCode = generateMusicResponse.status;
			if (statusCode === 200) {
				Logger.log("Success:", generateMusicBody);
			} else {
				setErrorMessage(generateMusicBody.message);
				Logger.error("Error:", generateMusicBody.message);
			}
			Logger.log("Generated response:", generateMusicBody.message);

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
							UUID: appState.accountId || "m18g2y71",
							threadId: threadId,
							runId: runId,
						}),
					}
				);

				// Handle the response
				const checkStatusBody = await checkStatusResponse.json();
				const statusCode = checkStatusResponse.status;
				if (statusCode === 200 || statusCode === 202) {
					Logger.log("Success:", checkStatusBody);
				} else {
					setErrorMessage(checkStatusBody.message);
					Logger.error("Error:", checkStatusBody.message);
				}
				Logger.log("Check Status Response:", checkStatusBody.message);

				runStatus = checkStatusBody.status;
				messages = checkStatusBody.messages;

				Logger.log("Run status:", runStatus);
				switch (runStatus) {
					case "queued":
						setRunStatus("Queued");
						break;
					case "in_progress":
						setRunStatus("In Progress");
						break;
					case "completed":
						setPercentComplete(100);
						setRunStatus("Completed");
						break;
					case "failed":
						setRunStatus("Failed");
						return;
					default:
						setRunStatus("Unknown");
						break;
				}

				if (runStatus !== "completed") {
					const pauseStart = Date.now();
					// Update a few times more quickly
					const numTimes = Math.floor(Math.random() * 5) + 1; // 1-5 times
					for (let i = 0; i < numTimes; i++) {
						const shorterPause = Math.random() * 4; // 0-4 seconds
						await new Promise((resolve) =>
							setTimeout(resolve, 1000 * shorterPause)
						);
						secondsSoFar = Math.floor(
							(Date.now() - startTime) / 1000
						);
						setTimeSoFar(secondsSoFar);
						const progress = secondsSoFar / EXPECTED_DURATION;
						const messagesLength = LOADING_MESSAGES.length;
						messageIndex = Math.floor(progress * messagesLength);
						if (messageIndex >= messagesLength) {
							messageIndex = messagesLength - 1;
						}
					}

					// Make sure we wait at least 2 seconds before pinging again
					const pauseEnd = Date.now();
					const pauseDuration = pauseEnd - pauseStart;
					if (pauseDuration < 2000) {
						await new Promise((resolve) =>
							setTimeout(resolve, 2000 - pauseDuration)
						);
					}

					if (secondsSoFar > MAX_DURATION) {
						setErrorMessage(
							"OrchestrAI took too long to generate music. Please try again."
						);
						setIsLoading(false);
						return;
					}
				}
			} while (runStatus !== "completed");

			Logger.log("Messages:", messages);
			const output = messages[0].content[0].text.value;
			Logger.log("Output:", output);

			setHasCleaned(false);
			let parsedNotation;
			try {
				parsedNotation = output.match(/```([^`]*)```/)[1];
			} catch (error) {
				Logger.error("Error parsing notation:", error);
				setErrorMessage(
					"Unable to find ABC notation in the response. Please try again."
				);
				setIsLoading(false);
				return;
			}
			setAbcNotation(parsedNotation);
			setUncleanedNotation(parsedNotation);
			setDescription(output.replace(/```([^`]*)```/, ""));
			setHasGeneratedMusic(true);
			setTuneId(GenerateId());
			setSaveState("");
			setSaveStatusCode(0);
			// handleSaveTune();
		};

		const handleOpenRouterAPI = async () => {
			let secondsSoFar = 0;
			setRunStatus("In Progress");
			const openRouterResponse = await fetch(
				`${apiUrl}/OpenRouterGenerate`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						accountId: appState.accountId,
						content: `${openRouterPrompt}`,
						model: model,
					}),
				}
			);

			// Handle the response
			const responseBody = await openRouterResponse.json();
			const statusCode = openRouterResponse.status;
			if (statusCode === 200) {
				Logger.log("Success:", responseBody);
				setRunStatus("Completed");
			} else {
				setErrorMessage(responseBody.message);
				setRunStatus("Failed");
				Logger.error("Error:", responseBody.message);
			}

			const message = responseBody.message;
			Logger.debug("Message:", message);
			const data = responseBody.data;
			Logger.debug("Data:", data);
			const choices = data.choices;
			Logger.debug("Choices:", choices);

			Logger.log("Generated response:", responseBody.message);

			setThread(data.model);
			setRun("NA");
			secondsSoFar = Math.floor((Date.now() - startTime) / 1000);
			setTimeSoFar(secondsSoFar);

			// Update progress bar
			// Set timeout threashold

			const output = choices[0].message.content;
			// Logger.log("Output:", output);

			setHasCleaned(false);
			let parsedNotation;
			try {
				parsedNotation = output.match(/```([^`]*)```/)[1];
			} catch (error) {
				Logger.error("Error parsing notation:", error);
				setErrorMessage(
					"Unable to find ABC notation in the response. Please try again."
				);
				setIsLoading(false);
				return;
			}
			setAbcNotation(parsedNotation);
			setUncleanedNotation(parsedNotation);
			setDescription(output.replace(/```([^`]*)```/, ""));
			setHasGeneratedMusic(true);
			setTuneId(GenerateId());
			setSaveState("");
			setSaveStatusCode(0);
			// handleSaveTune();
		};

		try {
			if (activeTab === "3") {
				await handleOpenRouterAPI();
			} else {
				await handleOpenAIAPI();
			}
		} catch (error) {
			Logger.error("API call failed:", error);
			setErrorMessage(error.message);
			setIsLoading(false);
			return;
		} finally {
			setIsLoading(false);
		}
	};

	// 	const handleDownload = (feedback) => {
	// 		const element = document.createElement("a");
	// 		const file = new Blob(
	// 			[
	// 				`Version: ${SAVE_FILE_VERSION}\n
	// tuneId: ${tuneId}\n
	// accountId: ${appState.accountId}\n
	// Date and Time: ${new Date().toLocaleString()}\n
	// Input: ${input}\n
	// Description: ${description}\n
	// ABC Notation: ${abcNotation}\n
	// Thread ID: ${thread}\n
	// Run ID: ${run}\n
	// Error Message: ${errorMessage}\n,
	// Feedback: ${feedback}\n`,
	// 			],
	// 			{ type: "text/plain" }
	// 		);
	// 		element.href = URL.createObjectURL(file);
	// 		const fileName = `OrchestrAI_${new Date().toLocaleString()}.txt`;
	// 		element.download = fileName;
	// 		document.body.appendChild(element); // Required for this to work in FireFox
	// 		element.click();
	// 	};

	const toggleFeedback = () => {
		setIsFeedbackOpen(!isFeedbackOpen);
	};

	const renderCustomModelExplanation = () => {
		return (
			<FormText style={{ marginBottom: "1rem" }}>
				<strong>Custom Model</strong>
				<p>
					The custom model is a version of GPT-4o modified with the
					OpenAI assistants API. This model is different from the
					GPT-4 models available under the OpenRouter Compose tab.
					<ul>
						<li>
							It is not fine-tuned with any data, but it is
							different in the following ways.
						</li>
						<li>
							It has been provided access to some music theory
							materials and ABC notation standards.
						</li>
						<li>
							It uses a few shot learning approach by providing 5
							modified examples of previously successful AI
							generated compositions.
						</li>
						<li>
							It provides custom instructions aimed at a reduced
							error rate in the generated music.
						</li>
					</ul>
					You can provide any text description, and a piece of music
					will be generated in ABC notation which will then be
					rendered for you to watch, listen, edit and save.
				</p>
			</FormText>
		);
	};

	return (
		<Container>
			<h1 className="border-bottom">Compose Music with AI</h1>
			<p>
				This composition tool uses LLM APIs like GPT-4 or Claude Sonnet
				to generate music notation. You can provide any text
				description, and a piece of music will be generated in ABC
				notation which will then be rendered for you to watch, listen,
				edit and save.
			</p>
			{!appState.authenticated && (
				<p className="mt-3">
					<a href="/signup">Create a free account</a> or{" "}
					<a href="/login">log in</a> to use the advanced compose
					feature.
				</p>
			)}
			{errorMessage && <Alert color="danger">{errorMessage}</Alert>}
			{/* <ProtectedContent> */}
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
								activeTab === "1"
									? "active active-tab"
									: "inactive-tab"
							}
							onClick={() => {
								toggleTab("1");
							}}
						>
							Easy Compose <i className="bi bi-music-note"></i>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							className={
								activeTab === "2"
									? "active active-tab"
									: "inactive-tab"
							}
							onClick={() => {
								toggleTab("2");
							}}
							disabled={!appState.authenticated}
						>
							Advanced Compose{" "}
							<i className="bi bi-code-square"></i>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							className={
								activeTab === "3"
									? "active active-tab"
									: "inactive-tab"
							}
							onClick={() => {
								toggleTab("3");
							}}
							disabled={!appState.authenticated}
						>
							OpenRouter Compose{" "}
							<i className="bi bi-diagram-3"></i>
						</NavLink>
					</NavItem>
				</Nav>
				<TabContent activeTab={activeTab}>
					<TabPane tabId="1">
						<Form onSubmit={handleSubmit} className="mt-3">
							<FormGroup>
								<p>
									Don't know what to ask for? Use the
									"Surprise me" button to let the AI compose
									whatever it wants.
								</p>
								{renderCustomModelExplanation()}

								{/* Surprise me button */}
								<Button
									type="submit"
									value="Surprise me"
									className="btn btn-primary primary-button-outline"
									style={{ marginLeft: "10px" }}
									disabled={isLoading}
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
									Surprise me!{" "}
									<i className={`bi bi-dice-5`}></i>
								</Button>
							</FormGroup>
						</Form>
					</TabPane>
					<TabPane tabId="2">
						<Form onSubmit={handleSubmit} className="mt-3">
							<p>
								Advanced Compose allows you to provide a full
								prompt for the composition. The custom GPT-4o
								model will generate music based on your prompt.
							</p>
							{renderCustomModelExplanation()}
							<FormGroup className="col-12 col-md-8">
								<Label
									for="advancedPrompt"
									style={{ marginRight: "0.5rem" }}
								>
									Prompt
								</Label>
								<Button
									className="primary-button"
									size="sm"
									onClick={suggestAdvancedPrompt}
								>
									Suggest one for me{" "}
									<i className={`bi bi-magic`}></i>
								</Button>
								<Input
									type="textarea"
									id="advancedPrompt"
									value={advancedPrompt}
									onChange={(e) =>
										setAdvancedPrompt(e.target.value)
									}
									placeholder="Write a full prompt for what you want the composition to be"
									className="mt-2"
									style={{
										height: `${
											advancedPrompt.split("\n").length *
												24 +
											16
										}px`,
									}}
								/>
							</FormGroup>
							<FormGroup>
								<Button
									type="submit"
									value="Generate Music"
									className="btn btn-primary primary-button"
									disabled={!advancedPrompt || isLoading}
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
							<p>
								OpenRouter Compose allows you to try out
								different models available on OpenRouter AI. You
								can provide a prompt for the composition and the
								model will generate music based on your prompt.
							</p>
							<FormText>
								<strong>OpenRouter Models</strong>
								<p>
									OpenRouter provides access to a variety of
									LLM models. You can select a model to
									generate music with. Your prompt will be
									added to a short preamble. Other than the
									preamble, and your prompt, the models are
									unchanged.
								</p>
							</FormText>

							<FormGroup>
								<Label
									for="openRouterModel"
									style={{ marginRight: "0.5rem" }}
								>
									Model
								</Label>

								<Dropdown
									isOpen={dropdownOpen}
									toggle={toggleDropdown}
								>
									<DropdownToggle
										caret
										className="primary-dropdown"
									>
										{OPEN_ROUTER_MODELS[model]}
									</DropdownToggle>
									<DropdownMenu>
										{Object.keys(OPEN_ROUTER_MODELS).map(
											(modelKey) => (
												<DropdownItem
													key={modelKey}
													onClick={() =>
														setModel(modelKey)
													}
												>
													{
														OPEN_ROUTER_MODELS[
															modelKey
														]
													}
												</DropdownItem>
											)
										)}
									</DropdownMenu>
								</Dropdown>
							</FormGroup>
							<FormGroup>
								<Label
									for="openRouterPrompt"
									style={{ marginRight: "0.5rem" }}
								>
									Prompt
								</Label>
								{/* <Button
									className="primary-button"
									size="sm"
									onClick={suggestOpenRouterPrompt}
								>
									Suggest one for me{" "}
									<i className={`bi bi-magic`}></i>
								</Button> */}
								<Input
									type="textarea"
									id="openRouterPrompt"
									value={openRouterPrompt}
									onChange={(e) =>
										setOpenRouterPrompt(e.target.value)
									}
									placeholder="Write a full prompt for what you want the composition to be"
									className="mt-2"
								/>
							</FormGroup>

							<FormGroup>
								<Button
									type="submit"
									value="Generate Music"
									className="btn btn-primary primary-button"
									disabled={!openRouterPrompt || isLoading}
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
						<Col className="d-flex justify-content-start">
							{runStatus && (
								// div prevents the Badge from stretching to the height of the <p>
								<div>
									<Badge
										color={
											runStatus === "Completed"
												? "success"
												: runStatus === "Failed"
												? "danger"
												: runStatus === "In Progress"
												? "warning"
												: "info"
										}
										// pill
										className="d-none d-md-inline"
										style={{
											marginRight: "10px",
											marginBottom: "10px",
										}}
									>
										{runStatus}
									</Badge>
								</div>
							)}
							<p>Composing music...</p>
						</Col>
						<Progress
							animated
							value={percentComplete}
							className="primary-progress-bar mb-3"
						>
							{percentComplete > 9 && <>{percentComplete}%</>}
						</Progress>
					</div>
				)}
				{!isLoading && saveState === "Complete" && (
					<Alert
						color={saveStatusCode === 200 ? "success" : "danger"}
					>
						{saveStatusCode === 200 ? (
							<>
								"{title}" was saved successfully! You can now
								view and share it from{" "}
								<Link
									to={`/tunes/${tuneId}`}
									target="_blank"
									rel="noopener noreferrer"
									className="primary-link"
								>
									this link{" "}
									<i className={`bi bi-link-45deg`}></i>
								</Link>
								!
							</>
						) : (
							"There was an error saving your tune."
						)}
					</Alert>
				)}

				{/* {saveState === "Loading" && (
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
				)} */}

				<TuneViewerComponent
					tuneId={displayTuneId}
					animate={isLoading}
					setPageTitle={setPageTitle}
				/>

				<Collapse isOpen={isFeedbackOpen}>
					<Card>
						<CardHeader>
							<h4>Feedback on Generated Composition</h4>
						</CardHeader>
						<CardBody>
							<FeedbackForm
								toggleFeedback={toggleFeedback}
								tuneId={displayTuneId}
							/>
						</CardBody>
						<CardFooter>
							<Col className="d-flex justify-content-between">
								<Button onClick={toggleFeedback}>Cancel</Button>
								<Button className="primary-button">
									Download{" "}
									<i className={`bi bi-download`}></i>
								</Button>
							</Col>
						</CardFooter>
					</Card>
				</Collapse>
			</div>
			{/* </ProtectedContent> */}
		</Container>
	);
};

export default ComposeContent;
