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
import GenerateId from "../services/GenerateId";
import {
	GenerateToken,
	UpdateToken,
	CreateAccount,
} from "../services/APICalls";

const CreateAccountForm = () => {
	// App context
	const { setAppState } = useContext(AppContext);

	// Form fields
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	// Validation state
	const [feedback, setFeedback] = useState({
		email: "",
		password: "",
		confirmPassword: "",
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
		if (feedback.confirmPassword === "Passwords do not match") {
			if (passwordInput === confirmPassword) {
				setFeedback({
					...feedback,
					password: "",
					confirmPassword: "",
				});
			}
		}
		setPassword(passwordInput);
	};

	const handleConfirmPasswordChange = (confirmPasswordInput) => {
		setError("");
		setFeedback({
			...feedback,
			confirmPassword: "",
		});
		if (confirmPasswordInput.length > Password.MaxLength) {
			setFeedback({
				...feedback,
				confirmPassword: Password.MaxLengthFeedback,
			});
		}
		if (Password.InvalidCharacterRegex.test(confirmPasswordInput)) {
			setFeedback({
				...feedback,
				confirmPassword: Password.InvalidCharacterFeedback,
			});
		}
		if (feedback.password === "Passwords do not match") {
			if (password === confirmPasswordInput) {
				setFeedback({
					...feedback,
					password: "",
					confirmPassword: "",
				});
			}
		}
		setConfirmPassword(confirmPasswordInput);
	};

	const handleCreateAccount = async (e) => {
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
		if (confirmPassword.length < Password.MinLength) {
			setFeedback({
				...feedback,
				confirmPassword: Password.MinLengthFeedback,
			});
			return;
		}
		if (password !== confirmPassword) {
			setFeedback({
				...feedback,
				password: "Passwords do not match",
				confirmPassword: "Passwords do not match",
			});
			return;
		}

		setLoading(true);

		const accountId = GenerateId();

		const status = await CreateAccount(accountId, email, password);
		setLoading(false);
		if (status === "Success") {
			setAppState({
				authenticated: true,
				accountId: accountId,
				email: email,
			});
			let UserToken = localStorage.getItem("userToken");
			if (UserToken) {
				const statusCode = await UpdateToken(UserToken);
				if (statusCode !== 200) {
					Logger.warn("Failed to generate token");
				}
			} else {
				const userToken = await GenerateToken(accountId);
				localStorage.setItem("userToken", userToken);
			}
		} else if (status === "Email taken") {
			setFeedback({
				...feedback,
				email: `A user with the email "${email}" already exists. Please login instead or try a different email.`,
			});
		} else {
			setError("An unexpected error occurred. Please try again.");
		}
	};

	return (
		<Form className="p-3" onSubmit={handleCreateAccount}>
			<p>Enter your information below to create an account.</p>

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
					</UncontrolledTooltip>
				</Label>
				<Col>
					<Input
						type="text"
						name="email"
						id="email"
						value={email}
						invalid={feedback.email !== ""}
						placeholder="Enter email"
						required
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
						onChange={(e) => {
							handlePasswordChange(e.target.value);
						}}
					/>
					<FormFeedback>{feedback.password}</FormFeedback>
				</Col>
			</FormGroup>

			<FormGroup>
				<Label for="confirmPassword">
					Confirm Password{" "}
					<span className="icon-square flex-shrink-0">
						<i
							id="confirmPasswordTooltip"
							className={`bi bi-info-circle`}
						/>
					</span>
					<UncontrolledTooltip
						placement="right"
						target="confirmPasswordTooltip"
					>
						{Password.Tooltip}
					</UncontrolledTooltip>
				</Label>
				<Col>
					<Input
						type="password"
						name="confirmPassword"
						id="confirmPassword"
						value={confirmPassword}
						invalid={feedback.confirmPassword !== ""}
						placeholder="Confirm password"
						required
						onChange={(e) => {
							handleConfirmPasswordChange(e.target.value);
						}}
					/>
					<FormFeedback>{feedback.confirmPassword}</FormFeedback>
				</Col>
			</FormGroup>

			{error && (
				<Alert color="danger" fade>
					{error}
				</Alert>
			)}

			<FormGroup>
				<Col sm={{ size: 5, offset: 7 }}>
					<Button
						type="submit"
						color="primary"
						className="primary-button"
						block
						disabled={
							!email || !password || !confirmPassword || loading
						}
					>
						Create Account{" "}
						{loading && <Spinner size="sm" color="light" />}
					</Button>
				</Col>
			</FormGroup>
		</Form>
	);
};

export default CreateAccountForm;
