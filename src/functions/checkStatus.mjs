import axios from "axios";

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

export const handler = async (event) => {
	try {
		const { threadId, runId, UUID } = JSON.parse(event.body);

		console.log(
			`Received request from user with ID ${UUID} to check status for thread ID: ${threadId}, run ID: ${runId}`
		);

		const axiosInstance = axios.create({
			baseURL: "https://api.openai.com/v1/",
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json",
				"OpenAI-Beta": "assistants=v1",
			},
		});

		console.log(
			`Getting run status for thread ID: ${threadId}, run ID: ${runId}`
		);
		const statusResponse = await axiosInstance.get(
			`threads/${threadId}/runs/${runId}`
		);
		console.log(`Run status: ${statusResponse.data.status}`);
		let status = statusResponse.data.status;
		console.log(`Run status: ${status}`);

		if (status === "completed") {
			console.log(`Run completed, getting messages`);
			const messagesResponse = await axiosInstance.get(
				`threads/${threadId}/messages`
			);
			console.log(
				`Received ${messagesResponse.data.data.length} messages`
			);
			let messages = messagesResponse.data.data;
			console.log("Messages:", messages);

			// Return success response
			return {
				statusCode: 200,
				body: JSON.stringify({
					message: "Run completed successfully",
					status: status,
					messages: messages,
				}),
			};
		} else {
			console.log(`Run not yet completed, returning status`);
			return {
				statusCode: 200,
				body: JSON.stringify({
					message: "Run not yet completed",
					status: status,
					messages: [],
				}),
			};
		}
	} catch (error) {
		console.error(error);
		return {
			statusCode: 500,
			body: JSON.stringify({ error: "Internal Server Error" }),
		};
	}
};
