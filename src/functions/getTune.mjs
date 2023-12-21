import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

// Initialize DynamoDB Document Client
const client = new DynamoDBClient({ region: "us-east-1" });
const ddbDocClient = DynamoDBDocumentClient.from(client);

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

// Function to retrieve tune by tuneId
async function getTuneById(tuneId) {
	console.log(`Retrieving tune by tuneId: ${tuneId}`);

	const params = {
		TableName: "OrchestrAI_Tunes",
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
