import axios from "axios";

const FEW_SHOT_EXAMPLES = [
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
"G"B2 B3 A|"Am"B3 cBA|"G"B2 G4-|"G"G6:|
V:2 clef=treble
%% MIDI program 44
|"G"D2 D3 E|"C"C3 D E2|"D"F3 ED2|"G"D4 z2|
"D"D3 FED|"C"C3 DC2|"Am"A,2 A,4|"D7" F,3 E,3|
"D"D3 FED|"G"G,3 B,3|"Em"G3- GFE|"D7"D3 EDE|
"G"D2 D3 E|"Am"E3 FGA|"G"G2 D4-|"G"D6:|
V:3 clef=bass
%% MIDI program 43
|"G"G,2 B,4|"C"C2 E4|"D"F2 D4|"G"G,2 B,4|
"D"A,2 D4|"C"E2 C4|"Am"A,2 C4|"D7"F2 A,4|
"D"F2 A,4|"G"G,2 B,4|"Em"E2 G4|"D7"F2 A,4|
"G"G,2 D4|"Am"E2 C4|"G"G,2 B,4-|"G"G,6:|
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
|: "G" B2D2 G2B2 | "D" A4- A2B2 | "C" c4- c2E2 | "D7" D6 D2 | 
"G" B2D2 G2B2 | "D" A4- A2B2 | "C" e4- e2c2 | "D7" d6 z2 :|
V:2
|: [G,2B,2] z B3B,2 | [A,2E2] z A3A,2 | [C2E2] z E3E,2 | [D2F2] z F3F,2 | 
[G,2B,2] z B3B,2 | [A,2E2] z A3A,2 | [C2E2] z E3E,2 | [D2F2] z F3F,2 :|
% The next section represents the joyous greeting between friends
V:1
%% MIDI program 3
|: "G" d4 B2G2 | "Em" B4 A2G2 | "Am" A4 c3e | "D7" d6 z2 |
"G" B4 d3B | "C" e4 c2A2 | "G" D4 G2B2 | "D7" A6 z2 :|
V:2
|: [G,2D2] z G,3D2 | [E2B,2] z E3B,2 | [A,2E2] z A,3E2 | [D2A,2] z D3A,2 | 
[G,2D2] z G,3D2 | [C2G,2] z C3G,2 | [G,2D2] z G,3D2 | [D2A,2] z D3A,2 :|
% The middle section reflects the warmth and affection in the embrace
V:1
|: "Em" E4- E2G2 | "Am" A4- A2c2 | "D" D4- D2F2 | "G" G6 B2 |
"C" E4- E2G2 | "Am" A2c2 A2G2 | "Em" G4- G2E2 | "D7" D6 z2 :|
V:2
|: [E2G2] z E3G,2 | [A2C2] z A3A,2 | [D2F2] z D3D,2 | [G2B,2] z G3G,2 | 
[E2G2] z E3G,2 | [A2C2] z A3A,2 | [E2G2] z E3E,2 | [D2F2] z D3F,2 :|
% The final section symbolizes the lively chatter and catch-up
V:1
|: "G" d2B2 G2D2 | "C" c2E2 A2c2 | "G" B2d2 G2B2 | "D7" A4 F2D2 |
"G" G2B2 D2G2 | "C" c2E2 G2c2 | "G" B2d2 "D7" F2A2 | "G" G8 :|
V:2
|: [G,2B,2] z B3D2 | [C,2E2] z E3A,2 | [G,2B,2] z B3D2 | [D2F2] z F3A,2 | 
[G,2B,2] z B3D2 | [C,2E2] z E3G,2 | [G,2B,2] z B3D2 | [G,2B,2] z2 z4 :|
\`\`\``,
    },
];

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

export const handler = async (event) => {
    try {
        const { content, UUID } = JSON.parse(event.body);
        console.log(`Received request to generate music with UUID: ${UUID}`);

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
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};
