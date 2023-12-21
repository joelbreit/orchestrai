// Import dependencies
import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// Import components
import {
	Alert,
	Button,
	Col,
	Form,
	FormFeedback,
	FormGroup,
	Input,
	Label,
} from "reactstrap";

// Import contexts
import { AppContext } from "../contexts/AppContext";

// Import parameters
import { EMAIL_REGEX, PASSWORD_REGEX } from "../assets/Regex";
const apiUrl = process.env.REACT_APP_API_URL;

const CreateAccountForm = () => {
	// App context
	const { setAppState } = useContext(AppContext);

	// Form fields
	const [accountId, setAccountId] = useState(uuidv4());
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	// Validation state
	const [emailValid, setEmailValid] = useState(null);
	const [passwordValid, setPasswordValid] = useState(null);
	const [confirmPasswordValid, setConfirmPasswordValid] = useState(null);

	// Form state
	const [error, setError] = useState("");

	const validateEmail = (emailInput) => {
		const valid = EMAIL_REGEX.test(emailInput);
		setEmailValid(valid || emailInput === "");
		if (!valid) {
			setError("Please enter a valid email address");
		} else {
			setError("");
		}
	};

	const validatePassword = (passwordInput) => {
		const valid = PASSWORD_REGEX.test(passwordInput);
		setPasswordValid(valid || passwordInput === "");
		if (!valid) {
			setError("Passwords must be at least 8 characters long");
		} else if (passwordInput !== confirmPassword) {
			setConfirmPasswordValid(false);
			setError("Passwords do not match");
		} else {
			setError("");
			setConfirmPasswordValid(true);
		}
	};

	const handleCreateAccount = async (e) => {
		e.preventDefault();
		setError("");

		if (!emailValid || !passwordValid || !confirmPasswordValid) {
			setError("Please correct the errors before submitting");
			return;
		}

		try {
			setAccountId(uuidv4());
			// YYYY-MM-DD
			const creationDate = new Date().toISOString().slice(0, 10);
			console.log("Creating account with accountId: ", accountId);
			const response = await fetch(`${apiUrl}/createAccount`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					accountId: accountId,
					email: email,
					password: password,
					creationDate: creationDate,
				}),
			});

			// Handle the response
			const body = await response.json();
			const statusCode = response.status;

			if (statusCode === 200) {
				console.log("Account created successfully");
				setAppState({
					authenticated: true,
					accountId: accountId,
				});
			} else {
				console.error(
					"Error during account creation: ",
					body.error || statusCode
				);
				setError(
					body.error ||
						"An unexpected error occurred. Please try again."
				);
			}
		} catch (error) {
			console.error("Error:", error);
			setError("An unexpected error occurred. Please try again.");
		}
	};

	return (
		<Form className="p-3" onSubmit={handleCreateAccount}>
			<p>Enter your information below to create an account.</p>

			<FormGroup>
				<Label for="email" md={4}>
					Email
				</Label>
				<Col>
					<Input
						type="email"
						name="email"
						id="email"
						value={email}
						invalid={emailValid === false}
						onBlur={() => validateEmail(email)}
						placeholder="Enter email"
						required
						onChange={(e) => {
							setEmail(e.target.value);
							validateEmail(e.target.value);
						}}
					/>
					<FormFeedback>
						Please enter a valid email address.
					</FormFeedback>
				</Col>
			</FormGroup>

			<FormGroup>
				<Label for="password" md={4}>
					Password
				</Label>
				<Col>
					<Input
						type="password"
						name="password"
						id="password"
						value={password}
						invalid={passwordValid === false}
						onBlur={() => validatePassword(password)}
						placeholder="Enter password"
						required
						onChange={(e) => {
							setPassword(e.target.value);
							validatePassword(e.target.value);
						}}
					/>
					<FormFeedback>
						Passwords must be at least 8 characters long.
					</FormFeedback>
				</Col>
			</FormGroup>

			<FormGroup>
				<Label for="confirmPassword" md={4}>
					Confirm Password
				</Label>
				<Col>
					<Input
						type="password"
						name="confirmPassword"
						id="confirmPassword"
						value={confirmPassword}
						invalid={confirmPasswordValid === false}
						onBlur={() => validatePassword(confirmPassword)}
						placeholder="Confirm password"
						required
						onChange={(e) => {
							setConfirmPassword(e.target.value);
							validatePassword(e.target.value);
						}}
					/>
					<FormFeedback>Passwords do not match.</FormFeedback>
				</Col>
			</FormGroup>

			{error && <Alert color="danger">{error}</Alert>}

			<FormGroup>
				<Col sm={{ size: 4, offset: 8 }}>
					<Button
						type="submit"
						color="primary"
						block
						disabled={
							!email ||
							!password ||
							!confirmPassword ||
							password !== confirmPassword ||
							!!error
						}
					>
						Create Account
					</Button>
				</Col>
			</FormGroup>
		</Form>
	);
};

export default CreateAccountForm;
