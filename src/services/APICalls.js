import Logger from "./Logger";
import Hash from "./Hash";

const apiUrl = process.env.REACT_APP_API_URL;

export async function Login(email, password) {
	let response = {
		status: "",
		accountId: "",
		username: "",
		displayName: "",
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
				username: body.username,
				displayName: body.displayName,
			};
		} else {
			const error =
				body.error || "/login encountered an unexpected error";
			Logger.error(`/login returned status ${statusCode}:`, error);
			if (statusCode === 401) {
				response = {
					...response,
					status: "Invalid credentials",
				};
			} else if (statusCode === 500) {
				Logger.error(error || "Internal Server Error");
				response = {
					...response,
					status: "Internal Server Error",
				};
			} else {
				response = {
					...response,
					status: "Unrecognized error",
				};
			}
		}
	} catch (error) {
		Logger.error(`Unexpected error logging in:`, error);
		response = {
			...response,
			status: "Unexpected error",
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

export async function CreateAccount(
	accountId,
	email,
	password,
	username,
	displayName,
	emailPreference
) {
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
				username: username,
				displayName: displayName,
				emailPreference: emailPreference,
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
				if (error === "Username already exists.") {
					status = "Username taken";
				} else if (error === "Email already exists.") {
					status = "Email taken";
				}
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
		username: "",
		displayName: "",
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
				username: body.username,
				displayName: body.displayName,
			};
		} else {
			Logger.error(
				"CheckToken returned status",
				statusCode,
				body.message
			);
			if (statusCode === 440) {
				response = {
					...response,
					status: "Expired token",
				};
			} else {
				response = {
					...response,
					status: "Invalid token",
				};
			}
		}
	} catch (error) {
		Logger.error("Error:", error);
	} finally {
		return response;
	}
}

export async function SaveTuneScore(scoreData) {
	let response = {
		statusCode: 0,
		message: "",
	};

	try {
		response = await fetch(`${apiUrl}/SaveTuneScore`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(scoreData),
		});

		// Handle the response
		const body = await response.json();
		const statusCode = response.status;

		if (statusCode === 200) {
			Logger.log("Score added successfully");
			response = {
				statusCode: 200,
				message: "Score added successfully",
			};
		} else {
			const error = body.error || "SaveTuneScore encountered an error";
			Logger.error(`SaveTuneScore returned status ${statusCode}:`, error);
			response = {
				statusCode: statusCode,
				message: error,
			};
		}
	} catch (error) {
		Logger.error(`Unexpected error saving score:`, error);
		response = {
			statusCode: 500,
			message: "Unexpected error",
		};
	} finally {
		return response;
	}
}

// GET /GetCompareTunes
// Returns a JSON object with two tunes to compare
export async function GetCompareTunes() {
	let response = {
		statusCode: 0,
		message: "",
		tune1: {
			tuneId: "",
			title: "",
		},
		tune2: {
			tuneId: "",
			title: "",
		},
	};

	try {
		const apiResponse = await fetch(`${apiUrl}/GetCompareTunes`, {
			method: "GET",
		});

		// Handle the response
		const body = await apiResponse.json();
		const statusCode = apiResponse.status;

		if (statusCode === 200) {
			Logger.log("Tunes retrieved successfully");
			response = {
				statusCode: 200,
				message: "Tunes retrieved successfully",
				tune1: {
					tuneId: body.tune1.tuneId,
					title: body.tune1.title,
				},
				tune2: {
					tuneId: body.tune2.tuneId,
					title: body.tune2.title,
				},
			};
		} else {
			const error = body.error || "GetCompareTunes encountered an error";
			Logger.error(
				`GetCompareTunes returned status ${statusCode}:`,
				error
			);
			response = {
				statusCode: statusCode,
				message: error,
			};
		}
	} catch (error) {
		Logger.error(`Unexpected error retrieving tunes:`, error);
		response = {
			statusCode: 500,
			message: "Unexpected error",
		};
	} finally {
		return response;
	}
}
