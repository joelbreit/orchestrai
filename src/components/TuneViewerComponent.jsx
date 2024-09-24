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
	Toast,
	ToastBody,
	ToastHeader,
} from "reactstrap";
import Logger from "../services/Logger";
import Synthesizer from "./Synthesizer";

import ABCNotationComponent from "./ABCNotationComponent";
import FeedbackForm from "./FeedbackForm";

const apiUrl = process.env.REACT_APP_API_URL;

const TuneViewerComponent = ({ tuneId, setPageTitle, animate }) => {
	const [abcNotation, setAbcNotation] = useState("");
	const [description, setDescription] = useState("");
	const [title, setTitle] = useState("");
	const [creationDate, setCreationDate] = useState("");
	const [prompt, setPrompt] = useState("");
	const [fixes, setFixes] = useState(null);
	const [warnings, setWarnings] = useState([]);
	const [fixesList, setFixesList] = useState([]);
	const [showToast, setShowToast] = useState(false);
	const [link, setLink] = useState("");
	const [creatorAccountId, setCreatorAccountId] = useState("");
	const [creatorDisplayName, setCreatorDisplayName] = useState("");
	const [score, setScore] = useState(0);
	const [numScores, setNumScores] = useState(0);

	// Tune retrieval state
	const [retrievalState, setRetrievalState] = useState("");

	const [activeTab, setActiveTab] = useState("1");

	const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

	useEffect(() => {
		const getTune = async () => {
			setRetrievalState("Loading");
			try {
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
					setAbcNotation(body.notation);
					setDescription(body.description);
					setTitle(body.title);
					if (body.title) setPageTitle(body.title);
					setCreationDate(body.date);
					setPrompt(body.prompt);
					setFixes(body.fixes);
					setWarnings(body.warnings);
					setFixesList(body.fixesList);
					setCreatorAccountId(body.accountId);
					setCreatorDisplayName(body.displayName);
					setScore(body.score);
					setNumScores(body.numScores);

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

	return (
		<Container>
			{/* <div className="mb-4">
				{!title ? (
					<h1 className="border-bottom">Tune Viewer</h1>
				) : (
					<h1 className="border-bottom">{title}</h1>
				)}
			</div> */}
			<Row className="d-flex justify-content-between">
				<Col className="col-auto">
					<h1>
						<span className="icon-square flex-shrink-0 d-none d-md-inline">
							<i className={`bi bi-music-note`} />
						</span>{" "}
						{/* {title || "Tune Viewer"} */}
						{title ? (
							<a
								href={`/tunes/${tuneId}`}
								target="_blank"
								rel="noreferrer"
								style={{ color: "inherit" }}
							>
								{title}
							</a>
						) : (
							"Tune Viewer"
						)}
					</h1>
				</Col>
				{/* <Col className="d-flex justify-content-end align-items-center">
					<Button
						className="primary-button-outline"
						onClick={() => {
							// Copy the URL to the clipboard
							// const url = window.location.href;
							// navigator.clipboard.writeText(url);
							const url = `https://www.OrchestrAI.site/tunes/${tuneId}`;
							// alert(`Link copied to clipboard!\n${url}`);
							setShowToast(true);
							setLink(url);
						}}
					>
						Share{" "}
						<span className="icon-square flex-shrink-0">
							<i className={`bi bi-share`} />
						</span>
					</Button>
				</Col> */}
			</Row>
			<hr />

			<Toast
				isOpen={showToast}
				toggle={() => setShowToast(false)}
				style={{
					position: "fixed",
					bottom: "10px",
					right: "10px",
					zIndex: "1000",
				}}
			>
				<ToastHeader toggle={() => setShowToast(false)} icon="success">
					Link Copied
				</ToastHeader>
				<ToastBody>
					<p>Link copied to clipboard! {link}</p>
				</ToastBody>
			</Toast>

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
					<Synthesizer
						abcNotation={abcNotation}
						index={0}
						animate={animate}
					/>
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
										activeTab === "1"
											? "active  active-tab"
											: "inactive-tab"
									}
									onClick={() => {
										toggleTab("1");
									}}
								>
									ABC Notation{" "}
									<span className="icon-square flex-shrink-0">
										<i className={`bi bi-info-circle`} />
									</span>
								</NavLink>
							</NavItem>
							{/* Description */}
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
								>
									Description{" "}
									<span className="icon-square flex-shrink-0">
										<i className={`bi bi-pencil-square`} />
									</span>
								</NavLink>
							</NavItem>
							{/* ABC Notation */}
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
								>
									Info{" "}
									<span className="icon-square flex-shrink-0">
										<i className={`bi bi-music-note`} />
									</span>
								</NavLink>
							</NavItem>
							{/* Technical */}
							<NavItem>
								<NavLink
									className={
										activeTab === "4"
											? "active active-tab"
											: "inactive-tab"
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
							<TabPane tabId="3" className="bordered-tab-pane">
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
													<p>No prompt provided</p>
												)}
											</Col>
											<Col>
												<h3>Creator</h3>
												{creatorDisplayName ? (
													<p>{creatorDisplayName}</p>
												) : (
													// TODO Add link to creator's profile using creatorAccountId
													<p>No creator provided</p>
												)}
											</Col>
											<Col>
												<h3>Score</h3>
												{score ? (
													<p>
														{score.toFixed(2)} /
														5.00
														{" ("}
														{numScores}{" "}
														{numScores === 1
															? "rating"
															: "ratings"}
														{")"}
													</p>
												) : (
													<p>No score provided</p>
												)}
											</Col>
										</Row>
									</Col>
								</Row>
							</TabPane>
							<TabPane tabId="2" className="bordered-tab-pane">
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
							<TabPane tabId="1" className="bordered-tab-pane">
								<Row>
									<Col>
										<h3>ABC Notation</h3>
										<ABCNotationComponent
											parentText={abcNotation}
											placeholderText="Enter ABC notation here"
											onChange={setAbcNotation}
										/>
									</Col>
								</Row>
							</TabPane>
							<TabPane tabId="4" className="bordered-tab-pane">
								<Row>
									{/* <Col>
										<h3>Number of Fixes Made</h3>
										{fixes ? (
											<p>{fixes}</p>
										) : (
											<p>No fixes made</p>
										)}
									</Col> */}
									<Col>
										<h3>Fixes</h3>
										{fixesList && fixesList.length > 0 ? (
											<ul>
												{fixesList.map((fix) => (
													<li>{fix}</li>
												))}
											</ul>
										) : (
											<p>No fixes made</p>
										)}
									</Col>
									<Col>
										<h3>Warnings</h3>
										{warnings && warnings.length > 0 ? (
											<ul>
												{warnings.map((warning) => (
													<li>{warning}</li>
												))}
											</ul>
										) : (
											<p>No warnings</p>
										)}
									</Col>
								</Row>
							</TabPane>
						</TabContent>
					</Col>
				</Row>
			) : (
				<Card>
					<CardBody>
						<CardTitle
							className={
								animate
									? "placeholder-glow"
									: "placeholder-block"
							}
						>
							<span className="placeholder col-2" />
							<span className="placeholder col-2 offset-1" />
							<span className="placeholder col-2 offset-1" />
							<span className="placeholder col-2 offset-1" />
						</CardTitle>
						<CardText
							className={
								animate
									? "placeholder-glow"
									: "placeholder-block"
							}
						>
							<span className="placeholder col-12" />
						</CardText>
					</CardBody>
				</Card>
			)}
			{tuneId && (
				<Button
					onClick={toggleFeedback}
					className="primary-button mt-3"
				>
					Submit Feedback <i className={`bi bi-chat-right-text`}></i>
				</Button>
			)}
			<Modal isOpen={isFeedbackOpen} toggle={toggleFeedback}>
				<ModalHeader toggle={toggleFeedback}>
					Feedback for "{title}"
				</ModalHeader>
				<ModalBody style={{ paddingBottom: "0px" }}>
					<FeedbackForm
						tuneId={tuneId}
						toggleFeedback={toggleFeedback}
					/>
				</ModalBody>
			</Modal>
		</Container>
	);
};

export default TuneViewerComponent;
