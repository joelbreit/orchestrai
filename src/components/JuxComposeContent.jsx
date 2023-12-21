import React, { useState } from "react";
import {
	Col,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Input,
	Nav,
	NavItem,
	NavLink,
	Row,
	TabContent,
	TabPane
} from "reactstrap";

// import tunes from "../assets/Tunes";
import GeneratedTunes from "../assets/GeneratedTunes";
// import ABCNotations from "../assets/ABCNotations";
import ABCCleaner from "./ABCCleaner";
import Synthesizer from "./Synthesizer";

const JuxComposeContent = () => {
	const [activeTab, setActiveTab] = useState("1");
	const [abcNotation1, setAbcNotation1] = useState("");
	const [abcNotation2, setAbcNotation2] = useState("");
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const selectedTune = useState("Select a Tune");

	const toggleTab = (tab) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	const handleInputChange1 = (e) => {
		setAbcNotation1(e.target.value);
	};

	const handleInputChange2 = (e) => {
		setAbcNotation2(e.target.value);
	};

	const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

	const selectTune = (tuneKey) => {
		const contents = GeneratedTunes[tuneKey];
		// setSelectedTune(GeneratedTunes[tuneKey].split("\n")[1].substring(2)); // To get the title (T:TuneName)

		setAbcNotation1(contents[0].output);
		setAbcNotation2(contents[1].output);
	};

	return (
		<div>
			<Nav tabs>
				<NavItem>
					<NavLink
						className={activeTab === "1" ? "active" : ""}
						onClick={() => {
							toggleTab("1");
						}}
					>
						Notation Styles{" "}
						<span className="icon-square flex-shrink-0">
							<i className={`bi bi-pencil-square`}></i>
						</span>
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						className={activeTab === "2" ? "active" : ""}
						onClick={() => {
							toggleTab("2");
						}}
					>
						Notation Cleaner{" "}
						<span className="icon-square flex-shrink-0">
							<i className={`bi bi-brush`}></i>
						</span>
					</NavLink>
				</NavItem>
			</Nav>
			<TabContent activeTab={activeTab}>
				<TabPane tabId="1">
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
									{tuneKey}{" "}
									{/* Extracts the title of the tune */}
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
								<Synthesizer
									abcNotation={abcNotation1}
									index={1}
								/>
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
							<Col>
								<h2>Rendered Music Sheet:</h2>
								<Synthesizer
									abcNotation={abcNotation2}
									index={2}
								/>
							</Col>
						</Col>
					</Row>
				</TabPane>

				<TabPane tabId="2">
					<ABCCleaner />
				</TabPane>
			</TabContent>
		</div>
	);
};

export default JuxComposeContent;
