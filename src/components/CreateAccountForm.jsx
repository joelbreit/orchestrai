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
	Row,
	Spinner,
	UncontrolledTooltip,
} from "reactstrap";

// Import contexts
import { AppContext } from "../contexts/AppContext";

// Import parameters
import { Email, Password, Username, DisplayName } from "../assets/Validation";
import GenerateId from "../services/GenerateId";
import {
	GenerateToken,
	UpdateToken,
	CreateAccount,
} from "../services/APICalls";

const CreateAccountForm = ({ redirect }) => {
	// App context
	const { setAppState } = useContext(AppContext);

	// Form fields
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [username, setUsername] = useState("");
	const [displayName, setDisplayName] = useState("");
	const [emailPreference, setEmailPreference] = useState("critical");

	const [usernameEdited, setUsernameEdited] = useState(false);
	const [displayNameEdited, setDisplayNameEdited] = useState(false);

	// Validation state
	const [feedback, setFeedback] = useState({
		email: "",
		password: "",
		confirmPassword: "",
		username: "",
		displayName: "",
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

	const handleUsernameChange = (usernameInput) => {
		setError("");
		setFeedback({
			...feedback,
			username: "",
		});
		if (usernameInput.length > Username.MaxLength) {
			setFeedback({
				...feedback,
				username: Username.MaxLengthFeedback,
			});
		}
		if (Username.InvalidCharacterRegex.test(usernameInput)) {
			setFeedback({
				...feedback,
				username: Username.InvalidCharacterFeedback,
			});
		}
		setUsername(usernameInput);
		setUsernameEdited(true);
	};

	const handleDisplayNameChange = (displayNameInput) => {
		setError("");
		setFeedback({
			...feedback,
			displayName: "",
		});
		if (displayNameInput.length > DisplayName.MaxLength) {
			setFeedback({
				...feedback,
				displayName: DisplayName.MaxLengthFeedback,
			});
		}
		if (DisplayName.InvalidCharacterRegex.test(displayNameInput)) {
			setFeedback({
				...feedback,
				displayName: DisplayName.InvalidCharacterFeedback,
			});
		}
		setDisplayName(displayNameInput);
		setDisplayNameEdited(true);
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
		if (username.length < Username.MinLength) {
			setFeedback({
				...feedback,
				username: Username.MinLengthFeedback,
			});
			return;
		}
		if (displayName.length < DisplayName.MinLength) {
			setFeedback({
				...feedback,
				displayName: DisplayName.MinLengthFeedback,
			});
			return;
		}

		setLoading(true);

		const accountId = GenerateId();

		const status = await CreateAccount(
			accountId,
			email,
			password,
			username,
			displayName,
			emailPreference
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
			let existingToken = localStorage.getItem("OrchestrAIToken");
			if (existingToken) {
				const statusCode = await UpdateToken(existingToken);
				if (statusCode !== 200) {
					Logger.warn("Failed to generate token");
				}
			} else {
				const generatedToken = await GenerateToken(accountId);
				localStorage.setItem("OrchestrAIToken", generatedToken);
				Logger.debug(`Token generated: ${generatedToken}`);
			}
			if (redirect) {
				redirect();
			}
		} else if (status === "Email taken") {
			setFeedback({
				...feedback,
				email: `A user with the email "${email}" already exists. Please login instead or try a different email.`,
			});
		} else if (status === "Username taken") {
			setFeedback({
				...feedback,
				username: `The username "${username}" is already taken. Please try a different username.`,
			});
		} else {
			setError("An unexpected error occurred. Please try again.");
		}
	};

	return (
		<Form className="px-3" onSubmit={handleCreateAccount}>
			<p className="text-muted" style={{ fontStyle: "italic" }}>
				Accounts are free, and they allow you to use all of our
				features.
			</p>
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
						autoComplete="username"
						onChange={(e) => {
							handleEmailChange(e.target.value);
						}}
					/>
					<FormFeedback>{feedback.email}</FormFeedback>
				</Col>
			</FormGroup>
			
			<Row>
				<Col>
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
								autoComplete="new-password"
								onChange={(e) => {
									handlePasswordChange(e.target.value);
								}}
							/>
							<FormFeedback>{feedback.password}</FormFeedback>
						</Col>
					</FormGroup>
				</Col>
				<Col>
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
								autoComplete="new-password"
								onChange={(e) => {
									handleConfirmPasswordChange(e.target.value);
								}}
							/>
							<FormFeedback>
								{feedback.confirmPassword}
							</FormFeedback>
						</Col>
					</FormGroup>
				</Col>
			</Row>

			<FormGroup>
				<Label for="username">
					Username{" "}
					<span className="icon-square flex-shrink-0">
						<i
							id="usernameTooltip"
							className={`bi bi-info-circle`}
						/>
					</span>
					<UncontrolledTooltip
						placement="right"
						target="usernameTooltip"
					>
						{Username.Tooltip}
					</UncontrolledTooltip>
				</Label>
				<Col>
					<Input
						type="text"
						name="username"
						id="username"
						value={username}
						invalid={feedback.username !== ""}
						placeholder="Enter username"
						required
						autoComplete="username"
						onChange={(e) => {
							handleUsernameChange(e.target.value);
						}}
					/>
					<FormFeedback>{feedback.username}</FormFeedback>
				</Col>
			</FormGroup>

			<FormGroup>
				<Label for="displayName">
					Display Name{" "}
					<span className="icon-square flex-shrink-0">
						<i
							id="displayNameTooltip"
							className={`bi bi-info-circle`}
						/>
					</span>
					<UncontrolledTooltip
						placement="right"
						target="displayNameTooltip"
					>
						{DisplayName.Tooltip}
					</UncontrolledTooltip>
				</Label>
				<Col>
					<Input
						type="text"
						name="displayName"
						id="displayName"
						value={displayName}
						invalid={feedback.displayName !== ""}
						placeholder="Enter display name"
						required
						autoComplete="name"
						onChange={(e) => {
							handleDisplayNameChange(e.target.value);
						}}
					/>
					<FormFeedback>{feedback.displayName}</FormFeedback>
				</Col>
			</FormGroup>

			<FormGroup tag="fieldset">
				<Label>Email Preferences</Label>
				<FormGroup check>
					<Label check>
						<Input
							type="radio"
							name="emailPreference"
							value="critical"
							checked={emailPreference === "critical"}
							onChange={(e) => setEmailPreference(e.target.value)}
						/>
						<small>
							{" "}
							Only send address confirmation, password reset, and
							<i> critical</i> update emails
						</small>
					</Label>
				</FormGroup>
				<FormGroup check>
					<Label check>
						<Input
							type="radio"
							name="emailPreference"
							value="never"
							checked={emailPreference === "never"}
							onChange={(e) => setEmailPreference(e.target.value)}
						/>
						<small> Literally never email me</small>
					</Label>
				</FormGroup>
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
							!email || !password || !confirmPassword || loading || !username || !displayName
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
