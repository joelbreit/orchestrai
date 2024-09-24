// import React, { useContext, useState } from "react";
// import {
// 	Alert,
// 	Button,
// 	Col,
// 	Container,
// 	Dropdown,
// 	DropdownItem,
// 	DropdownMenu,
// 	DropdownToggle,
// 	Form,
// 	FormGroup,
// 	Input,
// 	Label,
// 	Row,
// 	Spinner,
// } from "reactstrap";
// import { GetCompareTunes } from "../services/APICalls";
// import Logger from "../services/Logger";
// import ProtectedContent from "./ProtectedContent";
// import TuneViewerComponent from "./TuneViewerComponent";
// // Import contexts
// import { AppContext } from "../contexts/AppContext";
// import { OPEN_ROUTER_MODELS } from "../assets/Constants";

// const apiUrl = process.env.REACT_APP_API_URL;

// const ModalComparisonComponent = () => {
// 	// Composition State
// 	const { appState } = useContext(AppContext);
// 	const [prompt, setPrompt] = useState("");

// 	const [dropdownOpen, setDropdownOpen] = useState([false, false]);
// 	const [model, setModel] = useState(["openai/gpt-4o", "openai/gpt-4o"]);
// 	const [tuneInfo, setTuneInfo] = useState([
// 		{

// 			tuneId: null,
// 			date: null,
// 			thread: null,
// 			run: null,
// 			title: null,
// 			prompt: null,
// 			description: null,
// 			notation: null,
// 			warnings: null,
// 			fixes: null,
// 			fixesList: null,
// 			generationDuration: null,
// 			uncleanedNotation: null,
// 		},

// 		{

// 			tuneId: null,
// 			date: null,
// 			thread: null,
// 			run: null,
// 			title: null,
// 			prompt: null,
// 			description: null,
// 			notation: null,
// 			warnings: null,
// 			fixes: null,
// 			fixesList: null,
// 			generationDuration: null,
// 			uncleanedNotation: null,
// 		},
// 	]
// 	);

// 	const toggleDropdown = (index) => setDropdownOpen(!dropdownOpen[index]);

// 	// Comparison State
// 	const [tuneId1, setTuneId1] = useState("");
// 	const [tuneId2, setTuneId2] = useState("");
// 	const [message, setMessage] = useState({
// 		text: "",
// 		color: "primary",
// 	});

// 	// States: welcome, loading, loaded, error, submitting, submitted
// 	const [pageState, setPageState] = useState("welcome");

// 	const handleLoadTunes = async () => {
// 		Logger.log("Loading tunes...");
// 		setPageState("loading");
// 		setMessage({ text: "Loading tunes...", color: "info" });
// 		const response = await GetCompareTunes();
// 		Logger.log("Response: ", response);
// 		if (response.statusCode === 200) {
// 			setTuneId1(response.tune1.tuneId);
// 			setTuneId2(response.tune2.tuneId);
// 			setPageState("loaded");
// 			setMessage({ text: "Tunes loaded", color: "success" });
// 		} else {
// 			setPageState("error");
// 			setMessage({
// 				text: `Error loading tunes: ${response.message}`,
// 				color: "danger",
// 			});
// 		}
// 	};

// 	const handleSelectTune = async (winnerId, loserId) => {
// 		setPageState("submitting");
// 		setMessage({ text: "Submitting comparison...", color: "info" });

