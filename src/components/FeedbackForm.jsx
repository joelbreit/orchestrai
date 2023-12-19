import React, { useState } from "react";
import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	Row,
	Col,
	Modal,
	ModalHeader,
	ModalBody,
} from "reactstrap";
import Rubric from "./Rubric";

const FeedbackForm = ({ toggleFeedback }) => {
	const [formData, setFormData] = useState({
		grade: "Good",
		notation: "Good",
		melody: "Good",
		description: "Good",
		vibe: "Not Included",
		harmony: "Not Included",
		chords: "Not Included",
		lyrics: "Not Included",
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const [modal, setModal] = useState(false);

	const toggle = () => setModal(!modal);

	const renderDropdowns = (field, isOptional = false) => (
		<FormGroup key={field}>
			<Row>
				<Col xs="8" md="4">
					<Label for={field.toLowerCase()}>{field}</Label>
				</Col>
				<Col xs="4" md="1" className="d-flex justify-content-end">
					<Button
						// id={`Help-Button-${field}`}
						type="button"
						size="sm"
						onClick={toggle}
						className="primary-button help-button"
					>
						?
					</Button>
				</Col>
				<Col xs="12" md="7">
					<Input
						type="select"
						name={field.toLowerCase()}
						id={field.toLowerCase()}
						value={formData[field.toLowerCase()]}
						onChange={handleChange}
					>
						<option value="Impressive">Impressive</option>
						<option value="Good">Good</option>
						<option value="Fine">Fine</option>
						<option value="Poor">Poor</option>
						<option value="Awful">Awful</option>
						{isOptional && (
							<option value="Not Included">Not Included</option>
						)}
					</Input>
				</Col>
			</Row>
		</FormGroup>
	);

	const renderCheckboxes = (field) => (
		<FormGroup key={field}>
			<Row>
				<Col xs="8" md="4">
					<Label for={field.toLowerCase()}>{field}</Label>
				</Col>
				<Col xs="12" md="7">
					<Input
						type="checkbox"
						name={field.toLowerCase()}
						id={field.toLowerCase()}
						value={formData[field.toLowerCase()]}
						onChange={handleChange}
					/>
				</Col>
			</Row>
		</FormGroup>
	);

	return (
		<Form>
			<h4>
				How would you rate these elements?
			</h4>
			{["Grade"].map((field) => renderDropdowns(field))}
			<hr />
			{["Notation", "Melody", "Description"].map((field) =>
				renderDropdowns(field)
			)}
			<hr />
			{["Vibe", "Harmony", "Chords", "Lyrics"].map((field) =>
				renderDropdowns(field, true)
			)}
			<hr />
			<p>
				<strong>Were any of these in the composition?</strong>
			</p>
			{[
				"Lyrics",
				"Conflicting Chords",
				"Percussion",
				"Pickup measures",
			].map((field) => renderCheckboxes(field))}
			{/* <Col className="d-flex justify-content-end">
				<Button
					type="reset"
					className="secondary-button"
					onClick={toggleFeedback}
					style={{ marginRight: "0.5rem" }}
				>
					Cancel
				</Button>
				<Button type="submit" className="primary-button">
					Submit
				</Button>
			</Col> */}

			<Modal
				isOpen={modal}
				toggle={toggle}
				backdrop
				fade
				centered
				scrollable
				size="xl"
				fullscreen="lg"
			>
				<ModalHeader toggle={toggle}>Feedback Rubric</ModalHeader>
				<ModalBody>
					<Rubric />
				</ModalBody>
			</Modal>
		</Form>
	);
};

export default FeedbackForm;
