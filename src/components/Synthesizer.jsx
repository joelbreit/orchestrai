import "abcjs/abcjs-audio.css";
import "../assets/sass/music.scss";

import React, { useEffect, useRef } from "react";

import ABCJS from "abcjs";

function Synthesizer({ abcNotation, index }) {
	const musicSheetRef = useRef(null);
	const audioRef = useRef(null);

	useEffect(() => {
		if (!abcNotation) return;

		if (ABCJS.synth.supportsAudio()) {
			const cleanedNotation = abcNotation.replace(/\n{2,}/g, "\n");
			function SimpleCursorControl() {
				var cursor;

				this.onReady = function () {};

				this.onStart = function () {
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
						console.warn(
							"Could not find SVG element to attach cursor."
						);
					}
				};

				this.onEvent = function (ev) {
					// Remove existing highlights
					var lastHighlights = document.querySelectorAll(
						`#paper${index} svg .highlight`
					);
					lastHighlights.forEach(function (element) {
						element.classList.remove("highlight");
					});

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
					// Hide the cursor when the music finishes
					if (cursor) {
						cursor.setAttribute("x1", 0);
						cursor.setAttribute("x2", 0);
						cursor.setAttribute("y1", 0);
						cursor.setAttribute("y2", 0);
					}
					var highlights = document.querySelectorAll(
						`#paper${index} svg .highlight`
					);
					highlights.forEach(function (element) {
						element.classList.remove("highlight");
					});
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
							console.log("Audio successfully loaded.");
						})
						.catch(function (error) {
							console.warn("Audio problem:", error);
						});
				})
				.catch(function (error) {
					console.warn("Audio problem:", error);
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
			<div ref={audioRef} id={`audio${index}`} />
			<div ref={musicSheetRef} id={`paper${index}`} />
		</div>
	);
}

export default Synthesizer;
