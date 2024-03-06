import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
	DynamoDBDocumentClient,
	GetCommand,
	PutCommand,
} from "@aws-sdk/lib-dynamodb";

const REGION = "us-east-1";
const TABLE_NAME = "OrchestrAI_UserTokens";

// Initialize DynamoDB Document Client
const client = new DynamoDBClient({ region: REGION });
const ddbDocClient = DynamoDBDocumentClient.from(client);

console.log("DynamoDB Document Client initialized.");

/**
 * Updates the expiration date of the token for the user with the provided accountId
 * @param {Object} event - The event object containing the request details.
 * @param {Object} event.body - The request body.
 * @param {string} event.body.token - The token to update.
 * @returns {Object} - The response object with statusCode and body.
 */
export const handler = async (event) => {
	try {
		console.log("Event received:", event);

		const { token } = JSON.parse(event.body);

		console.log("Parsed token:", token);

		// Check if token exists and is not expired
		const tokenData = await getTokenData(token);
		if (!tokenData) {
			console.log("Token not found.");
			return {
				statusCode: 404,
				body: JSON.stringify({
					error: "Token not found.",
				}),
			};
		}

		console.log("Token data:", tokenData);

		const expirationDate = new Date();
		expirationDate.setHours(expirationDate.getHours() + 1);
		await updateToken(token, expirationDate.toISOString());

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: "Token updated successfully.",
			}),
		};
	} catch (error) {
		console.error("Error:", error);
		return {
			statusCode: 500,
			body: JSON.stringify({
				error: "Internal server error.",
			}),
		};
	}
};

async function getTokenData(token) {
	const params = {
		TableName: TABLE_NAME,
		Key: {
			token: token,
		},
	};
	const command = new GetCommand(params);
	const { Item } = await ddbDocClient.send(command);

	console.log("Get result:", Item);
	return Item;
}

async function updateToken(token, expirationDate) {
	const params = {
		TableName: TABLE_NAME,
		Item: {
			token: token,
			expirationDate: expirationDate,
		},
	};
	const command = new PutCommand(params);
	const data = await ddbDocClient.send(command);

	console.log("Put result:", data);
}
