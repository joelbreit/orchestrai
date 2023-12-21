import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";
// import bcrypt from "bcrypt";

// Initialize DynamoDB Document Client
const client = new DynamoDBClient({ region: "us-east-1" });
const ddbDocClient = DynamoDBDocumentClient.from(client);

console.log("DynamoDB Document Client initialized.");

// Main Lambda Handler
export const handler = async (event) => {
	try {
		console.log("Received event:", event);

		const { email, password } = JSON.parse(event.body);

		console.log(`Processing login for email: ${email}`);

		// Check if account exists and retrieve password hash
		const account = await getAccountByEmail(email);
		if (!account) {
			console.log("Invalid email or password.");
			return {
				statusCode: 401,
				body: JSON.stringify({ error: "Invalid email or password." }),
			};
		}

		// Verify password
		// const validPassword = await bcrypt.compare(password, account.password);
		const validPassword = password === account.password;
		if (!validPassword) {
			console.log("Invalid email or password.");
			return {
				statusCode: 401,
				body: JSON.stringify({ error: "Invalid email or password." }),
			};
		}

		console.log("Login successful.");

		// Return success response
		// Implement token generation or other login success actions here
		return {
			statusCode: 200,
			body: JSON.stringify({
				message: "Login successful",
				accountId: account.accountId,
			}),
		};
	} catch (error) {
		console.error("Error occurred:", error);
		return {
			statusCode: 500,
			body: JSON.stringify({ error: "Internal Server Error" }),
		};
	}
};

// Function to retrieve account by email
async function getAccountByEmail(email) {
	console.log(`Retrieving account by email: ${email}`);

	const params = {
		TableName: "OrchestrAI_Accounts",
		IndexName: "email-index",
		KeyConditionExpression: "email = :email",
		ExpressionAttributeValues: {
			":email": email,
		},
		Limit: 1,
	};

	const { Items } = await ddbDocClient.send(new QueryCommand(params));
	console.log("Account retrieved:", Items.length === 1 ? Items[0] : null);
	return Items.length === 1 ? Items[0] : null;
}
