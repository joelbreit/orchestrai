import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
	DynamoDBDocumentClient,
	QueryCommand,
	GetCommand,
} from "@aws-sdk/lib-dynamodb";

// Initialize DynamoDB Document Client
const client = new DynamoDBClient({ region: "us-east-1" });
const ddbDocClient = DynamoDBDocumentClient.from(client);

const TUNES_TABLE_NAME = "OrchestrAI_Tunes";
const ACCOUNTS_TABLE_NAME = "OrchestrAI_Accounts";

console.log("DynamoDB Document Client initialized.");

// Main Lambda Handler
export const handler = async (event) => {
	try {
		console.log("Received event:", event);

		const { tuneId } = JSON.parse(event.body);

		console.log(`Processing tune retrieval for tuneId: ${tuneId}`);

		// Check if tune exists and retrieve tune
		const tune = await getTuneById(tuneId);
		if (!tune) {
			console.log("Invalid tuneId.");
			return {
				statusCode: 404,
				body: JSON.stringify({ error: "Invalid tuneId." }),
			};
		}

		try {
			// Get the user's displayName from the accounts table
			// Use tune.accountId to retrieve the user's displayName
			const { displayName } = await getAccountById(tune.accountId);
			tune.displayName = displayName;
		} catch (error) {
			console.error("Error occurred:", error);
			return {
				statusCode: 500,
				body: JSON.stringify({
					error: `Internal server error retrieving account: ${error}`,
				}),
			};
		}

		console.log("Tune retrieved successfully.");

		// Return success response
		return {
			statusCode: 200,
			body: JSON.stringify({
				message: "Login successful",
				date: tune.date,
				title: tune.title,
				prompt: tune.prompt,
				description: tune.description,
				notation: tune.notation,
				fixes: tune.fixes,
				warnings: tune.warnings,
				accoutId: tune.accountId,
				displayName: tune.displayName,
			}),
		};
	} catch (error) {
		console.error("Error occurred:", error);
		return {
			statusCode: 500,
			body: JSON.stringify({
				error: `Internal server error retrieving tune: ${error}`,
			}),
		};
	}
};

// Function to retrieve tune by tuneId
async function getTuneById(tuneId) {
	console.log(`Retrieving tune by tuneId: ${tuneId}`);

	const params = {
		TableName: TUNES_TABLE_NAME,
		IndexName: "tuneId-index",
		KeyConditionExpression: "tuneId = :tuneId",
		ExpressionAttributeValues: {
			":tuneId": tuneId,
		},
		Limit: 1,
	};

	const { Items } = await ddbDocClient.send(new QueryCommand(params));
	console.log("Tune retrieved:", Items.length === 1 ? Items[0] : null);
	return Items.length === 1 ? Items[0] : null;
}

// Function to retrieve account by accountId
async function getAccountById(accountId) {
	console.log(`Retrieving account by accountId: ${accountId}`);

	const params = {
		TableName: ACCOUNTS_TABLE_NAME,
		Key: {
			accountId,
		},
	};

	const command = new GetCommand(params);
	const { Item } = await ddbDocClient.send(command);
	console.log("Account retrieved:", Item);
	return Item;
}
// Path: src/functions/getTune.mjs
// Function: OrchestrAI_Get-Tune
// Endpoint: POST /getTune
