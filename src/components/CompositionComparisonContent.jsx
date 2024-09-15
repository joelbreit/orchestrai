import React, { useState } from "react";
import { Alert, Button, Col, Container, Row, Spinner } from "reactstrap";
import OrcheImage from "../assets/images/Orche.png";
import { GetCompareTunes } from "../services/APICalls";
import Logger from "../services/Logger";
import ProtectedContent from "./ProtectedContent";
import TuneViewerComponent from "./TuneViewerComponent";

const apiUrl = process.env.REACT_APP_API_URL;

const CompositionComparisonContent = () => {
	const [tuneId1, setTuneId1] = useState("");
	const [tuneId2, setTuneId2] = useState("");
	const [message, setMessage] = useState({
		text: "",
		color: "primary",
	});

	// States: welcome, loading, loaded, error, submitting, submitted
	const [pageState, setPageState] = useState("welcome");

	Logger.debug("pageState: ", pageState);

	const handleLoadTunes = async () => {
		Logger.log("Loading tunes...");
		setPageState("loading");
		setMessage({ text: "Loading tunes...", color: "info" });
		const response = await GetCompareTunes();
		Logger.log("Response: ", response);
		if (response.statusCode === 200) {
			setTuneId1(response.tune1.tuneId);
			setTuneId2(response.tune2.tuneId);
			Logger.debug(`Tune 1: ${response.tune1.title}, <${tuneId1}>`);
			Logger.debug(`Tune 2: ${response.tune2.title}, <${tuneId2}>`);
			setPageState("loaded");
			setMessage({ text: "Tunes loaded", color: "success" });
		} else {
			setPageState("error");
			setMessage({
				text: `Error loading tunes: ${response.message}`,
				color: "danger",
			});
		}
	};

	const handleSelectTune = async (winnerId, loserId) => {
		Logger.debug("Tune selected: ", winnerId);
		setPageState("submitting");
		setMessage({ text: "Submitting comparison...", color: "info" });

		try {
			const response = await fetch(`${apiUrl}/submitTuneComparison`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					winnerId,
					loserId,
				}),
			});

			Logger.debug("Response: ", response);

			setPageState("submitted");
			setMessage({
				text: "Comparison submitted! Feel free to compare more tunes.",
				color: "success",
			});
		} catch (error) {
			Logger.error("Error submitting tune comparison: ", error);
			setPageState("error");
			setMessage({
				text: `Error submitting tune comparison: ${error}`,
				color: "danger",
			});
		}
	};

	return (
		<Container>
			<ProtectedContent>
				<p>Pick your favorite tune and compare the compositions.</p>
				<Row className="justify-content-center">
					<Col
						sm="12"
						md="6"
						className="d-flex justify-content-center"
					>
						<Button
							onClick={handleLoadTunes}
							className="primary-button"
						>
							{pageState === "loading" && (
								<>
									<Spinner
										as="span"
										animation="border"
										size="sm"
										role="status"
										aria-hidden="true"
										className="mr-2"
									/>{" "}
								</>
							)}
							Get Compositions to Compare{" "}
							<span className="icon-square flex-shrink-0">
								<i className={`bi bi-arrow-repeat`} />
							</span>
						</Button>
					</Col>
				</Row>

				<hr />
				{message.text && (
					<Alert color={message.color}>
						<div
							style={{
								display: "flex",
								alignItems: "center",
							}}
						>
							<img
								src={OrcheImage}
								width="30"
								height="30"
								alt="Orche"
							/>{" "}
							<span>{message.text}</span>
						</div>
					</Alert>
				)}

				<Row className="mt-2">
					<Col sm="12" md="6">
						<Button
							color="success"
							className="w-100 mb-2"
							disabled={pageState !== "loaded"}
							onClick={() => handleSelectTune(tuneId1, tuneId2)}
						>
							Choose this tune{" "}
							<span className="icon-square flex-shrink-0">
								<i className={`bi bi-check-circle`} />
							</span>
						</Button>
						<TuneViewerComponent
							tuneId={tuneId1}
							animate={pageState === "loading"}
							setPageTitle={() => {}}
						/>
					</Col>
					<Col sm="12" md="6">
						<Button
							color="success"
							className="w-100 mb-2"
							disabled={pageState !== "loaded"}
							onClick={() => handleSelectTune(tuneId2, tuneId1)}
						>
							Choose this tune{" "}
							<span className="icon-square flex-shrink-0">
								<i className={`bi bi-check-circle`} />
							</span>
						</Button>

						<TuneViewerComponent
							tuneId={tuneId2}
							animate={pageState === "loading"}
							setPageTitle={() => {}}
						/>
					</Col>
				</Row>
			</ProtectedContent>
		</Container>
	);
};

export default CompositionComparisonContent;
