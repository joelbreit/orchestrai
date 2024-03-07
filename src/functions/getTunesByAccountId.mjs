import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

// Initialize DynamoDB Document Client
const client = new DynamoDBClient({ region: "us-east-1" });
const ddbDocClient = DynamoDBDocumentClient.from(client);

console.log("DynamoDB Document Client initialized.");

export const handler = async (event) => {
	try {
		console.log("Received event:", event);

		// Extract accountId from the event
		const { accountId } = JSON.parse(event.body);

		console.log(
			`Processing getTunesByAccountId for accountId: ${accountId}`
		);

		// Query DynamoDB using the accountId
		const params = {
			TableName: "OrchestrAI_Tunes",
			IndexName: "accountId-index", // Replace with your actual index name
			KeyConditionExpression: "accountId = :accountId",
			ExpressionAttributeValues: {
				":accountId": accountId,
			},
			Limit: 25, // Limit to 25 items
		};

		const data = await ddbDocClient.send(new QueryCommand(params));

		// Return the results
		return {
			statusCode: 200,
			body: JSON.stringify(data.Items),
		};
	} catch (error) {
		console.error(error);
		return {
			statusCode: 500,
			body: JSON.stringify({ error: `Internal server error retrieving tunes: ${error}` }),
		};
	}
};
