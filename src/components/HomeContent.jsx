import React from "react";
import {
	Container,
	Row,
	Col,
	Button,
	Card,
	CardImg,
	CardBody,
	CardText,
	CardTitle,
} from "reactstrap";

import OrcasOpusImage from "../assets/images/OrcasOpusImage.png";
import OrcheImage from "../assets/images/Orche.png";

const HomeContent = () => {
	return (
		<Container className="mt-5">
			{/* Hero Section */}
			<Row className="justify-content-center">
				<Col md={6}>
					<div style={{ display: "flex", alignItems: "center" }}>
						<img
							src={OrcheImage}
							width="70"
							height="70"
							alt="Orche"
						/>{" "}
						<h1>OrchestrAI</h1>
					</div>
					<p className="lead">
						Music is meant to be shared. At OrchestrAI, we want to
						bring the power of generative language models to anyone
						interested in writing music.
					</p>
					<Button
						color="primary"
						href="/compose"
						className="primary-button mr-2"
					>
						Compose Now{" "}
						<span role="img" aria-label="music note emoji">
							🎵
						</span>
					</Button>
				</Col>
				<Col md={6}>
					<Card>
						<CardImg
							top
							width="100%"
							src={OrcasOpusImage}
							alt="OrchestrAI Image"
						/>
						<CardBody>
							<CardTitle tag="h5">
								Discover the Power of AI in Music
							</CardTitle>
							<CardText>
								Here you can find our composing tool that
								leverages the GPT-4 assistants API to generate
								original, open music.
							</CardText>
							<Button
								color="secondary"
								href="/research"
								className="secondary-button"
								disabled
							>
								Read Our Research{" "}
								<span role="img" aria-label="book emoji">
									📖
								</span>
							</Button>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default HomeContent;
