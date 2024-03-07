import "abcjs/abcjs-audio.css";
import "../assets/sass/music.scss";

import React, { useEffect, useRef } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { saveAs } from "file-saver";

import Logger from "../services/Logger";

import ABCJS from "abcjs";

function Synthesizer({ abcNotation, index }) {
	const musicSheetRef = useRef(null);
	const audioRef = useRef(null);

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
			var visualOptions = { responsive: "resize" };

			var synthControl = new ABCJS.synth.SynthController();

			var cursorControl = new SimpleCursorControl();

			synthControl.load(audioRef.current, cursorControl, {
				displayLoop: true,
				displayRestart: true,
				displayPlay: true,
				displayProgress: true,
				displayWarp: true,
			});

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
							Logger.log("Audio successfully loaded.");
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
		<Container>
			{/* Audio Player */}
			<div ref={audioRef} id={`audio${index}`} />
			{/* Visual Sheet Music Representation */}
			<div ref={musicSheetRef} id={`paper${index}`} />
			<Row className="mt-2">
				<Col className="d-flex justify-content-end">
					<Button
						className="primary-button mb-2"
						size="sm"
						onClick={downloadMIDI}
					>
						Download MIDI
					</Button>
				</Col>
			</Row>
		</Container>
	);
}

export default Synthesizer;
