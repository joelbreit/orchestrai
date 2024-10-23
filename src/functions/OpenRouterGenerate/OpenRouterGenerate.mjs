const API_KEY = process.env.REACT_APP_OPENROUTER_API_KEY;

export const handler = async (event) => {
	try {
		const { content, accountId, model } = JSON.parse(event.body);
		console.log(
			`Received request to generate music with accountId: ${accountId}`
		);

		const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${API_KEY}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"model": model,
				"messages": [
					{ "role": "user", "content": content },
				],
			})
		});

		if (!response.ok) {
			throw new Error(`Failed to generate music: ${response.statusText}`);
		}

		const data = await response.json();

		console.log("data", data);

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: "Music generated successfully",
				data
			}),
		};
	} catch (error) {
		console.error(error);
		return {
			statusCode: 500,
			body: JSON.stringify({
				error: `Internal server error creating music: ${error}`,
			}),
		};
	}
};


// Path: src/functions/OpenRouterGenerate/OpenRouterGenerate.mjs
// Function: OrchestrAI_OpenRouter-Generate-Function
// Endpoint: POST /OpenRouterGenerate
