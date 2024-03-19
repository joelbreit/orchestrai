import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
	DynamoDBDocumentClient,
	GetCommand,
	QueryCommand,
	ScanCommand,
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
		// Log the incoming event
		console.log(`GetCompareTunes received event: ${JSON.stringify(event)}`);

		// Get all tunes with tuneId-only-index
		// const params = {
		// 	TableName: TUNES_TABLE_NAME,
		// 	IndexName: "tuneId-only-index",
		// 	ProjectionExpression: "tuneId",
		// 	KeyConditionExpression: "tuneId = :tuneId",
		// 	ExpressionAttributeValues: {
		// 		":tuneId": "some value",
		// 	},
		// };

		// console.log(
		// 	`Retrieving tunes with tuneId-only-index and params: ${JSON.stringify(
		// 		params
		// 	)}`
		// );

		// const { Items } = await ddbDocClient.send(new QueryCommand(params));
		const Items = await getAllTuneIds();
		console.log(`Tunes retrieved: ${Items.length} tunes`);

		// If there are less than 2 tunes, return an error
		if (Items.length < 2) {
			console.log("Less than 2 tunes available.");
			return {
				statusCode: 404,
				body: JSON.stringify({ error: "Less than 2 tunes available." }),
			};
		}

		// Pick 2 random tunes
		const tune1 = Items[Math.floor(Math.random() * Items.length)];
		const tune2 = Items[Math.floor(Math.random() * Items.length)];

		// Get the tunes by tuneId
		const tune1Data = await getTuneById(tune1.tuneId);
		const tune2Data = await getTuneById(tune2.tuneId);

		// Don't need to get account details because we are already calling getTuneById which does that
		// Get the user's displayName from the accounts table
		// const account1 = await getAccountById(tune1Data.accountId);
		// const account2 = await getAccountById(tune2Data.accountId);

		// Return success response
		return {
			statusCode: 200,
			body: JSON.stringify({
				tune1: {
					tuneId: tune1Data.tuneId,
					title: tune1Data.title,
					// displayName: account1.displayName || "Unknown",
				},
				tune2: {
					tuneId: tune2Data.tuneId,
					title: tune2Data.title,
					// displayName: account2.displayName || "Unknown",
				},
			}),
		};
	} catch (error) {
		console.error("Error occurred:", error);
		return {
			statusCode: 500,
			body: JSON.stringify({ error: `Internal server error: ${error}` }),
		};
	}
};

// Function to retrieve all tuneIds
async function getAllTuneIds() {
	console.log("Retrieving all tuneIds...");

	const params = {
		TableName: TUNES_TABLE_NAME,
		ProjectionExpression: "tuneId",
	};

	const { Items } = await ddbDocClient.send(new ScanCommand(params));
	console.log(`TuneIds retrieved: ${Items.length} tuneIds`);
	return Items;
}

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
// Path: src/functions/GetCompareTunes.mjs
// Function: OrchestrAI_Get-Compare-Tunes-Function
// Endpoint: GET /GetCompareTunes
