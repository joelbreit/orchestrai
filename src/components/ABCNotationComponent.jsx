import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, Popover } from "reactstrap";
import useOutsideAlerter from "../hooks/useOutsideAlerter";

import PrettyABC from "./PrettyABC";

import ABCNotation from "../services/notation-editing/parser.jsx";
import Logger from "../services/Logger.js";

const ABCNotationComponent = ({ parentText, placeholderText, onChange }) => {
	const formRef = useRef(null); // Reference to the form wrapper

	const [isEditing, setIsEditing] = useState(false);
	// Stores the currently saved value in the undo stack. It's a little wonky, but it's better than using a separate state variable
	const [undoStack, setUndoStack] = useState([parentText]);
	const [redoStack, setRedoStack] = useState([]);

	const [evaluator, setEvaluator] = useState(null);
	const [showNormalizations, setShowNormalizations] = useState(false);
	const [showFixes, setShowFixes] = useState(false);
	const [showWarnings, setShowWarnings] = useState(false);

	const [copyIcon, setCopyIcon] = useState("bi bi-copy");
	const [pasteIcon, setPasteIcon] = useState("bi bi-clipboard");

	// Custom hook to detect clicks outside the form
	useOutsideAlerter(formRef, () => {
		if (isEditing) handleFormat();
	});

	// Switches the editor to view mode and updates the undo stack
	// Called when the user clicks outside the form or presses the save button
	const handleFormat = (event) => {
		if (event) event.stopPropagation();
		setIsEditing(false);
		updateUndoStack(parentText);
	};

	const handleEvaluate = () => {
		const tune = new ABCNotation(parentText);
		setEvaluator(tune);
	};

	const handleUndo = () => {
		if (undoStack.length > 1) {
			const currentText = parentText;
			const lastChange = undoStack[undoStack.length - 2];
			setUndoStack(undoStack.slice(0, -1));
			setRedoStack([...redoStack, currentText]);
			onChange(lastChange);
		}
	};

	const handleRedo = () => {
		if (redoStack.length > 0) {
			const lastChange = redoStack[redoStack.length - 1];
			setRedoStack(redoStack.slice(0, -1));
			setUndoStack([...undoStack, parentText]);
			onChange(lastChange);
		}
	};

	const handleRepair = () => {
		const startTime = performance.now();
		const currentText = parentText;
		const tune = new ABCNotation(currentText);
		if (tune.fullText !== currentText) {
			if (undoStack.length === 0) {
				const lastValue = undoStack[undoStack.length - 1];
				if (currentText !== lastValue && (currentText || lastValue)) {
					setUndoStack([...undoStack, currentText]);
				}
			}
			setEvaluator(tune);
			onChange(tune.fullText);
		}
		const endTime = performance.now();
		Logger.debug(`Repair took ${endTime - startTime} ms`);
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(parentText).then(() => {
			setCopyIcon("bi bi-check"); // Change icon to checkmark after copying
			setTimeout(() => {
				setCopyIcon("bi bi-copy"); // Revert icon back to the original after 1 second
			}, 1000);
		});
	};

	const handlePaste = async () => {
		try {
			const text = await navigator.clipboard.readText();
			onChange(text);
			setIsEditing(false);
			updateUndoStack(text);
			setPasteIcon("bi bi-check"); // Change icon to checkmark after pasting
			setTimeout(() => {
				setPasteIcon("bi bi-clipboard"); // Revert icon back to the clipboard after 1 second
			}, 1000);
		} catch (err) {
			Logger.error("Failed to read clipboard contents: ", err);
		}
	};

	const handleEdit = () => {
		setIsEditing(true);
	};

	const updateUndoStack = (text) => {
		if (undoStack.length !== 0) {
			const lastValue = undoStack[undoStack.length - 1];
			if (text !== lastValue && (text || lastValue)) {
				setUndoStack([...undoStack, text]);
				setRedoStack([]);
			}
		}
	};

	// Anytime isEditing switches to false, update the undo stack
	useEffect(() => {
		const lastValue = undoStack[undoStack.length - 1];
		if (
			!isEditing &&
			parentText !== lastValue &&
			(parentText || lastValue)
		) {
			setUndoStack([...undoStack, lastValue]);
			setRedoStack([]);
		}
	}, [parentText]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div ref={formRef}>
			{/* Toolbar with buttons */}
			<div className="ABCToolBar" style={{ paddingRight: "10px" }}>
				{/* Normalizations Popover */}
				{evaluator &&
					evaluator.normalizations.length +
						evaluator.fixes.length +
						evaluator.warnings.length >
						0 && (
						<>
							<Button
								type="button"
								id="normalizationsPopover"
								title="Normalizations"
								className="mr-2"
								disabled={evaluator.normalizations.length === 0}
								style={{
									color: `${
										evaluator.normalizations.length > 0
											? "#007bff"
											: ""
									}`,
								}}
							>
								<span className="icon-square flex-shrink-0">
									<i className={`bi bi-brush`}></i>
								</span>
							</Button>
							<Popover
								placement="bottom"
								target="normalizationsPopover"
								isOpen={showNormalizations}
								toggle={() =>
									setShowNormalizations(!showNormalizations)
								}
							>
								<div className="popover-body">
									{evaluator.normalizations.map(
										(normalization, index) => (
											<p key={index}>{normalization}</p>
										)
									)}
								</div>
							</Popover>
							{/* Fixes Popover */}
							<Button
								type="button"
								id="fixesPopover"
								title="Fixes"
								className="mr-2"
								disabled={evaluator.fixes.length === 0}
								style={{
									color: `${
										evaluator.fixes.length > 0
											? "#28a745"
											: ""
									}`,
								}}
							>
								<span className="icon-square flex-shrink-0">
									<i className={`bi bi-check2`}></i>
								</span>
							</Button>
							<Popover
								placement="bottom"
								target="fixesPopover"
								isOpen={showFixes}
								toggle={() => setShowFixes(!showFixes)}
							>
								<div className="popover-body">
									{evaluator.fixes.map((fix, index) => (
										<p key={index}>{fix}</p>
									))}
								</div>
							</Popover>
							{/* Warnings Popover */}
							<Button
								type="button"
								id="warningsPopover"
								title="Warnings"
								className="mr-2"
								disabled={evaluator.warnings.length === 0}
								style={{
									color: `${
										evaluator.warnings.length > 0
											? "#ffc107"
											: ""
									}`,
								}}
							>
								<span className="icon-square flex-shrink-0">
									<i
										className={`bi bi-exclamation-triangle`}
									></i>
								</span>
							</Button>
							<Popover
								placement="bottom"
								target="warningsPopover"
								isOpen={showWarnings}
								toggle={() => setShowWarnings(!showWarnings)}
							>
								<div className="popover-body">
									<ol>
										{evaluator.warnings.map(
											(warning, index) => (
												<li
													key={index}
													dangerouslySetInnerHTML={{
														__html: warning,
													}}
												></li>
											)
										)}
									</ol>
								</div>
							</Popover>
						</>
					)}
				{/* Evaluate Button */}
				<Button
					type="button"
					onClick={handleEvaluate}
					disabled={parentText.length === 0}
					title="Evaluate"
				>
					<span className="icon-square flex-shrink-0">
						<i className={`bi bi-list-check`}></i>
					</span>
				</Button>
				{/* Undo Button */}
				<Button
					type="button"
					onClick={handleUndo}
					disabled={undoStack.length === 1}
					title="Undo"
				>
					<span className="icon-square flex-shrink-0">
						<i className={`bi bi-arrow-counterclockwise`}></i>
					</span>
				</Button>
				{/* Redo Button */}
				<Button
					type="button"
					onClick={handleRedo}
					disabled={redoStack.length === 0}
					title="Redo"
				>
					<span className="icon-square flex-shrink-0">
						<i className={`bi bi-arrow-clockwise`}></i>
					</span>
				</Button>
				{/* Repair Button */}
				<Button type="button" onClick={handleRepair} title="Repair">
					<span className="icon-square flex-shrink-0">
						<i className={`bi bi-wrench-adjustable-circle`}></i>
					</span>
				</Button>
				{/* Copy Button */}
				<Button
					type="button"
					onClick={handleCopy}
					disabled={parentText.length === 0}
					title="Copy"
				>
					<span className="icon-square flex-shrink-0">
						<i className={copyIcon}></i>
					</span>
				</Button>
				{/* Paste Button */}
				<Button type="button" onClick={handlePaste} title="Paste">
					<span className="icon-square flex-shrink-0">
						<i className={pasteIcon}></i>
					</span>
				</Button>
				{/* Edit/Save Button */}
				{!isEditing ? (
					<Button type="button" onClick={handleEdit} title="Edit">
						<span className="icon-square flex-shrink-0">
							<i className={`bi bi-pencil`}></i>
						</span>
					</Button>
				) : (
					<Button type="button" onClick={handleFormat} title="Save">
						<span className="icon-square flex-shrink-0">
							<i className={`bi bi-floppy`}></i>
						</span>
					</Button>
				)}
				{/* Clear Button */}
				<Button
					type="button"
					onClick={() => {
						onChange("");
					}}
					disabled={parentText.length === 0}
					title="Clear"
				>
					<span className="icon-square flex-shrink-0">
						<i className={`bi bi-trash`}></i>
					</span>
				</Button>
			</div>
			<Form onClick={handleEdit} className="mb-2 ABCForm">
				{isEditing ? (
					// TODO make this a component
					<>
						<Input
							type="textarea"
							value={parentText}
							onChange={(e) => onChange(e.target.value)}
							placeholder={placeholderText}
							style={{
								height: `${
									parentText.split("\n").length * 21 + 22
								}px`,
							}}
							className="ABCInput"
						/>
					</>
				) : (
					<PrettyABC
						code={parentText}
						setCode={onChange}
						onEdit={handleEdit}
						invalid={evaluator?.warnings.length > 0}
					/>
				)}
			</Form>
		</div>
	);
};

export default ABCNotationComponent;
