import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    DynamoDBDocumentClient,
    PutCommand,
    QueryCommand,
} from "@aws-sdk/lib-dynamodb";

// Initialize DynamoDB Document Client
const client = new DynamoDBClient({ region: "us-east-1" });
const ddbDocClient = DynamoDBDocumentClient.from(client);

console.log("DynamoDB Document Client initialized.");

// Main Lambda Handler
export const handler = async (event) => {
    try {
        console.log("Received event:", event);

        const { UUID, email, username, password, accountName, creationDate } =
            JSON.parse(event.body);

        console.log(
            `Processing user creation for username: ${username}, email: ${email}`
        );

        // Check if username exists
        if (await checkIfExists("username", username)) {
            console.log("Username already exists.");
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Username already exists." }),
            };
        }

        // Check if email exists
        if (await checkIfExists("email", email)) {
            console.log("Email already exists.");
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Email already exists." }),
            };
        }

        // Prepare item to insert
        const newUser = {
            UUID,
            username,
            email,
            password,
            accountName,
            creationDate,
        };

        console.log("New user prepared:", newUser);

        // Insert the new user
        await createUser(newUser);

        console.log(`User ${username} created successfully.`);

        // Return the UUID
        return { statusCode: 200, body: JSON.stringify({ UUID }) };
    } catch (error) {
        console.error("Error occurred:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};

// Function to check if a user attribute already exists
async function checkIfExists(attributeName, attributeValue) {
    console.log(`Checking if ${attributeName} exists: ${attributeValue}`);

    const params = {
        TableName: "OrchestrAI_Users",
        IndexName: `${attributeName}-index`, // Replace with your secondary index name if you have one
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

// Function to create a new user
async function createUser(user) {
    console.log("Creating user:", user);

    const params = {
        TableName: "OrchestrAI_Users",
        Item: user,
    };

    await ddbDocClient.send(new PutCommand(params));
    console.log("User created successfully.");
}
