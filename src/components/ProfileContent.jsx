// Import dependencies
import React, { useContext, useEffect, useState } from "react";
import Logger from "../services/Logger";

// Import components
import { Link } from "react-router-dom"; // Import Link
import {
	Alert,
	Button,
	Card,
	CardBody,
	CardText,
	CardTitle,
	Col,
	Container,
	Row,
	Spinner,
} from "reactstrap";

// Import contexts
import { AppContext } from "../contexts/AppContext";

import OrcheImage from "../assets/images/Orche.png";

const apiUrl = process.env.REACT_APP_API_URL;

const ProfileContent = () => {
	// App context
	const { appState } = useContext(AppContext);

	// Tune retrieval state
	const [loadingState, setLoadingState] = useState("");
	const [tunes, setTunes] = useState([]);

	// Helper function to truncate text
	const truncateText = (text, maxLength) => {
		if (!text) return "";
		return text.length > maxLength
			? text.substring(0, maxLength) + "..."
			: text;
	};

	useEffect(() => {
		const getTunesByAccountId = async () => {
			Logger.debug("Get tunes by account id useEffect");
			setLoadingState("Loading");
			try {
				Logger.log("Loading tunes for accountId: ", appState.accountId);
				const response = await fetch(`${apiUrl}/getTunesByAccountId`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ accountId: appState.accountId }),
				});

				// Handle the response
				const body = await response.json();
				const statusCode = response.status;

				if (statusCode === 200) {
					Logger.log("Tunes loaded successfully");
					// Body contains a list of up to 10 objects with theses keys:
					// tuneId, title, description, date, prompt, notation
					setTunes(body);
					setLoadingState("Success");
				} else {
					Logger.error("Load error: ", body.error || statusCode);
					setLoadingState("Error");
				}
			} catch (error) {
				Logger.error("Error:", error);
				setLoadingState("Error");
			}
		};
		if (appState.accountId) {
			getTunesByAccountId();
		}
	}, [appState.accountId]);

	return (
		<Container className="mt-5">
			<h1>Profile</h1>
			<p>Here you can find your profile information.</p>
			<p>accountId: {appState.accountId}</p>

			{/* Tune List */}
			<h2>Your Tunes</h2>
			{loadingState === "Loading" && <Spinner />}
			{loadingState === "Error" && (
				<Alert color="danger">Error loading tunes.</Alert>
			)}
			{loadingState === "Success" && (
				<Row>
					{tunes.map((tune) => (
						<Col md={4} key={tune.tuneId}>
							<Card className="mb-2">
								<CardBody>
									<CardTitle tag="h5">
										{truncateText(tune.title, 30)}
									</CardTitle>
									<CardText>
										{truncateText(tune.description, 100)}
									</CardText>
									{/* Link to tune */}
									<Link to={`/tunes/${tune.tuneId}`}>
										<Button className="primary-button">
											View Tune
										</Button>
									</Link>
								</CardBody>
							</Card>
						</Col>
					))}
					{tunes.length === 0 && (
						<Col>
							<Alert color="info">
								<div
									style={{
										display: "flex",
										alignItems: "center",
										// justifyContent: "center",
									}}
								>
									<img
										src={OrcheImage}
										width="30"
										height="30"
										alt="Orche"
									/>{" "}
									You haven't created any tunes yet.
								</div>
							</Alert>
						</Col>
					)}
				</Row>
			)}
		</Container>
	);
};

export default ProfileContent;
