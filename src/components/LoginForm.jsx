// Import dependencies
import React, { useContext, useState } from "react";
import hash from "../services/Hash";
import Logger from "../services/Logger";

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

const LoginForm = () => {
	// App context
	const { setAppState } = useContext(AppContext);

	// Form fields
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// Validation state
	const [emailValid, setEmailValid] = useState(null);
	const [passwordValid, setPasswordValid] = useState(null);

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
		} else {
			setError("");
		}
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		setError("");

		if (!emailValid || !passwordValid) {
			setError("Please correct the errors before submitting");
			return;
		}

		try {
			Logger.log("Attempting to login");
			const hashedPassword = hash(password);
			// Logger.debug("Hashed password: ", hashedPassword);
			const response = await fetch(`${apiUrl}/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password: hashedPassword }),
			});

			// Handle the response
			const body = await response.json();
			const statusCode = response.status;

			if (statusCode === 200) {
				Logger.log("Login successful");
				setAppState({
					authenticated: true,
					accountId: body.accountId,
				});
			} else {
				Logger.error("Login error: ", body.error || statusCode);
				setError(
					body.error ||
						"An unexpected error occurred. Please try again."
				);
			}
		} catch (error) {
			Logger.error("Error:", error);
			setError("An unexpected error occurred. Please try again.");
		}
	};

	return (
		<Form className="p-3" onSubmit={handleLogin}>
			<p>Enter your information below to login.</p>

			<FormGroup>
				<Label for="email">Email</Label>
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
				<Label for="password">Password</Label>
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

			{error && <Alert color="danger">{error}</Alert>}

			<FormGroup>
				<Col sm={{ size: 4, offset: 8 }}>
					<Button
						type="submit"
						color="primary"
						block
						disabled={!email || !password || !!error}
					>
						Login
					</Button>
				</Col>
			</FormGroup>
		</Form>
	);
};

export default LoginForm;
