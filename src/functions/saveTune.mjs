import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

// Initialize DynamoDB Document Client
const client = new DynamoDBClient({ region: "us-east-1" });
const ddbDocClient = DynamoDBDocumentClient.from(client);

console.log("DynamoDB Document Client initialized.");

// Main Lambda Handler
export const handler = async (event) => {
	try {
		console.log("Received event:", event);

		const {
			tuneId,
			accountId,
			date,
			thread,
			run,
			title,
			prompt,
			description,
			notation,
		} = JSON.parse(event.body);

		// Prepare item to insert
		const newTune = {
			tuneId,
			accountId,
			date,
			thread,
			run,
			title,
			prompt,
			description,
			notation,
		};

		console.log("New tune prepared:", newTune);

		// Insert the new tune
		await createTune(newTune);

		console.log(`Tune for ${accountId} created successfully.`);

		// Return the tuneId
		return { statusCode: 200, body: JSON.stringify({ tuneId }) };
	} catch (error) {
		console.error("Error occurred:", error);
		return {
			statusCode: 500,
			body: JSON.stringify({ error: "Internal Server Error" }),
		};
	}
};

// Function to create a new tune
async function createTune(Tune) {
	console.log("Creating tune:", Tune);

	const params = {
		TableName: "OrchestrAI_Tunes",
		Item: Tune,
	};

	await ddbDocClient.send(new PutCommand(params));
	console.log("Tune created successfully.");
}
