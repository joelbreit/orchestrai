import React, { useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// import tunes from "../assets/Tunes";
import GeneratedTunes from "../assets/GeneratedTunes";
// import ABCNotations from "../assets/ABCNotations";
import ABCCleaner from "./ABCCleaner";
import CompositionComparisonContent from "./CompositionComparisonContent";
import ModalComparisonComponent from "./ModalComparisonComponent";

const JuxComposeContent = () => {
	const [activeTab, setActiveTab] = useState("Cleaner");
	const [abcNotation1, setAbcNotation1] = useState("");
	const [abcNotation2, setAbcNotation2] = useState("");
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [prompt, setPrompt] = useState("");
	const [selectedTune, setSelectedTune] = useState("Select a tune");

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
		setPrompt(tuneKey);
		setSelectedTune(tuneKey);
		// setSelectedTune(GeneratedTunes[tuneKey].split("\n")[1].substring(2)); // To get the title (T:TuneName)

		setAbcNotation1(contents[0].output);
		setAbcNotation2(contents[1].output);
	};

	return (
		<div>
			<h1>JuxCompose</h1>
			<p>
				This page contains various tools for comparing compositions made
				with ABC music notation.
			</p>
			<Nav tabs className="mb-3">
				{/* <NavItem>
					<NavLink
						className={
							activeTab === "ModalCompare"
								? "active active-tab"
								: "inactive-tab"
						}
						onClick={() => {
							toggleTab("ModalCompare");
						}}
					>
						LLM Comparison{" "}
						<span className="icon-square flex-shrink-0">
							<i className={`bi bi-music-note-beamed`}></i>
						</span>
					</NavLink>
				</NavItem> */}
				<NavItem>
					<NavLink
						className={
							activeTab === "Cleaner"
								? "active active-tab"
								: "inactive-tab"
						}
						onClick={() => {
							toggleTab("Cleaner");
						}}
					>
						Notation Cleaner{" "}
						<span className="icon-square flex-shrink-0">
							<i className={`bi bi-brush`}></i>
						</span>
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						className={
							activeTab === "Scorer"
								? "active active-tab"
								: "inactive-tab"
						}
						onClick={() => {
							toggleTab("Scorer");
						}}
					>
						Composition Comparison{" "}
						<span className="icon-square flex-shrink-0">
							<i className={`bi bi-music-note-beamed`}></i>
						</span>
					</NavLink>
				</NavItem>
			</Nav>
			<TabContent activeTab={activeTab}>
				<TabPane tabId="ModalCompare">
					{/* <ModalComparisonComponent /> */}
				</TabPane>

				<TabPane tabId="Cleaner">
					<ABCCleaner />
				</TabPane>

				<TabPane tabId="Scorer">
					<CompositionComparisonContent />
				</TabPane>
			</TabContent>
		</div>
	);
};

export default JuxComposeContent;
