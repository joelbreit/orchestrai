// Import dependencies
import React, { useContext, useEffect, useState } from "react";
import Logger from "../services/Logger";

// Import components
import {
	Alert,
	Button,
	Col,
	Container,
	ListGroup,
	ListGroupItem,
	Row,
	Spinner,
} from "reactstrap";

// Import contexts
import { AppContext } from "../contexts/AppContext";

import OrcheImage from "../assets/images/Orche.png";
import { formatDate } from "../services/FormatDate";

const apiUrl = process.env.REACT_APP_API_URL;

const ProfileContent = () => {
	// App context
	const { appState } = useContext(AppContext);

	// Tune retrieval state
	const [loadingState, setLoadingState] = useState("");
	const [tunes, setTunes] = useState([]);

	const groupByDay = (tunes) => {
		const groupedTunes = {};
		tunes.forEach((tune) => {
			const date = new Date(tune.date).toLocaleDateString();
			if (!groupedTunes[date]) {
				groupedTunes[date] = [];
			}
			groupedTunes[date].push(tune);
		});
		return groupedTunes;
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
					// Body contains a list of up to 25 objects with theses keys:
					// tuneId, title, description, date, prompt, notation,...
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
			<Row className="d-flex justify-content-between">
				<Col>
					<h1>
						<span className="icon-square flex-shrink-0 d-none d-md-inline">
							<i className={`bi bi-person-circle`} />
						</span>{" "}
						{appState.username || "Profile"}
					</h1>
				</Col>
				<Col className="d-flex justify-content-end align-items-center">
					<Button
						color="primary"
						className="primary-button-outline"
						onClick={() => {
							Logger.debug("Edit profile clicked");
						}}
						disabled
					>
						Edit Profile{" "}
						<span className="icon-square flex-shrink-0">
							<i className={`bi bi-pencil-square`} />
						</span>
					</Button>
				</Col>
			</Row>
			<hr />
			<p>Username: {appState.username}</p>
			<p>Display Name: {appState.displayName}</p>

			{/* Tune List */}
			<h2>Your Tunes</h2>
			{loadingState === "Loading" && <Spinner />}
			{loadingState === "Error" && (
				<Alert color="danger">Error loading tunes.</Alert>
			)}
			{loadingState === "Success" && (
				<>
					{tunes.length > 0 ? (
						<>
							{Object.entries(groupByDay(tunes)).map(
								([date, tunes]) => (
									<Col key={date}>
										<h3 className="mt-4 mb-2">
											{formatDate(date)}
										</h3>
										<ListGroup>
											{tunes.map((tune) => (
												<ListGroupItem
													key={tune.tuneId}
													action
													onClick={() => {
														window.location.href = `/tunes/${tune.tuneId}`;
													}}
													className="d-flex justify-content-between align-items-center"
												>
													<span
														className="text-truncate"
														style={{
															maxWidth: "80%",
															fontStyle: "bold",
														}}
													>
														{tune.title}
													</span>
													<small className="text-muted">
														{new Date(
															tune.date
														).toLocaleTimeString(
															"en-US",
															{
																hour: "numeric",
																minute: "numeric",
																hour12: true,
															}
														)}
													</small>
												</ListGroupItem>
											))}
										</ListGroup>
									</Col>
								)
							)}
						</>
					) : (
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
					)}
				</>
			)}
		</Container>
	);
};

export default ProfileContent;
