import { saveAs } from "file-saver";
import React, { useEffect, useRef, useState } from "react";
import {
	Alert,
	Button,
	Card,
	CardBody,
	CardText,
	CardTitle,
	Col,
	Row,
} from "reactstrap";

import Logger from "../services/Logger";

import ABCJS from "abcjs";

function Synthesizer({ abcNotation, index, animate }) {
	const musicSheetRef = useRef(null);
	const audioRef = useRef(null);

	const [abcjsWarnings, setAbcjsWarnings] = useState([]);

	const downloadMIDI = async () => {
		if (!abcNotation) return;

		const midi = await ABCJS.synth.getMidiFile(abcNotation, {
			midiOutputType: "binary",
		})[0];
		// midi is a Uint8Array
		const blob = new Blob([midi], { type: "audio/midi" });
		saveAs(blob, `tune-${index}.midi`);
	};

	useEffect(() => {
		Logger.debug("Synthesizer useEffect");
		if (!abcNotation) return;

		if (ABCJS.synth.supportsAudio()) {
			const cleanedNotation = abcNotation.replace(/\n{2,}/g, "\n");
			function SimpleCursorControl() {
				var cursor;

				function resetAnimation() {
					// Remove highlights
					var highlights = document.querySelectorAll(
						`#paper${index} svg .highlight`
					);
					highlights.forEach(function (element) {
						element.classList.remove("highlight");
					});
					// Remove cursor
					if (cursor) {
						cursor.setAttribute("x1", 0);
						cursor.setAttribute("x2", 0);
						cursor.setAttribute("y1", 0);
						cursor.setAttribute("y2", 0);
					}
				}

				// Called when the play button is pressed
				this.onStart = function () {
					// Necessary for removing the previous cursor
					resetAnimation();
					// Create the cursor as an SVG line element
					var svg = document.querySelector(`#paper${index} svg`);
					cursor = document.createElementNS(
						"http://www.w3.org/2000/svg",
						"line"
					);
					cursor.setAttribute("class", "abcjs-cursor");
					cursor.setAttributeNS(null, "x1", 0);
					cursor.setAttributeNS(null, "y1", 0);
					cursor.setAttributeNS(null, "x2", 0);
					cursor.setAttributeNS(null, "y2", 0);
					if (svg) {
						svg.appendChild(cursor);
					} else {
						Logger.warn(
							"Could not find SVG element to attach cursor."
						);
					}
				};

				// Called when a new note is played
				this.onEvent = function (ev) {
					resetAnimation();
					// Update the cursor position
					if (cursor) {
						cursor.setAttribute("x1", ev.left - 2);
						cursor.setAttribute("x2", ev.left - 2);
						cursor.setAttribute("y1", ev.top);
						cursor.setAttribute("y2", ev.top + ev.height);
					}

					// Add highlight to the current elements
					ev.elements.forEach(function (elementGroup) {
						elementGroup.forEach(function (element) {
							element.classList.add("highlight");
						});
					});
				};

				this.onFinished = function () {
					resetAnimation();
				};
			}

			var abcOptions = { add_classes: true };
			var audioParams = { chordsOff: false };
			var visualOptions = { responsive: "resize", jazzchords: true };

			var synthControl = new ABCJS.synth.SynthController();

			var cursorControl = new SimpleCursorControl();

			synthControl.load(audioRef.current, cursorControl, {
				// displayLoop: true,
				displayRestart: true,
				displayPlay: true,
				displayProgress: true,
				// displayWarp: true,
			});

			// window.addEventListener("keydown", (event) => {
			// 	if (event.code === "Space") {
			// 		synthControl.play();
			// 	}
			// });

			const warnings = ABCJS.parseOnly(cleanedNotation)[0].warnings;
			if (warnings && warnings.length > 0) {
				Logger.warn("ABCJS Warnings: ", warnings);
				setAbcjsWarnings(warnings);
			}

			var visualObj = ABCJS.renderAbc(
				musicSheetRef.current,
				cleanedNotation,
				abcOptions,
				visualOptions
			);

			var createSynth = new ABCJS.synth.CreateSynth();
			createSynth
				.init({ visualObj: visualObj[0] })
				.then(function () {
					// Pass the cursor control object here
					synthControl
						.setTune(
							visualObj[0],
							false,
							audioParams,
							cursorControl
						)
						.then(function () {
							Logger.debug("Audio successfully loaded.");
						})
						.catch(function (error) {
							Logger.warn("Audio problem:", error);
						});
				})
				.catch(function (error) {
					Logger.warn("Audio problem:", error);
				});
		} else {
			if (audioRef.current) {
				audioRef.current.innerHTML =
					"Audio is not supported in this browser.";
			}
		}
	}, [abcNotation, index]);

	return (
		<div>
			{abcNotation ? (
				// Audio Player
				<div ref={audioRef} id={`audio${index}`} />
			) : (
				// Placeholder for Audio Player
				<p
					className={
						animate ? "placeholder-glow" : "placeholder-block"
					}
				>
					<span
						className="placeholder col-12"
						style={{ height: "38px" }}
					></span>
				</p>
			)}
			{abcNotation ? (
				// Sheet Music
				<div ref={musicSheetRef} id={`paper${index}`} />
			) : (
				// Placeholder for Sheet Music
				<Card>
					<CardBody>
						<CardTitle
							className={
								animate
									? "placeholder-glow"
									: "placeholder-block"
							}
						>
							<span className="placeholder col-6 offset-3" />
						</CardTitle>
						<CardText
							className={
								animate
									? "placeholder-glow"
									: "placeholder-block"
							}
						>
							<span className="placeholder col-12" />
							<span className="placeholder col-12" />
							<span className="placeholder col-12" />
						</CardText>
					</CardBody>
				</Card>
			)}
			{/* {abcjsWarnings.length > 0 && (
				<Alert color="warning" className="mt-2">
					<ul>
						{abcjsWarnings.map((warning, i) => (
							<li key={i}>{warning}</li>
						))}
					</ul>
				</Alert>
			)} */}
			<Row className="mt-2">
				<Col className="d-flex justify-content-end">
					<Button
						className="primary-button mb-2"
						size="sm"
						onClick={downloadMIDI}
						disabled={!abcNotation}
					>
						Download MIDI
					</Button>
				</Col>
			</Row>
		</div>
	);
}

export default Synthesizer;
