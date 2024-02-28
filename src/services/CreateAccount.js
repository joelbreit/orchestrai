const clientId = process.env.REACT_APP_COGNITO_CLIENT_ID;
const region = process.env.REACT_APP_AWS_REGION;

const createAccount = async (email, password) => {
	console.debug("Region:", region);
	const signUpData = {
		ClientId: clientId,
		Username: email,
		Password: password,
		UserAttributes: [
			{
				Name: "email",
				Value: email,
			},
		],
	};

	try {
		const response = await fetch(
			`https://cognito-idp.${region}.amazonaws.com/`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-amz-json-1.1",
					"X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp",
				},
				body: JSON.stringify(signUpData),
			}
		);

		if (!response.ok) {
			// Handle HTTP errors
			const text = await response.text();
			console.log("Response body:", text);
			throw new Error(`HTTP error! status: ${response.status}`);
		} else {
			const data = await response.json();
			console.log("Sign up successful:", data);
			// Handle success response
			// Typically, you might want to inform the user that a confirmation code has been sent to their email
		}
	} catch (error) {
		console.error("Sign up error:", error);
		// Handle errors (e.g., network error, sign-up constraints failed)
	}
};

// Example usage:
createAccount("user@example.com", "Password123!").catch(console.error);
