const clientId = process.env.REACT_APP_COGNITO_CLIENT_ID;
const region = process.env.REACT_APP_AWS_REGION;

const login = async (username, password) => {

	const authData = {
		ClientId: clientId,
		AuthFlow: "USER_PASSWORD_AUTH",
		AuthParameters: {
			USERNAME: username,
			PASSWORD: password,
		},
	};

	const response = await fetch(
		`https://cognito-idp.${region}.amazonaws.com`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/x-amz-json-1.1",
				"X-Amz-Target":
					"AWSCognitoIdentityProviderService.InitiateAuth",
			},
			body: JSON.stringify(authData),
		}
	);

	if (!response.ok) {
		const text = await response.text();
		console.log("Response body:", text);
		throw new Error("Failed to sign in");
	}

	const data = await response.json();
	console.log("Authentication data:", data);

	// Use the tokens as needed (e.g., save them to local storage)
	const accessToken = data.AuthenticationResult.AccessToken;
	console.log("Access token:", accessToken);
};

// Usage
login("user@example.com", "Password123!").catch(console.error);
