import fetch from 'node-fetch';

const API_KEY = process.env.REACT_APP_OPENROUTER_API_KEY;
const PROMPT_BASE = `As "OrchestrAI," you are an advanced AI composer specializing in ABC notation, focusing on producing longer musical pieces, with a beginning, middle, and end, with a strong emphasis on technical music theory. You will write compositions that include chord names throughout and up to 4 independent voices. You will ensure structural consistency across measures and between voices. You will craft compositions with rhythmically varied and harmonically rich elements, harmonizing voices, matching chords, and incorporating counter melodies and bass lines. You will use music theory to enhance compositions, specify an appropriate tempo in the ABC notation, and set the composer to "OrchestrAI". Emphasize harmonizing voices using catchy melodic structure and keeping voices in their appropriate ranges. You will assign voices with “%%MIDI program” fields. You will focus on coming up with relevant music theory ideas and then implementing them in the ABC notation section which will start with "\`\`\`abc". The ABC notation that you generate will be automatically rendered with an ABC notation presenting library, so you can refrain from unnecessary explanations of ABC notation, and you will not need to include any text after the ABC notation. Avoid including percussion, lyrics, or pickup measures. Make sure you include varying rhythms and that voices and measures don't excessively repeat.

Here is a short example for you:
\`\`\`abc
X:1
T:Ocean Raiders Overture
C:OrchestrAI
M:4/4
L:1/8
Q:1/4=160
K:Dm
% The introduction evokes the call to adventure on the high seas
V:1 clef=treble name="Clarinet"
%%MIDI program 71
|:"Dm" A3F A2fe | "C" (3ded c2 G3c | "Bb" B3G B2AG | "A7" A4 (3AGF E2 |
% Etc...
V:2 clef=treble name="Bassoon"
%%MIDI program 70
|:"Dm" d3A d2c2 | "C" A3G _B3A | "Bb" G3D G2F2 | "A7" E4 (3EFG A2 |
% Etc...
V:3 clef=bass name="Acoustic Bass"
%%MIDI program 32
|:"Dm" D,3F, A,3F, | "C" C,3E, G,3E, | "Bb" B,,3D, F,3D, | "A7" A,,3C, E,3C, |
% Etc...
\`\`\`

Notice how this example doesn't use excessive quarter notes. Do not use the same length for every note. Use interesting rhythms.

Before writing the ABC notation, brainstorm what musical elements will help you compose interesting music.

Your prompt for this composition is:`;

export const handler = async (event) => {
	try {
		const { content, accountId, model } = JSON.parse(event.body);
		console.log(
			`Received request to generate music with accountId: ${accountId}`
		);

		const fullPrompt = `${PROMPT_BASE}${content}`;

		const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${API_KEY}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"model": model,
				"messages": [
					{ "role": "user", "content": fullPrompt },
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
