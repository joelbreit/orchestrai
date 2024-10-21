import React, { useState } from "react";
import {
	Alert,
	Button,
	Col,
	Container,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Row,
} from "reactstrap";
import Logger from "../services/Logger";

// import tunes from "../assets/Tunes";
import GeneratedTunes from "../assets/GeneratedTunes";
// import ABCNotations from "../assets/ABCNotations";
import Synthesizer from "./Synthesizer";

// import ABCNotation from "../services/ABCNotationParser";
import ABCNotation from "../services/notation-editing/parser";

import OrcheImage from "../assets/images/Orche.png";
import ABCNotationComponent from "./ABCNotationComponent";

const example = `abc
X:1
T:Final Confrontation Overture
C:OrchestrAI
M:4/4
L:1/16
Q:1/4=180
K:Bmin
V:1 clef=treble name="Lead Synth" subname="Lead"
%%MIDI program 81
|: "Bm"fdfb afbf f4 e4 | "A"gagf e2c2 cdec B2A2 | "G"f2d2 d2F2 G4 A4 | "F#"B4 A4 F4 E4 |
"Bm"D2F2 B4 d9   | "A"E2C2 A4 e9   | "G"GABc d4 B4 c4 |1 "F#"B2F2 D4 B,4 E4 :|2 "F#"B2F2 D4 F4 z4 ||
V:2 clef=treble name="Rhythm Synth" subname="Chords"
%%MIDI program 81
|: "Bm"B,2F2 B,2F2 B,4 B,4 | "A"A,2E2 A,2C2 C4 E4 | "G"G,2D2 G,2B,2 D4 G4 | "F#"F,2A,2 C4 F,4 z4 |
"Bm"B,2F2 B,4 B,4 B,4 | "A"A,4 E4 A,4 E4 | "G"D,4 G,4 B,4 D4 |1 "F#"A,4 A,4 F,4 C4 :|2 "F#"A,4 A,4 F,4 z4 ||
V:3 clef=bass name="Bass Synth" subname="Bass"
%%MIDI program 38
|: "Bm"B,8 B,8 B,  | "A"A,8 A,8 A,  | "G"G,8 G,8 G,  | "F#"F,8 F,8 F,  |
"Bm"B,8 B,8 B,  | "A"A,8 A,8 A,  | "G"G,8 G,8 G,  |1 "F#"F,8 F,8 F,  :|2 "F#"F,8 F,8 F,  ||`;

