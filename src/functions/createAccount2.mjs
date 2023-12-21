import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
	DynamoDBDocumentClient,
	PutCommand,
	QueryCommand,
} from "@aws-sdk/lib-dynamodb";
// import bcrypt from "bcrypt";

// Initialize DynamoDB Document Client
const client = new DynamoDBClient({ region: "us-east-1" });
const ddbDocClient = DynamoDBDocumentClient.from(client);

console.log("DynamoDB Document Client initialized.");

async function hashPassword(password) {
	// const saltRounds = 10;
	// return await bcrypt.hash(password, saltRounds);
	return password;
}

// Main Lambda Handler
export const handler = async (event) => {
	try {
		console.log("Received event:", event);

		const { accountId, email, password, creationDate } = JSON.parse(
			event.body
		);
		const hashedPassword = await hashPassword(password);

		// Check if email exists
		if (await checkIfExists("email", email)) {
			console.log("Email already exists.");
			return {
				statusCode: 403,
				body: JSON.stringify({ error: "Email already exists." }),
			};
		}

		// Prepare item to insert
		const newAccount = {
			accountId: accountId,
			email: email,
			password: hashedPassword,
			creationDate: creationDate,
		};

		console.log("New account prepared:", newAccount);

		// Insert the new account
		await createAccount(newAccount);

		console.log(`Account for ${email} created successfully.`);

		// Return the accountId
		return { statusCode: 200, body: JSON.stringify({ accountId }) };
	} catch (error) {
		console.error("Error occurred:", error);
		return {
			statusCode: 500,
			body: JSON.stringify({ error: "Internal Server Error" }),
		};
	}
};

// Function to check if aan account attribute already exists
async function checkIfExists(attributeName, attributeValue) {
	console.log(`Checking if ${attributeName} exists: ${attributeValue}`);

	const params = {
		TableName: "OrchestrAI_Accounts",
		IndexName: `${attributeName}-index`,
		KeyConditionExpression: `#attr = :value`,
		ExpressionAttributeNames: {
			"#attr": attributeName,
		},
		ExpressionAttributeValues: {
			":value": attributeValue,
		},
	};

	const { Count } = await ddbDocClient.send(new QueryCommand(params));
	console.log(`Count of ${attributeName} ${attributeValue}: ${Count}`);
	return Count > 0;
}

// Function to create a new account
async function createAccount(Account) {
	console.log("Creating account:", Account);

	const params = {
		TableName: "OrchestrAI_Accounts",
		Item: Account,
	};

	await ddbDocClient.send(new PutCommand(params));
	console.log("Account created successfully.");
}
