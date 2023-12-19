import React from "react";
import {
	Button,
	Card,
	CardBody,
	CardImg,
	CardText,
	CardTitle,
	Col,
	Container,
	Row,
} from "reactstrap";

import OrcasOpusImage from "../assets/images/OrcasOpusImage.png";
import OrcheImage from "../assets/images/Orche.png";
import JuxComposeImage from "../assets/images/MusicExplosion.png";
import ABCEditorImage from "../assets/images/ABCEditor.png";

const HomeContent = () => {
	return (
		<Container className="mt-5">
			<div className="text-center my-5">
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<img src={OrcheImage} width="70" height="70" alt="Orche" />{" "}
					<h1>OrchestrAI</h1>
				</div>
				<p className="lead">
					Music is meant to be shared. At OrchestrAI, we want to bring
					the power of generative language models to anyone interested
					in writing music. Here you can find our composing tool that
					leverages the GPT-4 assistants API to generate original,
					open music.
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
			</div>
			<Row className="justify-content-center" style={{ display: "flex" }}>
				<Col xl={4} md={6} style={{ display: "flex" }}>
					<Card className="my-2" style={{ flex: 1 }}>
						<CardImg
							top
							width="100%"
							src={OrcasOpusImage}
							alt="OrchestrAI Image"
						/>
						<CardBody>
							<CardTitle tag="h5">
								Can Language Models Really Write Music?
							</CardTitle>
							<CardText>
								This site started as a reseach project to
								explore the capabilities of language models in
								generating music. We found that the GPT-4
								assistants API was able to generate music that
								was both original and open.
							</CardText>
							<Button
								color="secondary"
								href="/research"
								className="primary-button"
							>
								Read Our Research{" "}
								<span role="img" aria-label="book emoji">
									📖
								</span>
							</Button>
						</CardBody>
					</Card>
				</Col>
				<Col xl={4} md={6} style={{ display: "flex" }}>
					<Card className="my-2" style={{ flex: 1 }}>
						<CardImg
							alt="Music Battle Image"
							src={JuxComposeImage}
							top
							width="100%"
						/>
						<CardBody>
							<CardTitle tag="h5">JuxCompose</CardTitle>
							<CardText>
								We created a tool to allow users to compare
								multiple ABC notation compositions side-by-side.
							</CardText>
							<Button
								color="secondary"
								href="/juxcompose"
								className="primary-button"
							>
								Try It Out{" "}
								<span role="img" aria-label="crossed swords">
									⚔️
								</span>
							</Button>
						</CardBody>
					</Card>
				</Col>
				<Col xl={4} md={6} style={{ display: "flex" }}>
					<Card className="my-2" style={{ flex: 1 }}>
						<CardImg
							alt="Music Battle Image"
							src={ABCEditorImage}
							top
							width="100%"
						/>
						<CardBody>
							<CardTitle tag="h5">ABC Editor</CardTitle>
							<CardText>
								Have a composition from a previous version? Use
								our ABC Editor to load and edit your tunes.
							</CardText>
							<Button
								color="secondary"
								href="/abcEditor"
								className="primary-button"
							>
								Try It Out{" "}
								<span role="img" aria-label="paper emoji">
									📝
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
