import axios from "axios";

const FEW_SHOT_EXAMPLES = [
	{
		prompt: "Compose a tune that expresses the following vibe: Vibrant colors of a spring garden",
		response: `To embody the vibrant colors of a spring garden in a musical composition, I will create a tune that reflects the freshness and brightness of spring with a light and uplifting melody. The use of major tonality will be predominant to give a sense of cheer. I will mix in occasional seventh and sixth chords to add color, depicting the variety of hues in a garden. This tune will be in a brisk 2/4 time expressing the lively nature of spring's arrival. Syncopated rhythms may be included to give the feeling of the playful and unpredictable movement of butterflies and birds.
I hope you enjoy:
\`\`\`abc
X:1
T:Colors of Spring
C:OrchestrAI
M:2/4
L:1/16
Q:1/4=140
K:D
% The piece starts with a flowing melody representing the emergence of spring
V:1 clef=treble name="Vibraphone" subname="Vibes"
%%MIDI program 11
|:"D" FA dA z2 FA| "G"G2 z2 BAGF|"Em"E2 G2 z2 F2|"A7"A4- A2 z2|
"D" fd A2 z2 f2|"Bm"b4 z2 a2|"G"g2 fe z2 "A7"ce|"D"d4- d2 z2:|
V:2 clef=bass name="Fretless Bass" subname="Bass"
%%MIDI program 35
|:"D"D,4 F,4|"G"G,4 B,4|"Em"E,4 G,4|"A7"A,4 C4|
"D"D,4 F,4|"Bm"B,4 D4|"G"G,4 B,4|"A7"A,4 E,4:|
\`\`\``,
	},
	{
		prompt: "Compose a tune that expresses the following vibe: A grand, inspiring, celebratory victory song!",
		response: `To create a grand and inspiring tune that captures the spirit of a celebratory victory, I will compose a piece that starts with a bold statement, builds up enthusiastically, and reaches a triumphant climax. I will use strong, bright chords and rhythms to reflect the energy and magnificence of the occasion. This composition will be in a major key, with a brisk tempo, and feature a full, robust sound to provide a sense of grandeur. The following piece uses the key of C major to give a clear and bright sound, a tempo set to a lively 132 BPM to convey the excitement of victory, and a consistent rhythmic drive to maintain the celebratory mood throughout the composition. This victorious fanfare captures the intensity and grandeur of a victory celebration with its strong melodies, harmonically rich textures, and resounding rhythms. Enjoy the robust horns and strings indicated by the MIDI presets which resonate with the feelings of triumph and inspiration.
I hope you enjoy:
\`\`\`abc
X:1
T:Victorious Fanfare
C:OrchestrAI
M:4/4
L:1/8
Q:1/4=132
K:Cmaj
V:1 clef=treble name="Trumpet" subname="Trpt."
%%MIDI program 56
|:"C"G6 E2|"G"D6 G2|"Am"E4 F2G2|"F"A6 c2|
"C"G6 E2|"G"D6 G2|"F"E2F2 G3 A|"C"C8|
"E7"G3 A B2G2|"A"A6 B2|"Dm"D4 F2A2|"G7"B6 d2|
"Em"G4 E2G2|"Am"c2B2 A2B2|"Dm"F2E2 D3 C|"G7"B,8|
"C"G,4 C2E2|"G"D6 G2|"F"A4 c2e2|"C"c8|
"C"G6E2|"G"D6 G2|"Am"E2F2 G3 A|"C"C8:|
V:2 clef=treble name="Strings" subname="Str."
%%MIDI program 48
|:"C"e6c2|"G"B6 e2|"Am"A4 c2d2|"F"c6 e2|
"C"e6c2|"G"B6 e2|"F"c2d2 e3 f|"C"c8|
"E7"g4 g2f2|"A"a6 c'2|"Dm" f4 a2f2|"G7"d2d2 B3 A|
"Em"g4 e2d2|"Am"A2 G2 z EG2|"Dm"d2c2 F3 E|"G7"D6 B,2|
"C"E4 G2E2|"G"B6 e2|"F"d2f2 a2g2|"C"G4 G4|
"C"E6C2|"G"B6 e2|"Am"A2G2 A3 B|"C"c8:|
V:3 clef=bass name="Cello" subname="Cello"
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
		response: `To convey the grandeur and inspiration associated with pirates on the open sea, I will compose a piece that evokes feelings of adventure, freedom, and courage. The tune will be in a minor key to capture the danger and unpredictability of the sea, but it will have major elements to bring out the sense of grandeur and triumph. The piece will have a driving rhythm to mimic the movement of waves and the bustling activity on a pirate ship. It will blend the excitement of setting sail with the thrill of exploration and discovery. I will use a fast tempo of 160 bpm to represent the energy and animation of pirate life. The 4/4 time signature provides a strong, marching beat that can create the sensation of moving forward towards adventure. Here is the composition, entitled "Ocean Raiders Overture":
\`\`\`abc
X:1
T:Ocean Raiders Overture
C:OrchestrAI
M:4/4
L:1/8
Q:1/4=160
K:Dm
% The introduction evokes the call to adventure on the high seas
V:1 clef=treble name="Clarinet" subname="Cl."
%%MIDI program 71
|:"Dm" A4 A2fe | "C" d6 c2 | "Bb" B4 B2AG | "A7" A6 z2 |
"Dm" A4 "C"gfed | "Bb" c4 "A7"A2G2 | "Dm"F6 "A7"E2 | "Dm"d8 |
"Dm"f2ef "C"gec2 | "Bb"d2cB "A7"A2G2 | "Dm"F2E2 "C"D2C2 | "Bb"B6 z2 |
"Dm"f4 fefa | "Gm"g4 gbag | "A7"a4 a2gf | "Dm"d8 :|
V:2 clef=treble name="Basoon" subname="Bsn."
%%MIDI program 70
|:"Dm" d4 d2c2 | "C" A6A2 | "Bb" G4 G2F2 | "A7" E6z2 |
"Dm" d4 "C"edcB | "Bb" A4 "A7"G2F2 | "Dm"F6 "A7"E2 | "Dm"d8 |
"Dm"A2A2 "C"GA_B2 | "Bb"F4 "A7"G2F2 | "Dm"D4 "C"C2D2 | "Bb"B6 z2 |
"Dm"A2d2 "Gm"d2B2 | "A7"G2E2 E4 | "Dm"f4 "A7"A2G2 | "Dm"d8 :|
V:3 clef=bass name="Accoustic Bass" subname="Bass"
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
I hope you enjoy:
\`\`\`abc
X:1
T:Starry Night Serenade
C:OrchestrAI
M:4/4
L:1/8
Q:1/4=60
K:Amaj
V:1 clef=treble name="Synth Pad" subname="Pad"
%% MIDI program 91
|: "A"A6 E2 | "F#m"F4 E4 | "D" D6 F2 | "E"E4 z4 |
"A"A3 B c4 | "E"B6 G2 | "A"A3 F E4 | "D"D4 F4 |
"A"A6 E2 | "Bm7"E4 D4 | "E7sus4"G6 A2 | "A"A4 z4 :|
V:2 clef=treble name="Synth Pad" subname="Pad"
%% MIDI program 91
|: "A"C4 E4 | "F#m"A4 G4 | "D"F4 A4 | "E"E4 z4 |
"A"A4 c2 B2 | "E"G4 E4 | "A"A4 F4 | "D"E4 F4 |
"A"C6 E2 | "Bm7"F4 D4 | "E7sus4"G4 A4 | "A"A4 z4 :|
V:3 clef=bass name="Synth Pad" subname="Pad"
%% MIDI program 91
|: "A"A,4 E3 C | "F#m"F,4 A4 | "D"D,4 F4 | "E"E,4 z4 |
"A"A,4 C4 | "E"E4 G3 E | "A"A,4 E3 F | "D"D4 F4 |
"A"A,4 E4 | "Bm7"B,4 D4 | "E7sus4"E4 G4 | "A"A,4 z4 :|
V:4 clef=bass name="Synth Pad" subname="Pad"
%% MIDI program 91
|: "A"E2 A4 z2 | "F#m"C4 A4 | "D"A2 D4 F2 | "E"E4 z4 |
"A"E4 A3 B | "E"C4 F3 G | "A"A3 E2 F2 z | "D"F4 z4 |
"A"E6 A2 | "Bm7"D4 B4 | "E7sus4"G3 F E4 | "A"A4 z4 :|
\`\`\``,
	},
];

