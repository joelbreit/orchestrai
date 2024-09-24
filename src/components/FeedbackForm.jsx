import React, { useState, useContext } from "react";
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
	Alert,
	Spinner,
} from "reactstrap";
import Rubric from "./Rubric";
import { SaveTuneScore } from "../services/APICalls";
import GenerateId from "../services/GenerateId";

// Import contexts
import { AppContext } from "../contexts/AppContext";
import Logger from "../services/Logger";
import ProtectedContent from "./ProtectedContent";

const FeedbackForm = ({ toggleFeedback, tuneId }) => {
	const { appState } = useContext(AppContext);

	const [formData, setFormData] = useState({
		overall: "Good",
		notation: "Good",
		melody: "Good",
		description: "Good",
		congruity: "Good",
		harmony: "Good",
		chords: "Good",
		lyrics: "Not Included",
		notes: "",
	});

	const [submissionMessage, setSubmissionMessage] = useState({
		type: "",
		message: "",
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

	// const renderCheckboxes = (field) => (
	// 	<FormGroup key={field}>
	// 		<Row>
	// 			<Col xs="8" md="4">
	// 				<Label for={field.toLowerCase()}>{field}</Label>
	// 			</Col>
	// 			<Col xs="12" md="7">
	// 				<Input
	// 					type="checkbox"
	// 					name={field.toLowerCase()}
	// 					id={field.toLowerCase()}
	// 					value={formData[field.toLowerCase()]}
	// 					onChange={handleChange}
	// 				/>
	// 			</Col>
	// 		</Row>
	// 	</FormGroup>
	// );

	const handleSubmit = async (e) => {
		e.preventDefault();

		setSubmissionMessage({
			type: "Info",
			message: "Submitting feedback...",
		});

		const scoreData = {
			...formData,
			scoreId: GenerateId(),
			tuneId: tuneId,

			accountId: appState.accountId,
		};

		const { statusCode, message } = await SaveTuneScore(scoreData);

		if (statusCode === 200) {
			setSubmissionMessage({
				type: "success",
				message: "Feedback submitted successfully",
			});
		} else {
			setSubmissionMessage({
				type: "danger",
				message: message,
			});

			Logger.error("Error:", message);
		}
	};

	return (
		<ProtectedContent>
			<Form className="mb-3" onSubmit={handleSubmit}>
				<h4>How would you rate these elements?</h4>
				{["Overall Grade"].map((field) => renderDropdowns(field))}
				<hr />
				{[
					"Notation",
					"Melody",
					"Description",
					"Congruity",
					"Harmony",
					"Chords",
				].map((field) => renderDropdowns(field))}
				<hr />
				{["Lyrics"].map((field) => renderDropdowns(field, true))}
				{/* <hr />
			<p>
				<strong>Were any of these in the composition?</strong>
			</p>
			{[
				"Lyrics",
				"Conflicting Chords",
				"Percussion",
				"Pickup measures",
			].map((field) => renderCheckboxes(field))} */}
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
				<hr />
				{/* Notes (optional) */}
				<FormGroup>
					<Label for="notes">Notes</Label>
					<Input
						type="textarea"
						name="notes"
						id="notes"
						value={formData.notes}
						placeholder="Enter notes here"
						onChange={(e) =>
							setFormData({ ...formData, notes: e.target.value })
						}
						maxLength={1000}
					/>
					<span className="character-counter">
						{formData.notes.length}/1000
					</span>
				</FormGroup>

				<Row className="mt-2">
					<Col className="d-flex justify-content-end">
						<Button
							type="reset"
							className="secondary-button"
							onClick={toggleFeedback}
							style={{ marginRight: "0.5rem" }}
						>
							Cancel
						</Button>
						<Button type="submit" className="primary-button">
							Submit{" "}
							{submissionMessage.message ===
								"Submitting feedback..." && (
								<Spinner
									as="span"
									animation="border"
									size="sm"
									role="status"
									aria-hidden="true"
								/>
							)}
						</Button>
					</Col>
				</Row>

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

				{submissionMessage.message && (
					<Alert color={submissionMessage.type} fade className="mt-2">
						{submissionMessage.message}
					</Alert>
				)}
			</Form>
		</ProtectedContent>
	);
};

export default FeedbackForm;
