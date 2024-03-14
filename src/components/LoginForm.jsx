// Import dependencies
import React, { useContext, useState } from "react";
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
	Spinner,
	UncontrolledTooltip,
} from "reactstrap";

// Import contexts
import { AppContext } from "../contexts/AppContext";

// Import parameters
import { Email, Password } from "../assets/Validation";
import { GenerateToken, UpdateToken, Login } from "../services/APICalls";

const LoginForm = ({ redirect }) => {
	// App context
	const { setAppState } = useContext(AppContext);

	// Form fields
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// Validation state
	const [feedback, setFeedback] = useState({
		email: "",
		password: "",
	});

	// Form state
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleEmailChange = (emailInput) => {
		setError("");
		setFeedback({
			...feedback,
			email: "",
		});
		if (emailInput.length > Email.MaxLength) {
			setFeedback({
				...feedback,
				email: Email.MaxLengthFeedback,
			});
		}
		if (Email.InvalidCharacterRegex.test(emailInput)) {
			setFeedback({
				...feedback,
				email: Email.InvalidCharacterFeedback,
			});
		}
		setEmail(emailInput);
	};

	const handlePasswordChange = (passwordInput) => {
		setError("");
		setFeedback({
			...feedback,
			password: "",
		});
		if (passwordInput.length > Password.MaxLength) {
			setFeedback({
				...feedback,
				password: Password.MaxLengthFeedback,
			});
		}
		if (Password.InvalidCharacterRegex.test(passwordInput)) {
			setFeedback({
				...feedback,
				password: Password.InvalidCharacterFeedback,
			});
		}
		setPassword(passwordInput);
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		setError("");

		if (email.length < Email.MinLength) {
			setFeedback({
				...feedback,
				email: Email.MinLengthFeedback,
			});
			return;
		}
		if (password.length < Password.MinLength) {
			setFeedback({
				...feedback,
				password: Password.MinLengthFeedback,
			});
			return;
		}

		setLoading(true);

		const { status, accountId, username, displayName } = await Login(
			email,
			password
		);
		setLoading(false);
		if (status === "Success") {
			setAppState({
				authenticated: true,
				accountId: accountId,
				email: email,
				username: username,
				displayName: displayName,
			});
			if (redirect) {
				redirect();
			}
			let UserToken = localStorage.getItem("OrchestrAIToken");
			if (UserToken) {
				const statusCode = await UpdateToken(UserToken);
				if (statusCode !== 200) {
					Logger.warn("Failed to generate token");
				}
			} else {
				const userToken = await GenerateToken(accountId);
				localStorage.setItem("OrchestrAIToken", userToken);
			}
		} else if (status === "Invalid credentials") {
			setError("Invalid credentials. Please try again.");
		} else {
			setError("An unexpected error occurred. Please try again.");
		}
	};

	return (
		<Form className="px-3" onSubmit={handleLogin}>
			<FormGroup>
				<Label for="email">
					Email{" "}
					<span className="icon-square flex-shrink-0">
						<i id="emailTooltip" className={`bi bi-info-circle`} />
					</span>
					<UncontrolledTooltip
						placement="right"
						target="emailTooltip"
					>
						{Email.Tooltip}
						underscores
					</UncontrolledTooltip>
				</Label>
				<Col>
					<Input
						type="email"
						name="email"
						id="email"
						value={email}
						invalid={feedback.email !== ""}
						placeholder="Enter email"
						required
						autoComplete="username"
						onChange={(e) => {
							handleEmailChange(e.target.value);
						}}
					/>
					<FormFeedback>{feedback.email}</FormFeedback>
				</Col>
			</FormGroup>

			<FormGroup>
				<Label for="password">
					Password{" "}
					<span className="icon-square flex-shrink-0">
						<i
							id="passwordTooltip"
							className={`bi bi-info-circle`}
						/>
					</span>
					<UncontrolledTooltip
						placement="right"
						target="passwordTooltip"
					>
						{Password.Tooltip}
					</UncontrolledTooltip>
				</Label>
				<Col>
					<Input
						type="password"
						name="password"
						id="password"
						value={password}
						invalid={feedback.password !== ""}
						placeholder="Enter password"
						required
						autoComplete="current-password"
						onChange={(e) => {
							handlePasswordChange(e.target.value);
						}}
					/>
					<FormFeedback>{feedback.password}</FormFeedback>
				</Col>
			</FormGroup>

			{error && (
				<Alert color="danger" fade>
					{error}
				</Alert>
			)}

			<FormGroup>
				<Col sm={{ size: 4, offset: 8 }}>
					<Button
						type="submit"
						color="primary"
						className="primary-button"
						block
						disabled={!email || !password || loading}
					>
						Login {loading && <Spinner size="sm" color="light" />}
					</Button>
				</Col>
			</FormGroup>
		</Form>
	);
};

export default LoginForm;
