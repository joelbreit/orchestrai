import React, { useState } from "react";
import {
	Card,
	Col,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Input,
	Row
} from "reactstrap";

// import tunes from "../assets/Tunes";
import GeneratedTunes from "../assets/GeneratedTunes";
// import ABCNotations from "../assets/ABCNotations";
import Synthesizer from "./Synthesizer";

const NotationStylesContent = () => {
	const [abcNotation1, setAbcNotation1] = useState("");
	const [abcNotation2, setAbcNotation2] = useState("");
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [prompt, setPrompt] = useState("");
	const [selectedTune, setSelectedTune] = useState("Select a tune");

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
			<h1>JuxCompose for Notation Styles</h1>
			<p>
				This is an archive of an experiment to generate tunes in
				different styles with the same prompt. The tunes were generated
				using GPT-4 with prompts like:
			</p>
			<blockquote
				style={{
					backgroundColor: "lightgray",
					padding: "1rem",
					borderRadius: "0.5rem",
				}}
			>
				Compose a piece of music in [output format] about [topic]. This
				piece should embody the [style] style. Consider the typical
				musical elements and rhythms used in this genre, and ensure the
				composition reflects the mood and themes commonly associated
				with [topic]. The music should be structured in a way that's
				characteristic of [style] music, accommodating variations in
				melody, harmony, and rhythm that are true to that style.
			</blockquote>
			<p>
				Each tune was generated twice, once with ABC Notation and once
				with (Note, Duration) pairs.
			</p>
			<Row>
				<Col sm="6">
					<p>The topics included:</p>

					<ul>
						<li>Quarantine</li>
						<li>A Journey from Sadness to Joy</li>
						<li>Pirates</li>
						<li>Rebellion</li>
						<li>Victory</li>
					</ul>
				</Col>
				<Col sm="6">
					<p>The styles included:</p>
					<ul>
						<li>String Quartet</li>
						<li>Marching Band</li>
						<li>Brass Trio</li>
						<li>3-Part Harmony</li>
						<li>Trio</li>
						<li>Mambo</li>
						<li>Show Choir</li>
						<li>Barbershop Quartet</li>
					</ul>
				</Col>
			</Row>
			<iframe
				src="https://manifold.markets/embed/probajoelistic/will-gpt4-do-better-at-composing-mu"
				title="Will GPT-4 do better at composing music with ABC Notation than with (Note, Duration) pairs?"
				frameborder="0"
				style={{
					position: "relative",
					left: "50%",
					transform: "translateX(-50%)",
					width: "90%",
					height: "18rem",
					maxWidth: "70rem",
				}}
			></iframe>
			<p>
				Here, you can compare the tunes generated with ABC Notation and
				(Note, Duration) pairs for the same prompt and style.
			</p>

			<h4
				style={{
					marginTop: "2rem",
					marginBottom: "1rem",
				}}
			>
				Select a prompt
			</h4>

			<Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
				<DropdownToggle caret className="primary-dropdown">
					{selectedTune}
				</DropdownToggle>
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
			<Card body className="mt-4">
				<h2>Generated Tunes for: {prompt}</h2>
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
							<h2>ABC Notation:</h2>
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
						<Col>
							<h2>Note Duration Pairs:</h2>
							<Synthesizer abcNotation={abcNotation2} index={2} />
						</Col>
					</Col>
				</Row>
			</Card>
		</div>
	);
};

export default NotationStylesContent;
