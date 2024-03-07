import Logger from "./Logger";
import Hash from "./Hash";

const apiUrl = process.env.REACT_APP_API_URL;

export async function Login(email, password) {
	let response = {
		status: "",
		accountId: "",
	};
	try {
		const hashedPassword = Hash(password);
		const apiResponse = await fetch(`${apiUrl}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
				password: hashedPassword,
			}),
		});

		// Handle the response
		const body = await apiResponse.json();
		const statusCode = apiResponse.status;

		if (statusCode === 200) {
			Logger.log("Login successful");
			response = {
				status: "Success",
				accountId: body.accountId,
			};
		} else {
			const error =
				body.error || "/login encountered an unexpected error";
			Logger.error(`/login returned status ${statusCode}:`, error);
			if (statusCode === 401) {
				response = {
					status: "Invalid credentials",
					accountId: "",
				};
			} else if (statusCode === 500) {
				Logger.error(error || "Internal Server Error");
				response = {
					status: "Internal Server Error",
					accountId: "",
				};
			} else {
				response = {
					status: "Unrecognized error",
					accountId: "",
				};
			}
		}
	} catch (error) {
		Logger.error(`Unexpected error logging in:`, error);
		response = {
			status: "Unexpected error",
			accountId: "",
		};
	}
	return response;
}

export async function GenerateToken(accountId) {
	let token = "";

	try {
		const response = await fetch(`${apiUrl}/GenerateToken`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				accountId: accountId,
			}),
		});

		// Handle the response
		const body = await response.json();
		const statusCode = response.status;
		const responseMessage = body.message;

		if (statusCode === 200) {
			Logger.log("Token generated successfully");
			token = body.token;
		} else {
			Logger.error(
				"GenerateToken returned status",
				statusCode,
				responseMessage
			);
		}
	} catch (error) {
		Logger.error("Error:", error);
	} finally {
		return token;
	}
}

export async function UpdateToken(token) {
	let statusCode = 0;

	try {
		const response = await fetch(`${apiUrl}/UpdateToken`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				token: token,
			}),
		});

		// Handle the response
		statusCode = response.status;
		if (statusCode === 200) {
			Logger.log("Token updated successfully");
		} else {
			Logger.error("UpdateToken returned status", statusCode);
		}
	} catch (error) {
		Logger.error("Error:", error);
	} finally {
		return statusCode;
	}
}

export async function CreateAccount(accountId, email, password) {
	let status = "";
	try {
		const nycTime = new Date().toLocaleString("en-US", {
			timeZone: "America/New_York",
			hour12: false,
			hour: "numeric",
			minute: "numeric",
			second: "numeric",
		});
		const dateAndTime = `${new Date()
			.toISOString()
			.slice(0, 10)} ${nycTime}`;
		const hashedPassword = Hash(password);
		const response = await fetch(`${apiUrl}/createAccount`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				accountId: accountId,
				email: email,
				password: hashedPassword,
				creationDate: dateAndTime,
			}),
		});

		// Handle the response
		const body = await response.json();
		const statusCode = response.status;

		if (statusCode === 200) {
			Logger.log("Account created successfully");
			status = "Success";
		} else {
			const error =
				body.error || "/createAccount encountered an unexpected error";
			Logger.error(
				`/createAccount returned status ${statusCode}:`,
				error
			);
			if (statusCode === 403) {
				status = "Email taken";
			} else if (statusCode === 500) {
				Logger.error(error || "Internal Server Error");
				status = "Internal Server Error";
			} else {
				status = "Unrecognized error";
			}
		}
	} catch (error) {
		Logger.error(`Unexpected error creating account:`, error);
		status = "Unexpected error";
	}
	return status;
}

export async function CheckToken(token) {
	let response = {
		status: "",
		accountId: "",
		email: "",
	};

	try {
		const apiResponse = await fetch(`${apiUrl}/CheckToken`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				token: token,
			}),
		});

		// Handle the response
		const body = await apiResponse.json();
		const statusCode = apiResponse.status;

		if (statusCode === 200) {
			Logger.log("Token is valid");
			response = {
				status: "Success",
				accountId: body.accountId,
				email: body.email,
			};
		} else {
			Logger.error(
				"CheckToken returned status",
				statusCode,
				body.message
			);
			if (statusCode === 440) {
				response = {
					status: "Token expired",
					accountId: "",
					email: "",
				};
			} else {
				response = {
					status: "Invalid token",
					accountId: "",
					email: "",
				};
			}
		}
	} catch (error) {
		Logger.error("Error:", error);
	} finally {
		return response;
	}
}