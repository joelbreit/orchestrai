import React, { useEffect, useState } from "react";
import {
	Button,
	Col,
	Form,
	FormFeedback,
	FormGroup,
	Input,
	Row,
} from "reactstrap";

import ABCBlock from "./ABCBlock";

const ABCInput = ({ parentText, placeholderText, onChange }) => {
	const [previousText, setPreviousText] = useState(parentText);
	const [text, setText] = useState(parentText);

	const [isEditing, setIsEditing] = useState(false);

	const handleCancel = (event) => {
		event.stopPropagation();
		setText(previousText);
		setIsEditing(false);
	};

	const handleSave = (event) => {
		event.stopPropagation();
		setPreviousText(text);
		setIsEditing(false);
		onChange(text);
	};

	const handleEdit = () => {
		setIsEditing(true);
	};

	useEffect(() => {
		setText(parentText);
		setPreviousText(parentText);
	}, [parentText]);

	return (
		<Form onClick={handleEdit} className="mb-4">
			{isEditing ? (
				<FormGroup>
					<Input
						type="textarea"
						value={text}
						onChange={(e) => setText(e.target.value)}
						placeholder={placeholderText}
						// match height of ABCBlock
						style={{ height: `${text.split("\n").length * 25}px` }}
					/>
					<FormFeedback>
						Please enter a valid ABC notation.
					</FormFeedback>
				</FormGroup>
			) : (
				<ABCBlock code={text} />
			)}
			<Row>
				<Col className="d-flex justify-content-end">
					{isEditing && (
						<Button
							type="button"
							onClick={(e) => handleCancel(e)}
							className="secondary-button-outline"
						>
							Cancel
						</Button>
					)}
					<Button
						type="button"
						onClick={(e) =>
							isEditing ? handleSave(e) : handleEdit()
						}
						style={{ marginLeft: "10px" }}
						className="primary-button"
					>
						{isEditing ? "Save" : "Edit"}
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default ABCInput;
