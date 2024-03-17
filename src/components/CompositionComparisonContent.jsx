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
	Spinner,
} from "reactstrap";
import Logger from "../services/Logger";
import GeneratedTunes from "../assets/GeneratedTunes";
import Synthesizer from "./Synthesizer";
import ProtectedContent from "./ProtectedContent";
import ConstructionComponent from "./ConstructionComponent";
import TuneViewerComponent from "./TuneViewerComponent";
import ABCNotation from "../services/ABCNotationParser";
import OrcheImage from "../assets/images/Orche.png";
import ABCInput from "./ABCInput";

const CompositionComparisonContent = () => {
	const [abcNotation1, setAbcNotation1] = useState("");
	const [abcNotation2, setAbcNotation2] = useState("");
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [hasCleaned, setHasCleaned] = useState(false);
	const [numFixes, setNumFixes] = useState(0);
	const [warnings, setWarnings] = useState([]);
	const [failed, setFailed] = useState(false);

	// States: welcome, loading, loaded, error, submitting, submitted
	const [pageState, setPageState] = useState("welcome");

	const [selectedTune, setSelectedTune] = useState("Select a tune");

	const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

	const selectTune = (tuneKey) => {
		const contents = GeneratedTunes[tuneKey];

		setSelectedTune(tuneKey);
		// setSelectedTune(GeneratedTunes[tuneKey].split("\n")[1].substring(2)); // To get the title (T:TuneName)

		setAbcNotation1(contents[0].output);
		setAbcNotation2(contents[1].output);
		resetCleaner();
		Logger.log(
			"New tune selected. Resetting cleaner. hasCleaned: ",
			hasCleaned
		);
	};

	const resetCleaner = () => {
		setHasCleaned(false);
		setNumFixes(0);
		setWarnings([]);
		setFailed(false);
	};

	const handleLoadTunes = () => {
		Logger.log("Loading tunes...");
		setPageState("loading");
		// Load tunes
		setTimeout(() => {
			setPageState("loaded");
		}, 1000);
	};

	return (
		<Container>
			<ProtectedContent>
				<p>Pick your favorite tune and compare the compositions.</p>
				<ConstructionComponent>
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
					{/* Alert */}
					<Row className="mt-2">
						<Col sm="12" md="6">
							<TuneViewerComponent
								animate={pageState === "loading"}
							/>
						</Col>
						<Col sm="12" md="6">
							<TuneViewerComponent
								animate={pageState === "loading"}
							/>
						</Col>
					</Row>
				</ConstructionComponent>
			</ProtectedContent>
		</Container>
	);
};

export default CompositionComparisonContent;
