// Import dependencies
import React, { useContext, useEffect, useState } from "react";

// Import components
import {
	Container,
	Card,
	CardBody,
	CardTitle,
	CardText,
	Row,
	Col,
	Spinner,
	Alert,
Button,
} from "reactstrap";
import { Link } from "react-router-dom"; // Import Link

// Import contexts
import { AppContext } from "../contexts/AppContext";

const apiUrl = process.env.REACT_APP_API_URL;

const ProfileContent = () => {
	// App context
	const { appState } = useContext(AppContext);

	// Tune retrieval state
	const [loadingState, setLoadingState] = useState("");
	const [tunes, setTunes] = useState([]);

	// Helper function to truncate text
	const truncateText = (text, maxLength) => {
		return text.length > maxLength
			? text.substring(0, maxLength) + "..."
			: text;
	};

	useEffect(() => {
		const getTunesByAccountId = async () => {
			setLoadingState("Loading");
			try {
				console.log(
					"Loading tunes for accountId: ",
					appState.accountId
				);
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
					console.log("Tunes loaded successfully");
					// Body contains a list of up to 10 objects with theses keys:
					// tuneId, title, description, date, prompt, notation
					setTunes(body);
					setLoadingState("Success");
				} else {
					console.error("Load error: ", body.error || statusCode);
					setLoadingState("Error");
				}
			} catch (error) {
				console.error("Error:", error);
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
							<Card className="m-2">
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
								You haven't created any tunes yet.
							</Alert>
						</Col>
					)}
				</Row>
			)}
		</Container>
	);
};

export default ProfileContent;
