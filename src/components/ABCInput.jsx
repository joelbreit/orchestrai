import React, { useRef, useState } from "react";
import { Button, Form, FormFeedback, FormGroup, Input } from "reactstrap";
import useOutsideAlerter from "../hooks/useOutsideAlerter";
import Logger from "../services/Logger";
import ABCBlock from "./ABCBlock";

const ABCInput = ({ parentText, placeholderText, onChange }) => {
	const [isEditing, setIsEditing] = useState(false);
	const formRef = useRef(null); // Reference to the form wrapper

	// Custom hook to detect clicks outside the form
	useOutsideAlerter(formRef, () => {
		if (isEditing) handleFormat();
	});

	const handleFormat = (event) => {
		if (event) event.stopPropagation();
		setIsEditing(false);
		Logger.debug("Exiting edit mode", parentText);
		// No need to call onChange here if no changes are made
	};

	const handleEdit = () => {
		setIsEditing(true);
	};

	return (
		<div ref={formRef}>
			<Form onClick={handleEdit} className="mb-4 ABCForm">
				{isEditing ? (
					<FormGroup>
						<Input
							type="textarea"
							value={parentText}
							onChange={(e) => onChange(e.target.value)}
							placeholder={placeholderText}
							style={{
								height: `${
									parentText.split("\n").length * 23
								}px`,
							}}
							className="ABCInput"
						/>
						<FormFeedback>
							Please enter a valid ABC notation.
						</FormFeedback>
						<Button
							type="button"
							onClick={handleFormat}
							className="primary-button ABCFormButton"
						>
							Format{" "}
							<span className="icon-square flex-shrink-0">
								<i className={`bi bi-braces`}></i>
							</span>
						</Button>
					</FormGroup>
				) : (
					<ABCBlock code={parentText} />
				)}
			</Form>
		</div>
	);
};

export default ABCInput;
