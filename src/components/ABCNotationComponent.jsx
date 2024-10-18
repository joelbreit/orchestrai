import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input } from "reactstrap";
import useOutsideAlerter from "../hooks/useOutsideAlerter";

import PrettyABC from "./PrettyABC";

import ABCNotation from "../services/notation-editing/parser.jsx";
import Logger from "../services/Logger.js";

const ABCNotationComponent = ({ parentText, placeholderText, onChange }) => {
	const [isEditing, setIsEditing] = useState(false);
	// Stores the currently saved value in the undo stack. It's a little wonky, but it's better than using a separate state variable
	const [undoStack, setUndoStack] = useState([parentText]);
	const [redoStack, setRedoStack] = useState([]);
	const formRef = useRef(null); // Reference to the form wrapper

	// Custom hook to detect clicks outside the form
	useOutsideAlerter(formRef, () => {
		if (isEditing) handleFormat();
	});

	const handleFormat = (event) => {
		if (event) event.stopPropagation();
		setIsEditing(false);
		updateUndoStack(parentText);
	};

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handlePaste = async () => {
		try {
			const text = await navigator.clipboard.readText();
			onChange(text);
			setIsEditing(false);
			updateUndoStack(text);
		} catch (err) {
			Logger.error("Failed to read clipboard contents: ", err);
		}
	};

	const handleRepair = () => {
		const currentText = parentText;
		const tune = new ABCNotation(currentText);
		if (tune.fullText !== currentText) {
			if (undoStack.length === 0) {
				const lastValue = undoStack[undoStack.length - 1];
				if (currentText !== lastValue && (currentText || lastValue)) {
					setUndoStack([...undoStack, currentText]);
				}
			}
			onChange(tune.fullText);
		}
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

	undoStack.forEach((item, index) =>
		console.log(`undoStack[${index}].length: ${item.length}`)
	);

	// log length of each stack
	console.log(
		`undoStack: ${undoStack.length} redoStack: ${redoStack.length}`
	);
	// console.log(`undoStack: ${undoStack}`);

	return (
		<div ref={formRef}>
			{/* Toolbar with buttons */}
			<div className="ABCToolBar">
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
						<i className={`bi bi-wrench`}></i>
					</span>
				</Button>
				{/* Copy Button */}
				<Button
					type="button"
					onClick={() => {
						navigator.clipboard.writeText(parentText);
					}}
					disabled={parentText.length === 0}
					title="Copy"
				>
					<span className="icon-square flex-shrink-0">
						<i className={`bi bi-copy`}></i>
					</span>
				</Button>
				{/* Paste Button */}
				<Button type="button" onClick={handlePaste} title="Paste">
					<span className="icon-square flex-shrink-0">
						<i className={`bi bi-clipboard`}></i>
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
					/>
				)}
			</Form>
		</div>
	);
};

export default ABCNotationComponent;
