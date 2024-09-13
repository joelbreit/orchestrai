// Average time in seconds that it takes to generate a song
// with the OrchestrAI tool using OpenAI's custom GPTs API.
// Average was calculated from 14 trials on 2023-12-04.
export const AVERAGE_ORCHESTRAI_COMPLETION_TIME = 71;

// Messages to display while the OrchestrAI tool is generating music.
export const ORCHESTRAI_LOADING_MESSAGES = [
	"Generating music...",
	"This usually takes about a minute...",
	"Picking a chord progression...",
	"Constructing a bangin melody...",
	"Seeking inspiration from the greats...",
	'"Replacing the tedious imagination and humanity of art." - Some guy on Reddit',
	"Taking a cry break...",
	"Piecing together some harmonies...",
	"Creating a masterpiece...",
	"Adding some sick beats...",
	"Stringing together some notes...",
	"Scratching everything and starting over...",
	"Getting in a fight with the drummer...",
	"Articulating splines...",
	"Summoning the muse...",
	"Writing original music with a computer in defiance of the gods...",
	"Adding the finishing touches...",
];

export const ORCHESTRAI_TIMEOUT_DURATION = 60 * 2; // 2 minutes (in seconds)

export const ORCHESTRAI_SAVE_FILE_VERSION = "1.0.0";

export const VIBE_SUGGESTIONS = [
	"A wistful goodbye",
	"Quiet contemplation by the sea",
	"Yearning for adventure",
	"The thrill of discovery",
	"The peace of a sleeping city",
	"Dawn of the first spring day",
	"A moment of revelation",
	"The hustle and bustle of a lively market",
	"The stillness of a forest at dusk",
	"An intimate conversation by candlelight",
	"The joy of reuniting with old friends",
	"Nighttime in a magical garden",
	"Sailing into the sunset",
	"Overcoming inner demons",
	"A dance under the stars",
	"The tension of preparing for battle",
	"The nostalgia of looking through old photographs",
	"The enchantment of a winter wonderland",
	"The comfort of a warm embrace",
	"The bittersweet feeling of a completed journey",
	"The tranquility of a mountain vista",
	"Anticipation of a new beginning",
	"Solitude of a rainy afternoon",
	"The exhilaration of a challenge overcome",
	"The whimsy of a child's imagination",
	"A reflective walk through autumn leaves",
	"The elegance of a grand ballroom",
	"The warmth of a family gathering",
	"The mystery of a moonlit path",
	"The hopefulness of a sunrise on a clear morning",
	"The serendipity of an unexpected friendship",
	"The sorrow of a farewell without words",
	"The pride of a triumph earned",
	"The majesty of an ancient city",
	"The energy of a city awakening",
	"The charm of a quaint village street",
	"Longing for a lost love",
	"The humor of life's little mishaps",
	"The tension in the air before a storm",
	"The resolution after a heartfelt apology",
	"The exhilaration of a spontaneous adventure",
	"The sacredness of a timeless ritual",
	"The mischief of a night out with friends",
	"A meditative moment in a Zen garden",
	"The rush of the first snowfall",
	"The courage in facing the unknown",
	"The thrill of a first kiss",
	"The excitement of a new romance",
	"Reveling in the beauty of a summer day",
	"Vibrant colors of a spring garden",
	"Achieving a long-sought goal",
	"The thrill of a chase",
	"Celebrating a hard-earned victory",
	"Completing a long journey",
];

