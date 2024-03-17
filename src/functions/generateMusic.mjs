import axios from "axios";

const FEW_SHOT_EXAMPLES = [
	{
		prompt: "Compose a tune that expresses the following vibe: Vibrant colors of a spring garden",
		response: `To embody the vibrant colors of a spring garden in a musical composition, I will create a tune that reflects the freshness and brightness of spring with a light and uplifting melody. The use of major tonality will be predominant to give a sense of cheer. I will mix in occasional seventh and sixth chords to add color, depicting the variety of hues in a garden. This tune will be in a brisk 2/4 time expressing the lively nature of spring's arrival. Syncopated rhythms may be included to give the feeling of the playful and unpredictable movement of butterflies and birds.
\`\`\`abc
X:1
T:Colors of Spring - Extended
C:OrchestrAI
M:2/4
L:1/16
Q:1/4=140
K:D
V:1 clef=treble name="Vibraphone"
%%MIDI program 11
|:"D" FAdA z2 FA| "G" G2 z2 BAGF|"Em" E2G2 z2 F2|"A7" A4- A2 z2|
"D" fdA2 z2 f2|"Bm" b4 z2 a2|"G" g2fe z2 "A7" ce|"D" d4- d2 z2:|
|:"A" e2c2 E2C2| "D" F2D2 F2AF| "Bm" g2f2 g2bg| "A7" a4 a2z2|
"G" G2B2 d2G2| "D/A" A2F2 A2d2| "Em" G2E2 C2E2| "A7" A4- A2 z2:|
| "D" FDFA d2F2|"G" GBAG B2d2|"Em" E2EF G2A2|"A7" c2B2 A4|
"D" d2df a2fd|"G" b2a2 g2f2|"A7" e2c2 A2c2|"D" d8:|
V:2 clef=bass name="Fretless Bass"
%%MIDI program 35
|:"D"D,4 F,4|"G"G,4 B,4|"Em"E,4 G,4|"A7"A,4 C4|
"D"D,4 F,4|"Bm"B,4 D4|"G"G,4 B,4|"A7"A,4 E,4:|
|:"A"C4 E,4|"D"F4 A,4|"Bm"D4 F4|"A7"E4 C4|
"G"B,4 D4|"D/A"A,4 E4|"Em"G,4 B,4|"A7"E4 A,4:|
| "D" D,4 A,4|"G" B,4 D4|"Em" F,4 A,4|"A7" E,4 C4|
"D" D,4 F,4|"G" G,4 B,4|"A7" A,4 C4|"D" D,8:|
\`\`\``,
	},
	{
		prompt: "Compose a tune that expresses the following vibe: A grand, inspiring, celebratory victory song!",
		response: `To create a grand and inspiring tune that captures the spirit of a celebratory victory, I will compose a piece that starts with a bold statement, builds up enthusiastically, and reaches a triumphant climax. I will use strong, bright chords and rhythms to reflect the energy and magnificence of the occasion. This composition will be in a major key, with a brisk tempo, and feature a full, robust sound to provide a sense of grandeur. The following piece uses the key of C major to give a clear and bright sound, a tempo set to a lively 132 BPM to convey the excitement of victory, and a consistent rhythmic drive to maintain the celebratory mood throughout the composition. This victorious fanfare captures the intensity and grandeur of a victory celebration with its strong melodies, harmonically rich textures, and resounding rhythms. Enjoy the robust horns and strings indicated by the MIDI presets which resonate with the feelings of triumph and inspiration.
\`\`\`abc
X:1
T:Victorious Fanfare
C:OrchestrAI
M:4/4
L:1/8
Q:1/4=132
K:Cmaj
V:1 clef=treble name="Trumpet"
%%MIDI program 56
|:"C"G6 E2|"G"D6 G2|"Am"E4 F2G2|"F"A6 c2|
"C"G6 E2|"G"D6 G2|"F"E2F2 G3 A|"C"C8|
"E7"G3 A B2G2|"A"A6 B2|"Dm"D4 F2A2|"G7"B6 d2|
"Em"G4 E2G2|"Am"c2B2 A2B2|"Dm"F2E2 D3 C|"G7"B,8|
"C"G,4 C2E2|"G"D6 G2|"F"A4 c2e2|"C"c8|
"C"G6E2|"G"D6 G2|"Am"E2F2 G3 A|"C"C8:|
V:2 clef=treble name="Strings"
%%MIDI program 48
|:"C"e6c2|"G"B6 e2|"Am"A4 c2d2|"F"c6 e2|
"C"e6c2|"G"B6 e2|"F"c2d2 e3 f|"C"c8|
"E7"g4 g2f2|"A"a6 c'2|"Dm" f4 a2f2|"G7"d2d2 B3 A|
"Em"g4 e2d2|"Am"A2 G2 z EG2|"Dm"d2c2 F3 E|"G7"D6 B,2|
"C"E4 G2E2|"G"B6 e2|"F"d2f2 a2g2|"C"G4 G4|
"C"E6C2|"G"B6 e2|"Am"A2G2 A3 B|"C"c8:|
V:3 clef=bass name="Cello"
%%MIDI program 42
|:"C"C6C2|"G"G,4 D2D2|"Am"A,4 E2A2|"F"C4 C4|
"C"E6E2|"G"B,4 D2D2|"F"A,2A,2 C3 E|"C"C6 C2|
"E7"B,4 _B,2_B,2|"A"C4 E2A,2|"Dm"A,4 D2D2|"G7" G,4 D2G,2|
"Em"E4 E2E2|"Am"C4 C2C2|"Dm"F4 A,2D2|"G7"B,6 F,2|
"C"C4 E2C2|"G"G,4 D2D2|"F"A,4 F2C2|"C" C4 C4|
"C"G,6E2|"G"D6 D2|"Am"E2E2 G3 A|"C"C8:|
\`\`\``,
	},
	{
		prompt: "Please create a tune for this prompt: create a grand and inspiring tune that captures the spirit of a pirates on the open sea",
		response: `To convey the grandeur and inspiration associated with pirates on the open sea, I will compose a piece that evokes feelings of adventure, freedom, and courage. The tune will be in a minor key to capture the danger and unpredictability of the sea, but it will have major elements to bring out the sense of grandeur and triumph. The piece will have a driving rhythm to mimic the movement of waves and the bustling activity on a pirate ship. It will blend the excitement of setting sail with the thrill of exploration and discovery. I will use a fast tempo of 160 bpm to represent the energy and animation of pirate life. The 4/4 time signature provides a strong, marching beat that can create the sensation of moving forward towards adventure.
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
|:"Dm" A4 A2fe | "C" d6 c2 | "Bb" B4 B2AG | "A7" A6 z2 |
"Dm" A4 "C"gfed | "Bb" c4 "A7"A2G2 | "Dm"F6 "A7"E2 | "Dm"d8 |
"Dm"f2ef "C"gec2 | "Bb"d2cB "A7"A2G2 | "Dm"F2E2 "C"D2C2 | "Bb"B6 z2 |
"Dm"f4 fefa | "Gm"g4 gbag | "A7"a4 a2gf | "Dm"d8 :|
V:2 clef=treble name="Basoon"
%%MIDI program 70
|:"Dm" d4 d2c2 | "C" A6A2 | "Bb" G4 G2F2 | "A7" E6z2 |
"Dm" d4 "C"edcB | "Bb" A4 "A7"G2F2 | "Dm"F6 "A7"E2 | "Dm"d8 |
"Dm"A2A2 "C"GA_B2 | "Bb"F4 "A7"G2F2 | "Dm"D4 "C"C2D2 | "Bb"B6 z2 |
"Dm"A2d2 "Gm"d2B2 | "A7"G2E2 E4 | "Dm"f4 "A7"A2G2 | "Dm"d8 :|
V:3 clef=bass name="Accoustic Bass"
%%MIDI program 32
|:"Dm" D,4 D,2F,2 | "C" C,6 G,2 | "Bb" B,,4 B,,2D,2 | "A7" A,6z2 |
"Dm" A,4 "C"D,C,D,E, | "Bb" F,4 "A7"A,2F,2 | "Dm"D,6 "A7"A,2 | "Dm"D,8 |
"Dm"D,2D,2 "C"C,4 | "Bb"B,,4 "A7"C,4 | "Dm"F,2G,2 "C"A,4 | "Bb"B,,6 z2 |
"Dm"D,4 D,2D,2 | "Gm"G,,4 G,2G,2 | "A7"A,,4 A,2E,2 | "Dm"D,8 :|
\`\`\``,
	},
	{
		prompt: "Please create a tune for this prompt: A gentle, calming melody that evokes the feeling of gazing at a clear night sky, with twinkling stars and a tranquil atmosphere.",
		response: `For the "Starry Night Serenade," I will compose a gentle and calming melody that utilizes a slower tempo and legato phrasing to evoke the tranquil atmosphere of gazing at a star-filled night sky. The composition will be in 4/4 time to provide a steady, soothing rhythm, and I will use a tempo of 60 bpm to reflect the peacefulness of the night. Musical features will include sustained notes, and smooth voice leading. The choice of instruments will also contribute to the serene mood. Soft synth pads will be indicated for all voices to create an aural setting that conjures the vast, open expanse of the night sky. To achieve harmonic richness, the chord choices will include some seventh chords and suspended chords to provide a sense of openness and wonder.
\`\`\`abc
X:1
T:Starry Night Serenade
C:OrchestrAI
M:4/4
L:1/8
Q:1/4=60
K:Amaj
V:1 clef=treble name="Synth Pad"
%% MIDI program 91
|: "A"A6 E2 | "F#m"F4 E4 | "D" D6 F2 | "E"E4 z4 |
"A"A3 B c4 | "E"B6 G2 | "A"A3 F E4 | "D"D4 F4 |
"A"A6 E2 | "Bm7"E4 D4 | "E7sus4"G6 A2 | "A"A4 z4 :|
V:2 clef=treble name="Synth Pad"
%% MIDI program 91
|: "A"C4 E4 | "F#m"A4 G4 | "D"F4 A4 | "E"E4 z4 |
"A"A4 c2 B2 | "E"G4 E4 | "A"A4 F4 | "D"E4 F4 |
"A"C6 E2 | "Bm7"F4 D4 | "E7sus4"G4 A4 | "A"A4 z4 :|
V:3 clef=bass name="Synth Pad"
%% MIDI program 91
|: "A"A,4 E3 C | "F#m"F,4 A4 | "D"D,4 F4 | "E"E,4 z4 |
"A"A,4 C4 | "E"E4 G3 E | "A"A,4 E3 F | "D"D4 F4 |
"A"A,4 E4 | "Bm7"B,4 D4 | "E7sus4"E4 G4 | "A"A,4 z4 :|
V:4 clef=bass name="Synth Pad"
%% MIDI program 91
|: "A"E2 A4 z2 | "F#m"C4 A4 | "D"A2 D4 F2 | "E"E4 z4 |
"A"E4 A3 B | "E"C4 F3 G | "A"A3 E2 F2 z | "D"F4 z4 |
"A"E6 A2 | "Bm7"D4 B4 | "E7sus4"G3 F E4 | "A"A4 z4 :|
\`\`\``,
	},
	{
		prompt: "Please create a tune for this prompt: Compose a tune for an epic, fast paced boss battle in a video game",
		response: `To craft an epic and fast-paced tune suitable for a boss battle in a video game, I will use driving rhythms, exciting melodies, and intense harmonies to capture the thrill and tension of the confrontation. The composition will incorporate a fast tempo to reflect the high energy of the encounter, and I will weave in minor tonalities to convey the sense of danger and urgency. I will also make use of rhythmic ostinatos and dynamic changes to amplify the drama of the battle. For the instrumentation, I will assign voices that are commonly used to evoke intensity in soundtracks, such as strong brass for the main melody, strings for rapid ostinato patterns, and wind instruments for counter melodies.
\`\`\`abc
X:1
T:Boss Battle Blitz
C:OrchestrAI
M:4/4
L:1/16
Q:1/4=180
K:Dmin
% Multiple instruments combine for a powerful and rapid soundscape
V:1 clef=treble name="Brass" subname="Main Theme"
%%MIDI program 61
|: "Dm"d2af d2af d4 c2A2 | "C"c2eg c2eg c4 B2G2 | "Bb"d2Bb d2Bb d4 c2A2 | "A"A2ce A2ce A8 |
"Dm"d2af d2af d4 c2A2 | "C"c2eg c2eg c4 B2G2 | "Bb"d2Bb d2Bb d4 c2A2 | "A7"A2ce A2ce A8:|
V:2 clef=treble name="Strings" subname="Rhythm"
%%MIDI program 49
|: "Dm"A4 A4 f4 f4 | "C"G4 G4 e4 e4 | "Bb"F4 F4 d4 d4 | "A"E4 E4 c4 c4 |
"Dm"A4 A4 f4 f4 | "C"G4 G4 e4 e4 | "Bb"F4 F4 d4 d4 | "A7"E4 E4 c4 c4 :|
V:3 clef=treble name="Woodwind" subname="Counter"
%%MIDI program 74
|: "Dm"f2d2 f2d2 AcBA z4 | "C"e2c2 e2c2 GFGA z4 | "Bb"B2F2 B2F2 DEDF z4 | "A"c2A2 c2A2 E4 z4 |
"Dm"f2d2 f2d2 AcBA z4 | "C"e2c2 e2c2 GFGA z4 | "Bb"B2F2 B2F2 DEDF z4 | "A7"c2A2 c2A2 E4 z4 :|
V:4 clef=bass name="Bass" octave=-1
%%MIDI program 43
|: "Dm"D8 D8 | "C"C8 C8 | "Bb"B B7 B B7 | "A"A,8 A,8 |
"Dm"D8 D8 | "C"C8 C8 | "Bb"B B7 B B7 | "A7"A,8 A,8 :|
\`\`\``,
	},
];

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