const OLD_FEW_SHOT_EXAMPLES = [
	{
		prompt: "Compose a tune that expresses the following vibe: A dance under the stars",
		response: `To compose a tune that captures the essence of a dance under the stars, I will try to incorporate smooth voice leading, counterpoint principles such as contrary and oblique motion, careful interval management, avoidance of parallel fifths and octaves, imitative counterpoint, logical harmonic progression, rhythmic variety, avoidance of voice crossings and overlaps, and culmination in cadence.
I will use a major key to convey a sense of joy and light-heartedness associated with dancing. I've chosen the tempo of 120 bpm to suggest a lively dance and the 3/4 meter in order to capture the rhythmic feel of a waltz which is often associated with traditional dances that one could envision taking place under an open, starlit sky. I will try to incorporate some minor harmonies or dissonant intervals, creating tension that could represent the mysterious and awe-inspiring aspect of the stars before resolving back to the major key for a sense of warmth and resolution.
The music will feature intricate interplay between voices, making each line melodically interesting and rhythmically engaging. I will also ensure that the rhythmic patterns enhance the feeling of dancing and include syncopation to add a playful character to the music.
I hope you enjoy:
\`\`\`abc
X:1
T:Dance Under the Stars
C:OrchestrAI
M:3/4
L:1/8
Q:1/4=120
K:Gmaj
V:1 clef=treble
%% MIDI program 44
|:"G"B2 BAGF|"C"E3 FG2|"D"A3 FED|"G"B4 z2|
"G"G3 A B2|"C"E3 DCB,|"Am"A,2 A,4|"D7"G,2 F,4|
"D"D3 FED|"G"B,4 D2|"Em"GAB AGF|"D7"E3 FED|
"G"B2 B3 A|"Am"B3 cBA|"G"B2 G4|"G"G6:|
V:2 clef=treble
%% MIDI program 44
|"G"D2 D3 E|"C"C3 D E2|"D"F3 ED2|"G"D4 z2|
"D"D3 FED|"C"C3 DC2|"Am"A,2 A,4|"D7" F,3 E,3|
"D"D3 FED|"G"G,3 B,3|"Em"G3 GFE|"D7"D3 EDE|
"G"D2 D3 E|"Am"E3 FGA|"G"G2 D4|"G"D6:|
V:3 clef=bass
%% MIDI program 43
|"G"G,2 B,4|"C"C2 E4|"D"F2 D4|"G"G,2 B,4|
"D"A,2 D4|"C"E2 C4|"Am"A,2 C4|"D7"F2 A,4|
"D"F2 A,4|"G"G,2 B,4|"Em"E2 G4|"D7"F2 A,4|
"G"G,2 D4|"Am"E2 C4|"G"G,2 B,4|"G"G,6:|
\`\`\``,
	},
	{
		prompt: "Please create a tune for this prompt: create a song about the joy of reuniting with old friends",
		response: `For a tune expressing the joy of reuniting with old friends, we will aim for an upbeat melody, using major tonality, bright chord progressions, and a lively tempo to evoke the warmth and happiness of such an occasion. The composition will feature contrasting sections to reflect the different aspects of joyful reunions: the surprise and excitement of seeing friends, the warm embrace, and the cheerful conversations.
        It is composed in a major key which helps associate it with warmth and happiness. I will set the tempo to a lively 120 bpm, suitable for expressing joy and excitement.
        I hope you enjoy:
\`\`\`abc        
X:1
T:Reunion Rhapsody
C:OrchestrAI
M:4/4
L:1/8
Q:1/4=120
K:G
% The introduction symbolizes the anticipation of the reunion
V:1
%% MIDI program 3
|: "G" B2D2 G2B2 | "D" A6 B2 | "C" c6 E2 | "D7" D6 D2 | 
"G" B2D2 G2B2 | "D" A6 B2 | "C" e6 c2 | "D7" d6 z2 :|
V:2
|: [G,B,]3 B3B,2 | [A,E,]3 A3A,2 | [CE]3 E3E,2 | [DF]3 F3F,2 | 
[G,B,]3 B3B,2 | [A,E,]3 A3A,2 | [CE]3 E3E,2 | [DF]3 F3F,2 :|
% The next section represents the joyous greeting between friends
V:1
%% MIDI program 3
|: "G" d4 B2G2 | "Em" B4 A2G2 | "Am" A4 c3e | "D7" d6 z2 |
"G" B4 d3B | "C" e4 c2A2 | "G" D4 G2B2 | "D7" A6 z2 :|
V:2
|: [GD]3 G,3D2 | [EB]3 E3B,2 | [A,E,]3 A,3E2 | [DA,]3 D3A,2 | 
[GD]3 G,3D2 | [CG]3 C3G,2 | [GD]3 G,3D2 | [DA,]3 D3A,2 :|
% The middle section reflects the warmth and affection in the embrace
V:1
|: "Em" E6 G2 | "Am" A6 c2 | "D" D6 F2 | "G" G6 B2 |
"C" E6 G2 | "Am" A2c2 A2G2 | "Em" G6 E2 | "D7" D6 z2 :|
V:2
|: [EG]3 E3G,2 | [AC]3 A3A,2 | [DF]3 D3D,2 | [GB,]3 G3G,2 | 
[EG]3 E3G,2 | [AC]3 A3A,2 | [EG]3 E3E,2 | [DF]3 D3F,2 :|
% The final section symbolizes the lively chatter and catch-up
V:1
|: "G" d2B2 G2D2 | "C" c2E2 A2c2 | "G" B2d2 G2B2 | "D7" A4 F2D2 |
"G" G2B2 D2G2 | "C" c2E2 G2c2 | "G" B2d2 "D7" F2A2 | "G" G8 :|
V:2
|: [G,B,]3 B3D2 | [CE,]3 E3A,2 | [G,B,]3 B3D2 | [DF]3 F3A,2 | 
[G,B,]3 B3D2 | [CE,]3 E3G,2 | [G,B,]3 B3D2 | [G,2B,2] z2 z4 :|
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
			body: JSON.stringify({ error: `Internal server error creating music: ${error}` }),
		};
	}
};