export const PROMPT_SUGGESTIONS = [
	// `Starry Night Serenade: A gentle, calming melody that evokes the feeling of gazing at a clear night sky, with twinkling stars and a tranquil atmosphere.`,
	// `Autumnal Equinox: A piece that captures the essence of fall, with warm chords and a nostalgic vibe, as if watching leaves slowly changing colors and drifting to the ground.`,
	// `Joyful Reunion: An uplifting and bright composition filled with excitement and warmth, embodying the feeling of friends or family members meeting after a long time apart.`,
	// `Mystic Journey: A composition with a sense of adventure and discovery, suitable for depicting a voyage through ancient ruins or a quest in search of enchanted artifacts.`,
	// `Sunrise on the Meadow: A composition that represents the peace and freshness of early morning, with slow crescendos like the sun rising and casting its first rays on a dew-covered meadow.`,
	// `Harbor Festival: A lively and rhythmic piece with an exuberant atmosphere, reminiscent of a bustling seaport celebrating a local festival with music, dance, and merrymaking.`,
	// `Whispers of the Old Forest: A haunting, ethereal melody that suggests a walk through an ancient, mystical forest with whispers of the past echoing between the trees.`,
	// `Winter Hearth Tales: A warm, inviting piece that conjures up images of a cozy fireplace, with friends and family gathered around sharing stories on a cold winter's night.`,
	// `Courage of the Knights: An inspiring and majestic composition that might accompany a scene of valiant knights setting out on a noble quest, with triumphant chords and a regal tone.`,
	// `Sailing the Crystal Seas: An airy, free-flowing melody that embodies the sensation of sailing on a vast, glittering ocean with the breeze at your back and endless horizons ahead.`,
	`Dance of the Fireflies: A whimsical and playful piece that captures the magic of a summer evening, with sparkling notes and a sense of joy and wonder.`,
	`Elegy for the Fallen: A poignant and melancholic composition that conveys the solemnity and reverence of a memorial for those who have passed away.`,
	`The Enchanted Library: A mysterious and enchanting piece that evokes the atmosphere of a library filled with ancient tomes, secret passages, and magical knowledge.`,
	`The Clockwork Carnival: A lively and energetic composition that captures the excitement and wonder of a fantastical carnival with mechanical wonders and colorful spectacles.`,
	`Ode to the Cosmos: A grand and awe-inspiring piece that reflects the vastness and beauty of the universe, with sweeping melodies and celestial harmonies.`,
	`Noir Detective: A moody and atmospheric composition that sets the stage for a classic detective story, with smoky jazz chords and a sense of intrigue and suspense.`,
	`Compose a song that would be really fun for band members to play`,
	`Create a tune that would be perfect for a romantic dinner date`,
	`Write a piece that would be fitting for a fantasy adventure video game`,
	`Compose a tune for an epic, fast paced boss battle in a video game`,
	`Compose a catchy, yearning pop anthem arranged for trumpet, trombone, and tuba`,
	`Compose a catchy pop anthem arranged for trumpet, trombone, and tuba`,
	`Generate a score for an intense racing game finale, reflecting high speeds and tight competition`,
	`Compose a piece for a peaceful village in a fantasy RPG, drawing on traditional folk influences`,
	`Design a boss battle theme for a video game set in an ancient ruin, where the boss is a giant mechanized golem awakened from its slumber`,
	`Compose a chase scene soundtrack for a cyberpunk thriller, emphasizing urgency, technological tension, and the protagonist's desperation`,
	`Compose a score for the climax of an epic space odyssey, where heroes navigate a nebula to escape a collapsing star, blending awe-inspiring cosmic wonders with the adrenaline of a narrow escape`,
	`Design a soundtrack for a journey through a digital utopia, where advanced technology and nature harmonize, creating a futuristic soundscape that blends electronic elements with an appealing melody`,
	`Generate a piece for an interdimensional chase scene, where characters leap between realities, combining elements of suspense, wonder, and the unexpected twists of shifting worlds`,
	`Create a theme for a secret society's ritual in a hidden temple, blending elements of mystery, solemnity, and the awe-inspiring sense of being part of something ancient and powerful`,
	`Compose a piece for a cosmic dance of celestial bodies, evoking the majesty of the universe's vastness and the mesmerizing beauty of cosmic magnitude`,
];

export const FEW_SHOT_EXAMPLES = [
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

export const USER_NAME_ADJECTIVES = {
	Orca: [
		// Adjectives starting with 'O'
		"Obedient",
		"Obese",
		"Obnoxious",
		"Obsequious",
		"Observant",
		"Obsessive",
		"Obstinate",
		"Obtuse",
		"Ocular",
		"Odd",
		"Odious",
		"Odorous",
		"Offbeat",
		"Officious",
		"Oily",
		"Olympian",
		"Ominous",
		"Omniscient",
		"Onerous",
		"Oniony",
		"Only",
		"Onomatopoeic",
		"Onomatopoetic",
		"Opaque",
		"Open",
		"Open-minded",
		"Operatic",
		"Operose",
		"Opinionated",
		"Opposite",
		"Oppressed",
		"Oppressive",
		"Optimal",
		"Optimistic",
		"Optometrical",
		"Orange",
		"Oratorical",
		"Orchestral",
		"Ordinary",
		"Organic",
		"Organized",
		"Orgastic",
		"Orgiastic",
		"Original",
	],
	whale: [
		// Adjectives starting with 'W'
		"Wacky",
		"Waggish",
		"Wakeful",
		"Wandering",
		"Wanted",
		"Warlike",
		"Warm",
		"Warm-hearted",
		"Wary",
		"Wasteful",
		"Watchful",
		"Waterlogged",
		"Waterproof",
		"Watertight",
		"Watery",
		"Wavy",
		"Wax",
		"Waxy",
		"Weak",
		"Weak-minded",
		"Weak-willed",
		"Weakhearted",
		"Wealthy",
		"Weary",
		"Wee",
		"Weedy",
		"Weeping",
		"Weepy",
		"Weird",
		"Well",
		"Well-behaved",
		"Well-built",
		"Well-dressed",
		"Well-groomed",
		"Well-informed",
		"Well-lit",
		"Well-made",
		"Well-off",
		"Well-to-do",
		"Well-worn",
		"Western",
		"Wet",
		"Wetproof",
		"Whacky",
		"Whimsical",
		"Whiny",
		"Whispering",
		"Whole",
		"Wholesome",
		"Wicked",
		"Wide",
		"Wide-eyed",
		"Wide-ranging",
		"Wideawake",
		"Widespread",
		"Wiggly",
		"Wild",
		"Wild-eyed",
		"Willful",
		"Willing",
		"Wily",
		"Wimpy",
	],
};
