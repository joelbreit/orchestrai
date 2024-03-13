import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

// Initialize DynamoDB Document Client
const client = new DynamoDBClient({ region: "us-east-1" });
const ddbDocClient = DynamoDBDocumentClient.from(client);

console.log("DynamoDB Document Client initialized.");

// | Field       | Type   | Description                                     |
// | ----------- | ------ | ----------------------------------------------- |
// | scoreId     | String | _Partition Key_ Unique identifier for the score |
// | tuneId      | String | _indexed_ Unique identifier for the tune        |
// | accountId   | String | _indexed_ Unique identifier for the account     |
// | date        | String | Date the score was submitted                    |
// | overall     | Number | Overall score for the tune                      |
// | notation    | Number |                                                 |
// | description | Number |                                                 |
// | melody      | Number |                                                 |
// | rhythm      | Number |                                                 |
// | harmony     | Number |                                                 |
// | chords      | Number |                                                 |
// | congruity   | Number | How well the music matches the prompt           |
// | lyrics      | Number | (Optional)                                      |
// | notes       | Number | (Optional)                                      |
// | fixes       | Number | Number of fixes made to the tune                |
// | warnings    | List   | List of warnings generated for the notation     |

/**
 * Adds a score entry to the TuneScores DynamoDB table.
 * @param {Object} event - The event object containing the request details.
 * @param {Object} event.body - The request body.
 * @param {string} event.body.tuneId - The tune to score.
 * @param {string} event.body.accountId - The account submitting the score.
 * @param {number} event.body.overall - The overall score for the tune.
 * @param {number} event.body.notation - The notation score for the tune.
 * @param {number} event.body.description - The description score for the tune.
 * @param {number} event.body.melody - The melody score for the tune.
 * @param {number} event.body.rhythm - The rhythm score for the tune.
 * @param {number} event.body.harmony - The harmony score for the tune.
 * @param {number} event.body.chords - The chords score for the tune.
 * @param {number} event.body.congruity - The congruity score for the tune.
 * @param {number} event.body.lyrics - The lyrics score for the tune.
 * @param {number} event.body.notes - The notes score for the tune.
 * @param {number} event.body.fixes - The number of fixes made to the tune.
 * @param {Array} event.body.warnings - The list of warnings generated for the tune.
 * @returns {Object} - The response object with statusCode and body.
 */
export const handler = async (event) => {
	try {
		console.log("Received event:", event);

		const {
			tuneId,
			accountId,
			overall,
			notation,
			description,
			melody,
			rhythm,
			harmony,
			chords,
			congruity,
			lyrics,
			notes,
			fixes,
			warnings,
		} = JSON.parse(event.body);

		const date = new Date().toISOString();

		const scoreId = `${tuneId}-${accountId}-${date}`;

		const params = {
			TableName: "OrchestrAI_TuneScores",
			Item: {
				scoreId,
				tuneId,
				accountId,
				date,
				overall,
				notation,
				description,
				melody,
				rhythm,
				harmony,
				chords,
				congruity,
				lyrics,
				notes,
				fixes,
				warnings,
			},
		};

		const command = new PutCommand(params);
		await ddbDocClient.send(command);

		console.log("Successfully added score:", scoreId);

		return {
			statusCode: 200,
			body: JSON.stringify({ message: "Score added successfully" }),
		};
	} catch (error) {
		console.error("Error:", error);

		return {
			statusCode: 500,
			body: JSON.stringify({ message: "Error adding score" }),
		};
	}
};

// Test

// {
// 	"body": "{\"tuneId\":\"123\",\"accountId\":\"456\",\"overall\":5,\"notation\":5,\"description\":5,\"melody\":5,\"rhythm\":5,\"harmony\":5,\"chords\":5,\"congruity\":5,\"lyrics\":5,\"notes\":5,\"fixes\":0,\"warnings\":[]}"
// }