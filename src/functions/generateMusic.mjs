import axios from "axios";

const FEW_SHOT_EXAMPLES = [
	{
		prompt: "Compose a tune that expresses the following vibe: Vibrant colors of a spring garden",
		response: `To embody the vibrant colors of a spring garden in a musical composition, I will create a tune that reflects the freshness and brightness of spring with a light and uplifting melody. The use of major tonality will be predominant to give a sense of cheer. I will mix in occasional seventh and sixth chords to add color, depicting the variety of hues in a garden. This tune will be in a brisk 2/4 time expressing the lively nature of spring's arrival. Syncopated rhythms may be included to give the feeling of the playful and unpredictable movement of butterflies and birds.
\`\`\`abc
X:1
T:Colors of Spring
C:OrchestrAI
M:2/4
L:1/16
Q:1/4=132
K:D
V:1 clef=treble name="Vibraphone"
%%MIDI program 11
|:"D" F2Ad (3AFA d2| "G" G2Bd (3gfe d2|"Em" E2Gb (3agf e2|"A7" A2ce (3dcB A2|
"D" f2ad (3fga f2|"Bm" b2fd' (3bag f2|"G" g2bg "A7" (3agf e2|"D" d4- d2 z2:|
|:"A" e2ac (3efg a2| "D" F2Ad (3fga b2| "Bm" (3gab fd' (3bag f2| "A7" a2ec' (3agf e2|
"G" G2Bd (3gfe d2| "D/A" A2df (3agf d2| "Em" G2eg (3bag e2| "A7" (3cBA (3AGF E2 z2:|
|: "D" (3FAd (3fad' f'2d2|"G" (3GBd (3gbd' g'2d2|"Em" (3EGB (3egb e'2B2|"A7" (3Ace (3ace' a2e2|
"D" d2df (3ada f2|"G" b2ag (3fed B2|"A7" (3efg (3agf (3edc A2|"D" d4- d2 z2:|
V:2 clef=bass name="Fretless Bass"
%%MIDI program 35
|:"D"D,2F,A, D2F,2|"G"G,2B,D G2B,2|"Em"E,2G,B, E2G,2|"A7"A,2CE A2C2|
"D"D,2F,A, D2F,2|"Bm"B,,2D,F, B,2D,2|"G"G,2B,D "A7"A,2C2|"D"D,2A,,2 D,2 z2:|
|:"A"A,,2C,E, A,2C2|"D"D,2F,A, D2F,2|"Bm"B,,2D,F, B,2D,2|"A7"A,,2C,E, A,2C2|
"G"G,,2B,,D, G,2B,2|"D/A"A,,2D,F, A,2D2|"Em"E,2G,B, E2G,2|"A7"A,,2C,E, A,2 z2:|
|: "D" D,2F,A, D2F,2|"G" G,2B,D G2B,2|"Em" E,2G,B, E2G,2|"A7" A,2CE A2C2|
"D" D,2F,A, D2F,2|"G" G,2B,D G2B,2|"A7" A,2CE A2C2|"D" D,2A,,2 D,4:|
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
|:"C"G6 E2|"G"D6 G2|"Am"E4 F2G2|"F"A4 c2A2|
"C"G4 (3EFG c2|"G"D4 B2G2|"F"E2F2 G3 A|"C"C6 z2|
"E7"G3 A B2G2|"Am"A4 c2B2|"Dm"D4 F2A2|"G7"B4 d2B2|
"Em"G4 E2G2|"Am"c2B2 A2B2|"Dm"F2E2 D3 C|"G7"B,6 z2|
"C"G,4 C2E2|"G"D4 G2B2|"F"A4 c2e2|"C"c6 G2|
"C"[Gc]4 [Ec]2[Ec]2|"G"[DB]4 [DG]2[DG]2|"Am"[EA]2[FA]2 [EG]3 [FA]|"C"[Cc]8:|
V:2 clef=treble name="Strings"
%%MIDI program 48
|:"C"e6c2|"G"B4 d2e2|"Am"A4 c2d2|"F"c4 f2e2|
"C"e4 (3cde g2|"G"B4 d2g2|"F"c2d2 e3 f|"C"c4 (3GAB c2|
"E7"g4 g2f2|"Am"a4 e'2c'2|"Dm" f4 a2f2|"G7"d4 g2f2|
"Em"g4 e2d2|"Am"A2G2 c2e2|"Dm"d2c2 F3 E|"G7"D4 F2G2|
"C"E4 G2c2|"G"B4 d2g2|"F"d2f2 a2g2|"C"G4 e2c2|
"C"[Ge]4 [ce]2[ce]2|"G"[Bd]4 [Bg]2[Bg]2|"Am"[Ac]2[Ac]2 [ce]3 [df]|"C"[eg]8:|
V:3 clef=bass name="Cello"
%%MIDI program 42
|:"C"C4 G,2C2|"G"G,4 D2B,2|"Am"A,4 E2A2|"F"F,4 A,2C2|
"C"C4 G,2E2|"G"G,4 D2B,2|"F"A,2A,2 C3 E|"C"C4 E,2G,2|
"E7"E,4 G,2B,2|"Am"A,4 C2E2|"Dm"D4 F,2A,2|"G7" G,4 B,2D2|
"Em"E4 B,2G,2|"Am"A,4 C2E2|"Dm"F,4 A,2D2|"G7"G,4 D2F2|
"C"C4 E2G2|"G"G,4 B,2D2|"F"F,4 A,2C2|"C" C4 E2G2|
"C"C4 G,2C2|"G"G,4 D2G,2|"Am"A,2C2 E3 F|"C"C8:|
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
|:"Dm" A3F A2fe | "C" (3ded c2 G3c | "Bb" B3G B2AG | "A7" A4 (3AGF E2 |
"Dm" A3c "C"gfed | "Bb" c3d "A7"cBAG | "Dm"F3A "A7"GFED | "Dm"D4 d4 |
"Dm"f2ef "C"gec2 | "Bb"(3dcB (3AGF "A7"E2G2 | "Dm"F2E2 "C"D2C2 | "Bb"B4 "A7"A3G |
"Dm"f3d fefa | "Gm"g3b agfe | "A7"a3g fedc | "Dm"d8 :|
V:2 clef=treble name="Bassoon"
%%MIDI program 70
|:"Dm" d3A d2c2 | "C" A3G _B3A | "Bb" G3D G2F2 | "A7" E4 (3EFG A2 |
"Dm" d3A "C"edcB | "Bb" A3F "A7"GFED | "Dm"F3D "A7"CDEF | "Dm"D4 A4 |
"Dm"A3F "C"GA_B2 | "Bb"F3G "A7"A3F | "Dm"D3F "C"FGAB | "Bb"B4 "A7"c3A |
"Dm"A3F "Gm"GABA | "A7"G3E EFGA | "Dm"f3d "A7"cBAG | "Dm"F8 :|
V:3 clef=bass name="Acoustic Bass"
%%MIDI program 32
|:"Dm" D,3F, A,3F, | "C" C,3E, G,3E, | "Bb" B,,3D, F,3D, | "A7" A,,3C, E,3C, |
"Dm" D,3F, "C"A,3F, | "Bb" B,,3D, "A7"A,3F, | "Dm"D,3F, "A7"A,3G, | "Dm"F,4 D,4 |
"Dm"D,3F, "C"E,3G, | "Bb"B,,3D, "A7"C,3E, | "Dm"F,3A, "C"G,3B, | "Bb"B,,4 "A7"A,,4 |
"Dm"D,3F, A,3F, | "Gm"G,,3B,, D,3B,, | "A7"A,,3C, E,3G, | "Dm"D,8 :|
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
Q:1/4=56
K:Amaj
V:1 clef=treble name="Synth Pad 1"
%% MIDI program 95
|: "Amaj7"A6 E2 | "F#m7"F4 (3EFE D2 | "Dmaj9" D6 F2 | "E9"E4 (3BAG E2 |
"Amaj7"A3 B c3 e | "E7sus4"B6 G2 | "Amaj7"A3 F "A7"E3 ^G | "Dmaj9"D4 (3FED F2 |
"Amaj9"A6 E2 | "Bm11"E4 (3DED C2 | "E13sus4"G6 A2 | "Amaj7"A4 "A7"^G4 :|
V:2 clef=treble name="Synth Pad 2"
%% MIDI program 95
|: "Amaj7"[CE]4 [EA]4 | "F#m7"[AC']4 [EG]4 | "Dmaj9"[FA]4 [Ac]4 | "E9"[EG]4 [GB]4 |
"Amaj7"[AC']4 [Ec]2 [EB]2 | "E7sus4"[EG]4 [GB]4 | "Amaj7"[AC']4 "A7"[EG]4 | "Dmaj9"[DF]4 [FA]4 |
"Amaj9"[CE]6 [EA]2 | "Bm11"[DF]4 [FA]4 | "E13sus4"[EG]4 [GB]4 | "Amaj7"[AC']4 "A7"[C^G]4 :|
V:3 clef=bass name="Synth Pad 3"
%% MIDI program 95
|: "Amaj7"A,4 E3 C | "F#m7"F,4 A4 | "Dmaj9"D,4 F4 | "E9"E,4 B,3 D |
"Amaj7"A,4 C4 | "E7sus4"E4 G3 E | "Amaj7"A,4 "A7"E3 ^G | "Dmaj9"D4 F3 A |
"Amaj9"A,4 E4 | "Bm11"B,4 D4 | "E13sus4"E4 G4 | "Amaj7"A,4 "A7"^G,4 :|
V:4 clef=bass name="Synth Bass"
%% MIDI program 38
|: "Amaj7"[A,E]6 [A,E]2 | "F#m7"[F,C]4 [F,C]4 | "Dmaj9"[D,A,]6 [D,A,]2 | "E9"[E,B,]4 [E,B,]4 |
"Amaj7"[A,E]4 [A,E]4 | "E7sus4"[E,B,]4 [E,B,]4 | "Amaj7"[A,E]3 [A,E] "A7"[A,^G,]3 [A,^G,] | "Dmaj9"[D,A,]4 [D,A,]4 |
"Amaj9"[A,E]6 [A,E]2 | "Bm11"[B,,F,]4 [B,,F,]4 | "E13sus4"[E,B,]6 [E,B,]2 | "Amaj7"[A,E]4 "A7"[A,^G,]4 :|
\`\`\``,
	},
	{
		prompt: "Please create a tune for this prompt: Compose a tune for an epic, fast paced boss battle in a video game",
		response: `To capture the essence of a glorious and fast-paced boss battle in a video game, I will compose a tune that is intense, rhythmically driven, and features strong melodic lines. The music will use minor keys to impart a sense of danger and conflict, with modulations to heighten tension and resolution to inspire heroics. The brisk tempo of 180 bpm will create a sense of urgency and quick-paced action. There will be syncopation and rhythmic complexity to exemplify the unpredictability of battle. I will include a driving bass line, soaring lead melodies, and punctuated chords to evoke the high stakes and drama of the scene. This boss battle theme showcases the fierce competition and adrenaline rush that comes with facing a formidable opponent, using a mix of bold brass, striking strings, and powerful percussion in the electronic sound palette to bring the battle to life.
\`\`\`abc
X:1
T:Glorious Battle Rhapsody
C:OrchestrAI
M:4/4
L:1/16
Q:1/4=180
K:Bm
V:1 clef=treble name="Lead Synth" subname="Lead"
%%MIDI program 81
|:"Bm" B2B2 d2f2 g3f edcB | "G" G2A2 B2d2 c3B ABAG | "A" A2f2 e2c2 d3c BAGF | "Em" E2G2 F2A2 G4 z4 |
"Bm" B2d2 f2b2 a3g fedc | "F#" F2A2 c2f2 e3d cBAG | "G" G2B2 d2g2 f3e dcBA | "A" A2c2 e2a2 g4 f4 |
"Bm" b2f2 d2B2 F2B2 d2f2 | "Em" g2e2 B2G2 E2G2 B2e2 | "F#" f2c2 A2F2 C2F2 A2c2 | "Bm" d2B2 F2D2 B,2D2 F2B2 |
"G" d2B2 G2D2 B,2D2 G2B2 | "A" c2A2 E2C2 A,2C2 E2A2 | "D" d2A2 F2D2 A,2D2 F2A2 | "Bm" B6 d2 f6 a2 |
|: "D" d'4 a4 f4 d4 | "G" b4 g4 d4 B4 | "A" c'4 a4 e4 c4 | "Bm" b4 f4 d4 B4 :|
V:2 clef=treble name="Brass Section" subname="Brass"
%%MIDI program 61
|:"Bm" d2f2 B2d2 f4 z4 | "G" B2d2 G2B2 d4 z4 | "A" A2c2 E2A2 c4 z4 | "Em" G2B2 E2G2 B4 z4 |
"Bm" f2b2 d2f2 b4 z4 | "F#" c2f2 A2c2 f4 z4 | "G" d2g2 B2d2 g4 z4 | "A" e2a2 c2e2 a4 z4 |
"Bm" [Bd]2[Bf]2 [Bd]2[Bf]2 [Bd]2[Bf]2 [Bd]2[Bf]2 | "Em" [GB]2[Ge]2 [GB]2[Ge]2 [GB]2[Ge]2 [GB]2[Ge]2 | "F#" [Ac]2[Af]2 [Ac]2[Af]2 [Ac]2[Af]2 [Ac]2[Af]2 | "Bm" [Bd]2[Bf]2 [Bd]2[Bf]2 [Bd]2[Bf]2 [Bd]2[Bf]2 |
"G" [GB]2[Gd]2 [GB]2[Gd]2 [GB]2[Gd]2 [GB]2[Gd]2 | "A" [Ac]2[Ae]2 [Ac]2[Ae]2 [Ac]2[Ae]2 [Ac]2[Ae]2 | "D" [Ad]2[Af]2 [Ad]2[Af]2 [Ad]2[Af]2 [Ad]2[Af]2 | "Bm" [Bd]2[Bf]2 [Bd]2[Bf]2 [Bd]2[Bf]2 [Bd]2[Bf]2 |
|: "D" [DF]2[DA]2 [DF]2[DA]2 [DF]2[DA]2 [DF]2[DA]2 | "G" [GB]2[GD']2 [GB]2[GD']2 [GB]2[GD']2 [GB]2[GD']2 | "A" [AC]2[AE]2 [AC]2[AE]2 [AC]2[AE]2 [AC]2[AE]2 | "Bm" [BD]2[BF]2 [BD]2[BF]2 [BD]2[BF]2 [BD]2[BF]2 :|
V:3 clef=bass name="Bass Synth" subname="Bass"
%%MIDI program 87
|:"Bm" B,4 B,2B,2 B,4 z4 | "G" G,4 G,2G,2 G,4 z4 | "A" A,4 A,2C2 A,4 z4 | "Em" E,4 E,2E,2 E,4 z4 |
"Bm" B,3B, B,2D2 F,3F, F,2B,2 | "F#" F,3F, F,2A,2 C3C C2F,2 | "G" G,3G, G,2B,2 D3D D2G,2 | "A" A,3A, A,2C2 E3E E2A,2 |
"Bm" B,,2B,,2 B,,2B,,2 B,,2B,,2 B,,2B,,2 | "Em" E,2E,2 E,2E,2 E,2E,2 E,2E,2 | "F#" F,2F,2 F,2F,2 F,2F,2 F,2F,2 | "Bm" B,,2B,,2 B,,2B,,2 B,,2B,,2 B,,2B,,2 |
"G" G,,2G,,2 G,,2G,,2 G,,2G,,2 G,,2G,,2 | "A" A,,2A,,2 A,,2A,,2 A,,2A,,2 A,,2A,,2 | "D" D,2D,2 D,2D,2 D,2D,2 D,2D,2 | "Bm" B,,4 F,4 B,4 D4 |
|: "D" D,4 A,,4 D,4 F,4 | "G" G,4 D,4 G,4 B,4 | "A" A,4 E,4 A,4 C4 | "Bm" B,4 F,4 B,4 D4 :|
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