export const handler = async (event) => {
	try {
		const { content, accountId } = JSON.parse(event.body);
		console.log(
			`Received request to generate music with accountId: ${accountId}`
		);

		const axiosInstance = axios.create({
			baseURL: "https://api.openai.com/v1/",
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json",
				"OpenAI-Beta": "assistants=v1",
			},
		});

		console.log(`Creating thread with prompt: ${content}`);
		let msgs = [];
		for (let i = 0; i < FEW_SHOT_EXAMPLES.length; i++) {
			msgs.push({ role: "user", content: FEW_SHOT_EXAMPLES[i].prompt });
			msgs.push({ role: "user", content: FEW_SHOT_EXAMPLES[i].response });
		}
		msgs.push({ role: "user", content: content });
		const createResponse = await axiosInstance.post("threads", {
			messages: msgs,
		});
		console.log(`Thread created with ID: ${createResponse.data.id}`);
		const threadId = createResponse.data.id;

		console.log(`Creating run with thread ID: ${threadId}`);
		const runResponse = await axiosInstance.post(
			`threads/${threadId}/runs`,
			{
				assistant_id: process.env.REACT_APP_ORCHESTRAI_ASSISTANT_ID,
			}
		);
		console.log(`Run created with ID: ${runResponse.data.id}`);
		const runId = runResponse.data.id;

		// Return success response
		return {
			statusCode: 200,
			body: JSON.stringify({
				message: "Thread and run created successfully",
				threadId: threadId,
				runId: runId,
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
// Path: src/functions/genereateMusic.mjs
// Function: OrchestrAI_Generate-Music-Function
// Endpoint: POST /generateMusic
