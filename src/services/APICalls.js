import { hash } from "./HelperFunctions";

const apiUrl = process.env.REACT_APP_API_URL;

export async function login(username, password) {
	let response = {
		status: "",
		accountId: "",
	};
	try {
		const hashedPassword = hash(password);
		const apiResponse = await fetch(`${apiUrl}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username,
				password: hashedPassword,
			}),
		});

		// Handle the response
		const body = await apiResponse.json();
		const statusCode = apiResponse.status;

		if (statusCode === 200) {
			console.log("Login successful");
			response = {
				status: "Success",
				accountId: body.accountId,
			};
		} else {
			const error =
				body.error || "/login encountered an unexpected error";
			console.error(`/login returned status ${statusCode}:`, error);
			if (statusCode === 401) {
				response = {
					status: "Invalid credentials",
					accountId: "",
				};
			} else if (statusCode === 500) {
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
		console.error(`Unexpected error logging in:`, error);
		response = {
			status: "Unexpected error",
			accountId: "",
		};
	}
	return response;
}