// 		try {
// 			const response = await fetch(`${apiUrl}/submitTuneComparison`, {
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				body: JSON.stringify({
// 					winnerId,
// 					loserId,
// 				}),
// 			});

// 			setPageState("submitted");
// 			setMessage({
// 				text: "Comparison submitted! Feel free to compare more tunes.",
// 				color: "success",
// 			});
// 		} catch (error) {
// 			Logger.error("Error submitting tune comparison: ", error);
// 			setPageState("error");
// 			setMessage({
// 				text: `Error submitting tune comparison: ${error}`,
// 				color: "danger",
// 			});
// 		}
// 	};

// 	return (
// 		<Container>
// 			<ProtectedContent>
// 				<p>
// 					Pick two large language models, compose a tune with both of
// 					them, and pick your favorite.
// 				</p>

// 				<Form onSubmit={handleSubmit} className="mt-3">
// 					<p>
// 						OpenRouter Compose allows you to try out different
// 						models available on OpenRouter AI. You can provide a
// 						prompt for the composition and the model will generate
// 						music based on your prompt.
// 					</p>
// 					<FormText>
// 						<strong>OpenRouter Models</strong>
// 						<p>
// 							OpenRouter provides access to a variety of LLM
// 							models. You can select a model to generate music
// 							with. Your prompt will be added to a short preamble.
// 							Other than the preamble, and your prompt, the models
// 							are unchanged.
// 						</p>
// 					</FormText>

// 					<FormGroup>
// 						<Label
// 							for="openRouterModel"
// 							style={{ marginRight: "0.5rem" }}
// 						>
// 							Model
// 						</Label>

// 						<Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
// 							<DropdownToggle caret className="primary-dropdown">
// 								{OPEN_ROUTER_MODELS[model]}
// 							</DropdownToggle>
// 							<DropdownMenu>
// 								{Object.keys(OPEN_ROUTER_MODELS).map(
// 									(modelKey) => (
// 										<DropdownItem
// 											key={modelKey}
// 											onClick={() => setModel(modelKey)}
// 										>
// 											{OPEN_ROUTER_MODELS[modelKey]}
// 										</DropdownItem>
// 									)
// 								)}
// 							</DropdownMenu>
// 						</Dropdown>
// 					</FormGroup>
// 					<FormGroup>
// 						<Label for="prompt" style={{ marginRight: "0.5rem" }}>
// 							Prompt
// 						</Label>
// 						{/* <Button
// 									className="primary-button"
// 									size="sm"
// 									onClick={suggestOpenRouterPrompt}
// 								>
// 									Suggest one for me{" "}
// 									<i className={`bi bi-magic`}></i>
// 								</Button> */}
// 						<Input
// 							type="textarea"
// 							id="prompt"
// 							value={prompt}
// 							onChange={(e) => setPrompt(e.target.value)}
// 							placeholder="Write a full prompt for what you want the composition to be"
// 							className="mt-2"
// 						/>
// 					</FormGroup>

// 					<FormGroup>
// 						<Button
// 							type="submit"
// 							value="Generate Music"
// 							className="btn btn-primary primary-button"
// 							disabled={!prompt || isLoading}
// 						>
// 							{isLoading && (
// 								<>
// 									<Spinner
// 										as="span"
// 										animation="border"
// 										size="sm"
// 										role="status"
// 										aria-hidden="true"
// 									/>{" "}
// 								</>
// 							)}
// 							Generate Music{" "}
// 							<i className={`bi bi-music-note-beamed`}></i>
// 						</Button>
// 					</FormGroup>
// 				</Form>

// 				<Row>
// 					<Col className="align-self-center d-flex justify-content-center col-6 gap-2">
// 						<h3>Model 1:</h3>
// 						<Dropdown
// 							isOpen={dropdownOpen}
// 							toggle={toggleDropdown1}
// 						>
// 							<DropdownToggle caret className="primary-dropdown">
// 								{OPEN_ROUTER_MODELS[model1]}
// 							</DropdownToggle>
// 							<DropdownMenu>
// 								{Object.keys(OPEN_ROUTER_MODELS).map(
// 									(modelKey) => (
// 										<DropdownItem
// 											key={modelKey}
// 											onClick={() => setModel1(modelKey)}
// 										>
// 											{OPEN_ROUTER_MODELS[modelKey]}
// 										</DropdownItem>
// 									)
// 								)}
// 							</DropdownMenu>
// 						</Dropdown>
// 					</Col>
// 					<Col className="align-self-center d-flex justify-content-center col-6 gap-2">
// 						<h3>Model 2:</h3>
// 						<Dropdown
// 							isOpen={dropdown2Open}
// 							toggle={toggleDropdown2}
// 						>
// 							<DropdownToggle caret className="primary-dropdown">
// 								{OPEN_ROUTER_MODELS[model2]}
// 							</DropdownToggle>
// 							<DropdownMenu>
// 								{Object.keys(OPEN_ROUTER_MODELS).map(
// 									(modelKey) => (
// 										<DropdownItem
// 											key={modelKey}
// 											onClick={() => setModel2(modelKey)}
// 										>
// 											{OPEN_ROUTER_MODELS[modelKey]}
// 										</DropdownItem>
// 									)
// 								)}
// 							</DropdownMenu>
// 						</Dropdown>
// 					</Col>
// 				</Row>

// 				<Row className="justify-content-center">
// 					<Col
// 						sm="12"
// 						md="6"
// 						className="d-flex justify-content-center"
// 					>
// 						<Button
// 							onClick={handleLoadTunes}
// 							className="primary-button"
// 						>
// 							{pageState === "loading" && (
// 								<>
// 									<Spinner
// 										as="span"
// 										animation="border"
// 										size="sm"
// 										role="status"
// 										aria-hidden="true"
// 										className="mr-2"
// 									/>{" "}
// 								</>
// 							)}
// 							Get Compositions to Compare{" "}
// 							<span className="icon-square flex-shrink-0">
// 								<i className={`bi bi-arrow-repeat`} />
// 							</span>
// 						</Button>
// 					</Col>
// 				</Row>

// 				<hr />
// 				{message.text && (
// 					<Alert color={message.color}>
// 						<div
// 							style={{
// 								display: "flex",
// 								alignItems: "center",
// 							}}
// 						>
// 							{/* <img
// 								src={OrcheImage}
// 								width="30"
// 								height="30"
// 								alt="Orche"
// 							/>{" "} */}
// 							<span>{message.text}</span>
// 						</div>
// 					</Alert>
// 				)}

// 				<Row className="mt-2">
// 					<Col sm="12" md="6">
// 						<Button
// 							color="success"
// 							className="w-100 mb-2"
// 							disabled={pageState !== "loaded"}
// 							onClick={() => handleSelectTune(tuneId1, tuneId2)}
// 						>
// 							Choose this tune{" "}
// 							<span className="icon-square flex-shrink-0">
// 								<i className={`bi bi-check-circle`} />
// 							</span>
// 						</Button>
// 						<TuneViewerComponent
// 							tuneId={tuneId1}
// 							animate={pageState === "loading"}
// 							setPageTitle={() => {}}
// 						/>
// 					</Col>
// 					<Col sm="12" md="6">
// 						<Button
// 							color="success"
// 							className="w-100 mb-2"
// 							disabled={pageState !== "loaded"}
// 							onClick={() => handleSelectTune(tuneId2, tuneId1)}
// 						>
// 							Choose this tune{" "}
// 							<span className="icon-square flex-shrink-0">
// 								<i className={`bi bi-check-circle`} />
// 							</span>
// 						</Button>

// 						<TuneViewerComponent
// 							tuneId={tuneId2}
// 							animate={pageState === "loading"}
// 							setPageTitle={() => {}}
// 						/>
// 					</Col>
// 				</Row>
// 			</ProtectedContent>
// 		</Container>
// 	);
// };

// export default ModalComparisonComponent;
