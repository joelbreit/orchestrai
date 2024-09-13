import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
	DynamoDBDocumentClient,
	UpdateCommand,
	GetCommand,
	PutCommand,
} from "@aws-sdk/lib-dynamodb";

const REGION = "us-east-1";
const TUNES_TABLE = "OrchestrAI_Tunes";
const COMPARISONS_TABLE = "OrchestrAI_TuneComparisons";

// Initialize DynamoDB Document Client
const client = new DynamoDBClient({ region: REGION });
const ddbDocClient = DynamoDBDocumentClient.from(client);

const prior = 0.2;

console.log("DynamoDB Document Client initialized.");

export const handler = async (event) => {
	try {
		console.log("Event:", JSON.stringify(event, null, 2));

		// Accept winner and loser tune IDs from the request body
		const { winnerId, loserId } = JSON.parse(event.body);

		// Get the winner and loser tunes from the database
		let winner = await getTableEntryById(
			COMPARISONS_TABLE,
			"tuneId",
			winnerId
		);
		let loser = await getTableEntryById(
			COMPARISONS_TABLE,
			"tuneId",
			loserId
		);

		// If either tune is not found, give them fresh data
		if (!winner) {
			winner = {
				tuneId: winnerId,
				score: 0.5,
				numScores: 0,
				winPoints: prior,
				lossPoints: prior,
			};
		}
		if (!loser) {
			loser = {
				tuneId: loserId,
				score: 0.5,
				numScores: 0,
				winPoints: prior,
				lossPoints: prior,
			};
		}

		// Calculate new values
		winner.winPoints += winner.score;
		loser.lossPoints += loser.score;

		winner.score =
			winner.winPoints / (winner.winPoints + winner.lossPoints);
		loser.score = loser.winPoints / (loser.winPoints + loser.lossPoints);

		// Update the tunes in the database
		await putComparison(winner);
		await putComparison(loser);

		// Update the tunes in the tunes table
		await updateTune(winnerId, winner.score, winner.numScores + 1);
		await updateTune(loserId, loser.score, loser.numScores + 1);

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: "Tune comparison submitted successfully.",
			}),
		};
	} catch (error) {
		console.error("Error:", error);
		return {
			statusCode: 500,
			body: JSON.stringify({
				error: `Internal server error submitting tune comparison: ${error}`,
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

	console.log("getTableEntryById parameters:", params);

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

async function updateTune(tuneId, newScore, newNumScores) {
	const params = {
		TableName: TUNES_TABLE,
		Key: {
			tuneId,
		},
		UpdateExpression:
			"SET score = :score, numScores = :numScores, lastScored = :lastScored",
		ExpressionAttributeValues: {
			":score": newScore,
			":numScores": newNumScores,
			":lastScored": new Date().toISOString(),
		},
	};

	console.log("updateTune parameters:", params);

	try {
		const command = new UpdateCommand(params);
		const { Attributes } = await ddbDocClient.send(command);

		console.log("Update result:", Attributes);

		return Attributes;
	} catch (error) {
		console.error("Error:", error);
		return null;
	}
}

async function putComparison(comparison) {
	const params = {
		TableName: COMPARISONS_TABLE,
		Item: comparison,
	};

	console.log("putComparison parameters:", params);

	try {
		const command = new PutCommand(params);
		const result = await ddbDocClient.send(command);

		console.log("Put result:", result);

		return result;
	} catch (error) {
		console.error("Error:", error);
		return null;
	}
}
// Path: src/functions/SbumitTuneComparison.mjs
// Function: OrchestrAI_Submit-Tune-Comparison-Function
// Endpoint: POST /submitTuneComparison
