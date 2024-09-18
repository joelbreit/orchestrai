import React, { useRef, useState } from "react";
import { Button, Form, Input } from "reactstrap";
import useOutsideAlerter from "../hooks/useOutsideAlerter";
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
	};

	const handleEdit = () => {
		setIsEditing(true);
	};

	return (
		<div ref={formRef}>
			<Form onClick={handleEdit} className="mb-2 ABCForm">
				{isEditing ? (
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
						<div className="ABCFormButtons">
							<Button
								type="button"
								onClick={handleFormat}
								className="primary-button-outline btn-sm"
							>
								Format{" "}
								<span className="icon-square flex-shrink-0">
									<i className={`bi bi-braces`}></i>
								</span>
							</Button>
						</div>
					</>
				) : (
					<ABCBlock
						code={parentText}
						setCode={onChange}
						onEdit={handleEdit}
					/>
				)}
			</Form>
		</div>
	);
};

export default ABCInput;
