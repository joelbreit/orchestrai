import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const REGION = "us-east-1";
const TOKENS_TABLE = "OrchestrAI_UserTokens";
const ACCOUNTS_TABLE = "OrchestrAI_Accounts";

// Initialize DynamoDB Document Client
const client = new DynamoDBClient({ region: REGION });
const ddbDocClient = DynamoDBDocumentClient.from(client);

console.log("DynamoDB Document Client initialized.");

/**
 * Verifies that the provided token is valid and has not expired.
 * @param {Object} event - The event object containing the request details.
 * @param {Object} event.body - The request body.
 * @param {string} event.body.token - The token to update.
 * @returns {Object} - The response object with statusCode and body.
 * @returns {number} response.statusCode - The status code of the response.
 * @returns {Object} response.body - The body of the response.
 * @returns {string} response.body.accountId - The account ID associated with the token.
 * @returns {string} response.body.expirationDate - The expiration date of the token.
 * @returns {string} response.body.email - The email associated with the token's account.
 */
export const handler = async (event) => {
	try {
		console.log("Event received:", event);

		const { token } = JSON.parse(event.body);

		console.log("Parsed token:", token);

		// Check if token exists
		const tokenData = await getTableEntryById(TOKENS_TABLE, "token", token);
		if (!tokenData) {
			console.log("Invalid token.");
			return {
				statusCode: 401,
				body: JSON.stringify({
					error: "Invalid token.",
				}),
			};
		}

		console.log("Token data:", tokenData);

		// Check if token has expired
		const expirationDate = new Date(tokenData.expirationDate);
		if (expirationDate < new Date()) {
			console.log("Token expired.");
			return {
				statusCode: 440,
				body: JSON.stringify({
					error: "Token expired.",
				}),
			};
		}

		// Retrieve email from account ID
		const account = await getTableEntryById(
			ACCOUNTS_TABLE,
			"accountId",
			tokenData.accountId
		);
		if (!account) {
			console.log("Account not found.");
			return {
				statusCode: 404,
				body: JSON.stringify({
					error: "Account not found.",
				}),
			};
		}

		console.log("Account:", account);

		return {
			statusCode: 200,
			body: JSON.stringify({
				accountId: tokenData.accountId,
				expirationDate: tokenData.expirationDate,
				email: account.email,
				username: account.username,
				displayName: account.displayName,
			}),
		};
	} catch (error) {
		console.error("Error:", error);
		return {
			statusCode: 500,
			body: JSON.stringify({
				error: `Internal server error verifying token: ${error}`,
			}),
		};
	}
};

/**
 * Retrieves a data entry from a DynamoDB table by its ID.
 * @param {string} tableName - The name of the table to retrieve the entry from.
 * @param {string} id - The ID of the entry to retrieve.
 * @returns {Object} - The entry data.
 */
async function getTableEntryById(tableName, fieldName, id) {
	const params = {
		TableName: tableName,
		Key: {
			[fieldName]: id,
		},
	};

	console.log("Get parameters:", params);

	try {
		const command = new GetCommand(params);
		const { Item } = await ddbDocClient.send(command);

		console.log("Get result:", Item);

		if (!Item) {
			return null;
		}

		return Item;
	} catch (error) {
		console.error("Error:", error);
		return null;
	}
}
// Path: src/functions/CheckToken.mjs
// Function: OrchestrAI_Check-Token
// Endpoint: POST /CheckToken