const ABCCleaner = () => {
	const [abcNotation1, setAbcNotation1] = useState("");
	const [abcNotation2, setAbcNotation2] = useState("");
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [hasCleaned, setHasCleaned] = useState(false);
	const [numFixes, setNumFixes] = useState(0);
	const [warnings, setWarnings] = useState([]);
	const [failed, setFailed] = useState(false);

	const [selectedTune, setSelectedTune] = useState("Select a tune");

	const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

	// const selectTune = (tuneKey) => {
	// 	const contents = GeneratedTunes[tuneKey];

	// 	setSelectedTune(tuneKey);
	// 	// setSelectedTune(GeneratedTunes[tuneKey].split("\n")[1].substring(2)); // To get the title (T:TuneName)

	// 	setAbcNotation1(contents[0].output);
	// 	setAbcNotation2(contents[1].output);
	// 	resetCleaner();
	// 	Logger.log(
	// 		"New tune selected. Resetting cleaner. hasCleaned: ",
	// 		hasCleaned
	// 	);
	// };

	const loadExample = () => {
		setAbcNotation1(example);
		setAbcNotation2("");

		resetCleaner();
	};

	const resetCleaner = () => {
		setHasCleaned(false);
		setNumFixes(0);
		setWarnings([]);
		setFailed(false);
	};

	return (
		<Container>
			<p>
				The
				<span className="fw-bold"> OrchestrAI Notation Cleaner </span>
				is a tool that helps you clean up ABC notation compositions.
				Compositions created with LLMs frequently contain notation
				errors that can turn an impressive piece of music into a jumbled
				mess. These small mistakes often cause vioces to get out of sync
				which can be particularly detrimental to the overall quality of
				the composition. This is especially noticeable on this platform
				as it animates the notes as they are played.
			</p>
			<p>
				The cleaner can help you fix some of these errors and get your
				composition back on track. To use it, paste your ABC notation
				into the input box on the left and click the "Clean" button. If
				the cleaner is able to fix the notation, the cleaned version
				will appear in the right input box. You can also select "Load
				Example" to see an example of a tune that can be cleaned with
				this tool.
			</p>
			<p>
				This tool is a work in progress. In past experience, it works
				between 70-80% of the time for small issues, and 20-30% of the
				time for compositions with a lot of issues. More work is being
				done to improve the capabilities of the cleaner.
			</p>

			<Row>
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
								{/* <img
									src={OrcheImage}
									width="30"
									height="30"
									alt="Orche"
								/>{" "} */}
								<i className="bi bi-x-circle"></i>{" "}
								<span>
									Sorry, but this tune wasn't able to be
									repaired. {warnings.length} warnings were
									issued. See something strange? Send a
									message to the{" "}
									<a
										href="https://discord.gg/e3nNUGVA7A"
										target="_blank"
										rel="noreferrer"
									>
										Discord{" "}
										<i className="bi bi-discord"></i>
									</a>
									.
								</span>
							</div>
						</Alert>
					) : warnings.length > 0 ? (
						// TODO - lots of duplicate code here
						<Alert color="warning">
							<div
								style={{
									display: "flex",
									alignItems: "center",
									// justifyContent: "center",
								}}
							>
								{/* <img
									src={OrcheImage}
									width="30"
									height="30"
									alt="Orche"
								/>{" "} */}
								<i className="bi bi-exclamation-triangle"></i>{" "}
								Notation successfully cleaned! {numFixes} fixes
								were made, but {warnings.length} warnings were
								issued.
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
								{/* <img
									src={OrcheImage}
									width="30"
									height="30"
									alt="Orche"
								/>{" "} */}
								<i className="bi bi-check-circle"></i> Notation
								successfully cleaned! {numFixes} fixes were
								made!
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
								{/* <img
									src={OrcheImage}
									width="30"
									height="30"
									alt="Orche"
								/>{" "} */}
								<i className="bi bi-check-circle"></i> Notation
								successfully cleaned! No fixes were needed.
							</div>
						</Alert>
					))}
				<Col sm="6">
					<ABCNotationComponent
						parentText={abcNotation1}
						placeholderText="Enter ABC notation here"
						onChange={setAbcNotation1}
					/>
					{/* <Dropdown
						isOpen={dropdownOpen}
						toggle={toggleDropdown}
						className="mb-2"
					>
						<DropdownToggle caret className="primary-dropdown">
							{selectedTune}
						</DropdownToggle>
						<DropdownMenu>
							{Object.keys(GeneratedTunes).map((tuneKey) => (
								<DropdownItem
									key={tuneKey}
									onClick={() => selectTune(tuneKey)}
								>
									{tuneKey}{" "}
								</DropdownItem>
							))}
						</DropdownMenu>
					</Dropdown> */}
					<Button
						onClick={() => {
							loadExample();
						}}
						className="primary-button-outline mb-2"
					>
						Load Example{" "}
						<span className="icon-square flex-shrink-0">
							<i className={`bi bi-code-square`}></i>
						</span>
					</Button>

					<Col>
						<h2>Original Composition</h2>
						<Synthesizer abcNotation={abcNotation1} index={1} />
						<div id="paper1"></div>
						<div id="audio1"></div>
					</Col>
				</Col>
				<Col sm="6">
					<ABCNotationComponent
						parentText={abcNotation2}
						placeholderText="Enter ABC notation here"
						onChange={setAbcNotation2}
					/>
					<Button
						onClick={() => {
							const cleanedNotation = new ABCNotation(
								abcNotation1
							);
							setAbcNotation2(cleanedNotation.fullText);
							setHasCleaned(true);
							setNumFixes(cleanedNotation.fixes.length);
							setWarnings(cleanedNotation.warnings);
							setFailed(cleanedNotation.failed);
						}}
						disabled={!abcNotation1}
						className="primary-button mb-2"
					>
						Clean{" "}
						<span className="icon-square flex-shrink-0">
							<i className={`bi bi-wrench`}></i>
						</span>
					</Button>

					<Col>
						<h2>Cleaned Composition</h2>
						<Synthesizer abcNotation={abcNotation2} index={2} />
					</Col>
				</Col>
			</Row>
		</Container>
	);
};

export default ABCCleaner;
