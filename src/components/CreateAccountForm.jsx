// Import dependencies
import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// Import components
import {
	Alert,
	Button,
	Col,
	Form,
	FormGroup,
	Label,
	Row,
	Input,
	InputGroup,
	InputGroupText,
	FormFeedback,
} from "reactstrap";

// Import contexts
import { AppContext } from "../contexts/AppContext";

// Import parameters
import {
	EMAIL_REGEX,
	PASSWORD_REGEX,
	USERNAME_REGEX,
	ACCOUNTNAME_REGEX,
} from "../assets/Regex";
const apiUrl = process.env.REACT_APP_API_URL;

const CreateAccountForm = () => {
	// App context
	const { setAppState } = useContext(AppContext);

	// Form fields
	const [UUID, setUUID] = useState(uuidv4());
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [accountName, setAccountName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	// Validation state
	const [emailValid, setEmailValid] = useState(null);
	const [usernameValid, setUsernameValid] = useState(null);
	const [accountNameValid, setAccountNameValid] = useState(null);
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

	const validateUsername = (usernameInput) => {
		const valid = USERNAME_REGEX.test(usernameInput);
		setUsernameValid(valid || usernameInput === "");	
		if (!valid) {
			setError(
				"Usernames can only contain letters, numbers, dashes, and underscores"
			);
		} else {
			setError("");
		}
	};

	const validateAccountName = (accountNameInput) => {
		const valid = ACCOUNTNAME_REGEX.test(accountNameInput);
		setAccountNameValid(valid || accountNameInput === "");
		if (!valid) {
			setError(
				"Account names can only contain letters, numbers, dashes, underscores, and spaces"
			);
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

		if (
			!emailValid ||
			!usernameValid ||
			!accountNameValid ||
			!passwordValid ||
			!confirmPasswordValid
		) {
			setError("Please correct the errors before submitting");
			return;
		}

		try {
			setUUID(uuidv4());
			// YYYY-MM-DD in Estern Time
			const creationDate = new Date()
				.toLocaleString("en-US", { timeZone: "America/New_York" })
				.split(",")[0];
			console.log("Creating account with UUID: ", UUID);
			const response = await fetch(`${apiUrl}/createAccount`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					UUID: UUID,
					email: email,
					username: username,
					accountName: accountName,
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
					username: username,
					UUID: UUID,
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
				<Row>
					<Col xs="12" md="4">
						<Label for="email" md={4}>
							Email
						</Label>
					</Col>
					<Col xs="12" md="8">
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
				</Row>
			</FormGroup>

			<FormGroup>
				<Row>
					<Col xs="12" md="4">
						<Label for="username" md={4}>
							Username
						</Label>
					</Col>
					<Col xs="12" md="8">
						<InputGroup>
							<InputGroupText>@</InputGroupText>
							<Input
								type="text"
								name="username"
								id="username"
								value={username}
								invalid={usernameValid === false}
								onBlur={() => validateUsername(username)}
								placeholder="Enter username"
								required
								onChange={(e) => {
									setUsername(e.target.value);
									validateUsername(e.target.value);
								}}
							/>
							<FormFeedback>
								Usernames can only contain letters, numbers,
								dashes, and underscores.
							</FormFeedback>
						</InputGroup>
					</Col>
				</Row>
			</FormGroup>

			<FormGroup>
				<Row>
					<Col xs="12" md="4">
						<Label for="accountName" md={4}>
							Account Name
						</Label>
					</Col>
					<Col xs="12" md="8">
						<Input
							type="text"
							name="accountName"
							id="accountName"
							value={accountName}
							invalid={accountNameValid === false}
							onBlur={() => validateAccountName(accountName)}
							placeholder="Enter account name"
							required
							onChange={(e) => {
								setAccountName(e.target.value);
								validateAccountName(e.target.value);
							}}
						/>
						<FormFeedback>
							Account names can only contain letters, numbers,
							dashes, underscores, and spaces.
						</FormFeedback>
					</Col>
				</Row>
			</FormGroup>

			<FormGroup>
				<Row>
					<Col xs="12" md="4">
						<Label for="password" md={4}>
							Password
						</Label>
					</Col>
					<Col xs="12" md="8">
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
				</Row>
			</FormGroup>

			<FormGroup>
				<Row>
					<Col xs="12" md="4">
						<Label for="confirmPassword" md={4}>
							Confirm Password
						</Label>
					</Col>
					<Col xs="12" md="8">
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
				</Row>
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
							!username ||
							!accountName ||
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
