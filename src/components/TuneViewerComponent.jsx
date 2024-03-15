import React, { useEffect, useState } from "react";
import {
	Alert,
	Button,
	Card,
	CardBody,
	CardText,
	CardTitle,
	Col,
	Container,
	Modal,
	ModalBody,
	ModalHeader,
	Nav,
	NavItem,
	NavLink,
	Row,
	Spinner,
	TabContent,
	TabPane,
} from "reactstrap";
import Logger from "../services/Logger";
import Synthesizer from "./Synthesizer";

import ABCInput from "./ABCInput";
import FeedbackForm from "./FeedbackForm";

const apiUrl = process.env.REACT_APP_API_URL;

const TuneViewerComponent = ({ tuneId, setPageTitle }) => {
	const [abcNotation, setAbcNotation] = useState("");
	const [description, setDescription] = useState("");
	const [title, setTitle] = useState("");
	const [creationDate, setCreationDate] = useState("");
	const [prompt, setPrompt] = useState("");
	const [fixes, setFixes] = useState(null);
	const [warnings, setWarnings] = useState([]);
	const [creatorAccountId, setCreatorAccountId] = useState("");
	const [creatorDisplayName, setCreatorDisplayName] = useState("");

	// Tune retrieval state
	const [retrievalState, setRetrievalState] = useState("");

	const [activeTab, setActiveTab] = useState("1");

	const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

	useEffect(() => {
		Logger.debug("Tune retrieval useEffect");
		const getTune = async () => {
			setRetrievalState("Loading");
			try {
				Logger.log("Retrieving tune...");
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
					Logger.log("Tune retrieved successfully");
					setAbcNotation(body.notation);
					setDescription(body.description);
					setTitle(body.title);
					if (body.title) setPageTitle(body.title);
					setCreationDate(body.date);
					setPrompt(body.prompt);
					setFixes(body.fixes);
					setWarnings(body.warnings);
					setCreatorAccountId(body.accountId);
					setCreatorDisplayName(body.displayName);


					setRetrievalState("Success");
				} else {
					Logger.error("Retrieval error: ", body.error || statusCode);
					setRetrievalState("Error");
				}
			} catch (error) {
				Logger.error("Error:", error);
				setRetrievalState("Error");
			}
		};
		if (tuneId) {
			getTune();
		}
	}, [tuneId]);

	const toggleTab = (tab) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	const toggleFeedback = () => {
		setIsFeedbackOpen(!isFeedbackOpen);
	};

	Logger.debug("Tune ID: ", tuneId);

	return (
		<div className="container px-4">
			<Container>
				{!title ? (
					<h1 className="border-bottom">Tune Viewer</h1>
				) : (
					<h1 className="border-bottom">{title}</h1>
				)}
				{retrievalState === "Loading" && (
					<Alert color="primary">
						<Spinner
							as="span"
							animation="border"
							size="sm"
							role="status"
							aria-hidden="true"
						/>{" "}
						Loading tune...
					</Alert>
				)}
				<Row className="mt-2">
					<Col>
						{/* <h2>Rendered Sheet Music</h2> */}
						<Synthesizer abcNotation={abcNotation} index={0} />
					</Col>
				</Row>

				{abcNotation ? (
					<Row className="mt-2">
						<Col>
							<Nav tabs>
								{/* Info */}
								<NavItem>
									<NavLink
										className={
											activeTab === "1" ? "active" : ""
										}
										onClick={() => {
											toggleTab("1");
										}}
									>
										Info{" "}
										<span className="icon-square flex-shrink-0">
											<i
												className={`bi bi-info-circle`}
											/>
										</span>
									</NavLink>
								</NavItem>
								{/* Description */}
								<NavItem>
									<NavLink
										className={
											activeTab === "2" ? "active" : ""
										}
										onClick={() => {
											toggleTab("2");
										}}
									>
										Description{" "}
										<span className="icon-square flex-shrink-0">
											<i
												className={`bi bi-pencil-square`}
											/>
										</span>
									</NavLink>
								</NavItem>
								{/* ABC Notation */}
								<NavItem>
									<NavLink
										className={
											activeTab === "3" ? "active" : ""
										}
										onClick={() => {
											toggleTab("3");
										}}
									>
										ABC Notation{" "}
										<span className="icon-square flex-shrink-0">
											<i className={`bi bi-music-note`} />
										</span>
									</NavLink>
								</NavItem>
								{/* Technical */}
								<NavItem>
									<NavLink
										className={
											activeTab === "4" ? "active" : ""
										}
										onClick={() => {
											toggleTab("4");
										}}
									>
										Technical{" "}
										<span className="icon-square flex-shrink-0">
											<i className={`bi bi-gear`} />
										</span>
									</NavLink>
								</NavItem>
							</Nav>
							<TabContent activeTab={activeTab}>
								<TabPane
									tabId="1"
									className="bordered-tab-pane"
								>
									<Row>
										<Col>
											<Row>
												<Col>
													<h3>Title</h3>
													{title ? (
														<p>{title}</p>
													) : (
														<p>No title provided</p>
													)}
												</Col>
												<Col>
													<h3>Date</h3>
													{creationDate ? (
														<p>{creationDate}</p>
													) : (
														<p>No date provided</p>
													)}
												</Col>
												<Col>
													<h3>Prompt</h3>
													{prompt ? (
														<p>{prompt}</p>
													) : (
														<p>
															No prompt provided
														</p>
													)}
												</Col>
												<Col>
													<h3>Creator</h3>
													{creatorDisplayName ? (
														<p>
															{creatorDisplayName}
														</p>
														// TODO Add link to creator's profile using creatorAccountId
													) : (
														<p>
															No creator provided
														</p>
													)}
												</Col>
											</Row>
										</Col>
									</Row>
								</TabPane>
								<TabPane
									tabId="2"
									className="bordered-tab-pane"
								>
									<Row>
										<Col>
											<h3>Description</h3>
											{description ? (
												<p>{description}</p>
											) : (
												<p>No description provided</p>
											)}
										</Col>
									</Row>
								</TabPane>
								<TabPane
									tabId="3"
									className="bordered-tab-pane"
								>
									<Row>
										<Col>
											<h3>ABC Notation</h3>
											<ABCInput
												parentText={abcNotation}
												placeholderText="Enter ABC notation here"
												onChange={setAbcNotation}
											/>
										</Col>
									</Row>
								</TabPane>
								<TabPane
									tabId="4"
									className="bordered-tab-pane"
								>
									<Row>
										<Col>
											<h3>Number of Fixes Made</h3>
											{fixes ? (
												<p>{fixes}</p>
											) : (
												<p>No fixes made</p>
											)}
										</Col>
										<Col>
											<h3>Warnings</h3>
											{warnings &&
												(warnings.length > 0 ? (
													<ul>
														{warnings.map(
															(warning) => (
																<li>
																	{warning}
																</li>
															)
														)}
													</ul>
												) : (
													<p>No warnings</p>
												))}
										</Col>
									</Row>
								</TabPane>
							</TabContent>
						</Col>
					</Row>
				) : (
					<Card>
						<CardBody>
							<CardTitle className="placeholder-glow">
								<span class="placeholder col-2" />
								<span class="placeholder col-2 offset-1" />
								<span class="placeholder col-2 offset-1" />
								<span class="placeholder col-2 offset-1" />
							</CardTitle>
							<CardText className="placeholder-glow">
								<span class="placeholder col-12" />
							</CardText>
						</CardBody>
					</Card>
				)}

				{tuneId && (
					<Button
						onClick={toggleFeedback}
						className="primary-button mt-3"
					>
						Submit Feedback{" "}
						<i className={`bi bi-chat-right-text`}></i>
					</Button>
				)}

				<Modal isOpen={isFeedbackOpen} toggle={toggleFeedback}>
					<ModalHeader toggle={toggleFeedback}>
						Composition Feedback
					</ModalHeader>
					<ModalBody style={{ paddingBottom: "0px" }}>
						<FeedbackForm
							tuneId={tuneId}
							toggleFeedback={toggleFeedback}
						/>
					</ModalBody>
				</Modal>
			</Container>
		</div>
	);
};

export default TuneViewerComponent;
