import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const REGION = "us-east-1";
const TABLE_NAME = "OrchestrAI_UserTokens";

// Initialize DynamoDB Document Client
const client = new DynamoDBClient({ region: REGION });
const ddbDocClient = DynamoDBDocumentClient.from(client);

console.log("DynamoDB Document Client initialized.");

/**
 * Generates a token for the user with the provided accountId
 * @param {Object} event - The event object containing the request details.
 * @param {Object} event.body - The request body.
 * @param {string} event.body.accountId - The account ID to generate a token for.
 * @returns {Object} - The response object with statusCode and body.
 */
export const handler = async (event) => {
	console.log("Event received:", event);

	const { accountId } = JSON.parse(event.body);

	console.log("Parsed accountId:", accountId);

	// Generate the token
	const token = generateUserToken();
	console.log("Generated token:", token);

	// Set expiration date
	const expirationDate = new Date();
	expirationDate.setDate(expirationDate.getDate() + 7);
	console.log("Token expiration date:", expirationDate);

	// Save the token to the database
	const params = {
		TableName: TABLE_NAME,
		Item: {
			accountId: accountId,
			token: token,
		},
	};
	console.log("Put parameters:", params);

	try {
		const command = new PutCommand(params);
		const data = await ddbDocClient.send(command);

		console.log("Put result:", data);

		return {
			statusCode: 200,
			body: JSON.stringify({
				token: token,
				expirationDate: expirationDate.toISOString(),
			}),
		};
	} catch (error) {
		console.error("Error:", error);
		return {
			statusCode: 500,
			body: JSON.stringify({
				error: "Unexpected error generating token",
			}),
		};
	}
};

function generateUserToken() {
	let token = "";
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < 16; i++) {
		token += characters.charAt(
			Math.floor(Math.random() * characters.length)
		);
	}
	return token;
}
