import {
	Alert,
	Button,
	Col,
	Container,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Input,
	Row,
} from "reactstrap";
import React, { useEffect, useState } from "react";

// import tunes from "../assets/Tunes";
import GeneratedTunes from "../assets/GeneratedTunes";
// import ABCNotations from "../assets/ABCNotations";
import Synthesizer from "./Synthesizer";

import ABCNotation from "../services/ABCNotationParser";

import OrcheImage from "../assets/images/Orche.png";

const ABCCleaner = () => {
	const [abcNotation1, setAbcNotation1] = useState("");
	const [abcNotation2, setAbcNotation2] = useState("");
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [hasCleaned, setHasCleaned] = useState(false);
	const [numFixes, setNumFixes] = useState(0);
	const [numWarnings, setNumWarnings] = useState(0);
	const [warnings, setWarnings] = useState([]);
	const [failed, setFailed] = useState(false);

	const selectedTune = useState("Select a Tune");

	const handleInputChange1 = (e) => {
		setAbcNotation1(e.target.value);
		resetCleaner();
	};

	const handleInputChange2 = (e) => {
		setAbcNotation2(e.target.value);
		resetCleaner();
	};

	const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

	const selectTune = (tuneKey) => {
		const contents = GeneratedTunes[tuneKey];
		// setSelectedTune(GeneratedTunes[tuneKey].split("\n")[1].substring(2)); // To get the title (T:TuneName)

		setAbcNotation1(contents[0].output);
		setAbcNotation2(contents[1].output);
		resetCleaner();
		console.log(
			"New tune selected. Resetting cleaner. hasCleaned: ",
			hasCleaned
		);
	};

	const resetCleaner = () => {
		setHasCleaned(false);
		setNumFixes(0);
		setNumWarnings(0);
		setWarnings([]);
		setFailed(false);
	};

	// useEffect(() => {
	// 	setHasCleaned(false);
	// 	setNumFixes(0);
	// 	setNumWarnings(0);
	// 	setFailed(false);
	// 	console.log("hasCleaned: ", hasCleaned);
	// }
	// , [abcNotation1, abcNotation2]);

	console.log("hasCleaned: ", hasCleaned);
	console.log("numFixes: ", numFixes);
	console.log("failed: ", failed);

	return (
		<Container>
			<h1>JuxCompose</h1>
			<Dropdown
				isOpen={dropdownOpen}
				toggle={toggleDropdown}
				className="mb-2"
			>
				<DropdownToggle caret>{selectedTune}</DropdownToggle>
				<DropdownMenu>
					{Object.keys(GeneratedTunes).map((tuneKey) => (
						<DropdownItem
							key={tuneKey}
							onClick={() => selectTune(tuneKey)}
						>
							{tuneKey} {/* Extracts the title of the tune */}
						</DropdownItem>
					))}
				</DropdownMenu>
			</Dropdown>
			<Row>
				<Col sm="6">
					<Input
						type="textarea"
						value={abcNotation1}
						onChange={handleInputChange1}
						placeholder="Enter ABC notation here"
						rows={10}
					/>
					<Col>
						<h2>Rendered Music Sheet:</h2>
						<Synthesizer abcNotation={abcNotation1} index={1} />
						<div id="paper1"></div>
						<div id="audio1"></div>
					</Col>
				</Col>
				<Col sm="6">
					<Input
						type="textarea"
						value={abcNotation2}
						onChange={handleInputChange2}
						placeholder="Enter ABC notation here"
						rows={10}
					/>
					<Button
						onClick={() => {
							const cleanedNotation = new ABCNotation(
								abcNotation1
							);
							setAbcNotation2(cleanedNotation.abcNotation);
							setHasCleaned(true);
							setNumFixes(cleanedNotation.numFixes);
							setNumWarnings(cleanedNotation.numWarnings);
							setWarnings(cleanedNotation.warnings);
							setFailed(cleanedNotation.failed);
						}}
						disabled={!abcNotation1}
						className="primary-button my-2"
					>
						Clean{" "}
						<span role="img" aria-label="clean emoji">
							🧹
						</span>
					</Button>
					{hasCleaned &&
						(failed ? (
							<Alert color="danger">
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
									Failed to clean notation. {numWarnings}{" "}
									warnings were issued.
								</div>
							</Alert>
						) : numWarnings > 0 ? (
							<Alert color="warning">
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
									Notation successfully cleaned! {numFixes}{" "}
									fixes were made, but {numWarnings} warnings
									were issued.
								</div>
							</Alert>
						) : numFixes > 0 ? (
							<Alert color="success">
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
									Notation successfully cleaned! {numFixes}{" "}
									fixes were made!
								</div>
							</Alert>
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
									Notation successfully cleaned! No fixes were
									made.
								</div>
							</Alert>
						))}
					<Col>
						<h2>Rendered Music Sheet:</h2>
						<Synthesizer abcNotation={abcNotation2} index={2} />
					</Col>
				</Col>
			</Row>
		</Container>
	);
};

export default ABCCleaner;
