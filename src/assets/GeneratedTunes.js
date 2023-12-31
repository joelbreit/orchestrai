import ABCNotations from "./ABCNotations";

const GeneratedTunes = {
	// "Swing Dance Party": [
	// 	{
	// 		date: "",
	// 		model: "ChatGPT-4",
	// 		topic: "",
	// 		style: "",
	// 		fullPrompt: "",
	// 		notation: "ABC Notation",
	// 		issues: "",
	// 		output: "",
	// 	},
	// 	{
	// 		date: "",
	// 		model: "ChatGPT-4",
	// 		topic: "",
	// 		style: "",
	// 		fullPrompt: "",
	// 		notation: "(Note, Duration) Pairs",
	// 		issues: "",
    //         output: ABCNotations["Swing Dance Party NoteDur"],
	// 	},
	// ],
	// "Brass Band Road Trip": [
	// 	{
	// 		date: "Nov. 10th, 2023",
	// 		model: "ChatGPT-4",
	// 		topic: "a road trip",
	// 		style: "brass band",
	// 		fullPrompt:
	// 			"Compose a piece of music in ABC Notation about a road trip. This piece should embody the brass band genre. Consider the typical instruments and rhythms used in this style, and ensure the composition reflects the vibe and themes commonly associated with a road trip. The music should be structured in a way that's characteristic of brass band, accommodating variations in melody, harmony, and rhythm that are true to the genre.",
	// 		notation: "ABC Notation",
	// 		issues: "Gave notation in 5 separate blocks",
	// 		output: ABCNotations["Brass Band Road Trip ABC"],
	// 	},
	// 	{
	// 		date: "Nov. 10th, 2023",
	// 		model: "ChatGPT-4",
	// 		topic: "a road trip",
	// 		style: "brass band",
	// 		fullPrompt: "Compose a piece of music in (Note, Duration) Pairs about a road trip. This piece should embody the brass band genre. Consider the typical instruments and rhythms used in this style, and ensure the composition reflects the vibe and themes commonly associated with a road trip. The music should be structured in a way that's characteristic of brass band, accommodating variations in melody, harmony, and rhythm that are true to the genre.",
	// 		notation: "ABC Notation",
	// 		issues: "",
	// 		output: ABCNotations["Brass Band Road Trip NoteDur"],
	// 	},
	// ],
	"Quarantine String Quartet": [
		{
			date: "Nov. 11th, 2023",
			model: "ChatGPT-4",
			topic: "",
			style: "",
			fullPrompt: "Create a piece of music in ABC Notation focusing on the theme of 'quarantine.' The composition should capture the essence and emotional undertones associated with this subject. Please ensure the melody, rhythm, and progression are characteristic of the 'string quartet' genre. Additionally, structure the piece with a clear beginning, middle, and end, and provide brief descriptions or instructions for the tempo, instrument roles, and dynamics to guide the performance.",
			notation: "ABC Notation",
			issues: "Gave output as 4 separate blocks; didn't give clefs",
			output: ABCNotations["Quarantine String Quartet ABC"],
		},
		{
			date: "Nov. 11th, 2023",
			model: "ChatGPT-4",
			topic: "",
			style: "",
			fullPrompt: "",
			notation: "(Note, Duration) Pairs",
			issues: "Failed to transcibe to ABC",
            output: ABCNotations["Quarantine String Quartet NoteDur"],
		},
	],
	"Sadness to Joy Marching Band": [
		{
			date: "Nov. 11th, 2023",
			model: "ChatGPT-4",
			topic: "a journey from sadness to joy",
			style: "marching band",
			fullPrompt: "Compose a piece of music in ABC Notation about a journey from sadness to joy. This piece should embody the marching band style. Consider the typical musical elements and rhythms used in this genre, and ensure the composition reflects the vibe and themes commonly associated with a journey from sadness to joy. The music should be structured in a way that's characteristic of marching band music, accommodating variations in melody, harmony, and rhythm that are true to that style. Do not include percussion.",
			notation: "ABC Notation",
			issues: "One double new line",
			output: ABCNotations["Sadness to Joy Marching Band ABC"],
		},
		{
			date: "Nov. 11th, 2023",
			model: "ChatGPT-4",
			topic: "a journey from sadness to joy",
			style: "",
			fullPrompt: "Compose a piece of music in (Note, Duration) Pairs about a journey from sadness to joy. This piece should embody the marching band style. Consider the typical musical elements and rhythms used in this genre, and ensure the composition reflects the vibe and themes commonly associated with a journey from sadness to joy. The music should be structured in a way that's characteristic of marching band music, accommodating variations in melody, harmony, and rhythm that are true to that style. Do not include percussion.",
			notation: "(Note, Duration) Pairs",
			issues: "marching band",
            output: ABCNotations["Sadness to Joy Marching Band NoteDur"],
		},
	],
	"Brass Trio Celebration": [
		{
			date: "",
			model: "ChatGPT-4",
			topic: "",
			style: "",
			fullPrompt: "",
			notation: "ABC Notation",
			issues: "",
			output: ABCNotations["Brass Trio Celebration ABC"],
		},
		{
			date: "",
			model: "ChatGPT-4",
			topic: "",
			style: "",
			fullPrompt: "",
			notation: "(Note, Duration) Pairs",
			issues: "",
            output: ABCNotations["Brass Trio Celebration NoteDur"],
		},
	],
	"3-part Pirates": [
		{
			date: "",
			model: "ChatGPT-4",
			topic: "",
			style: "",
			fullPrompt: "",
			notation: "ABC Notation",
			issues: "",
			output: ABCNotations["3-part Pirates ABC"],
		},
		{
			date: "",
			model: "ChatGPT-4",
			topic: "",
			style: "",
			fullPrompt: "",
			notation: "(Note, Duration) Pairs",
			issues: "",
            output: ABCNotations["3-part Pirates NoteDur"],
		},
	],
	"Pirates Trio": [
		{
			date: "",
			model: "ChatGPT-4",
			topic: "",
			style: "",
			fullPrompt: "",
			notation: "ABC Notation",
			issues: "",
			output: ABCNotations["Pirates Trio ABC"],
		},
		{
			date: "",
			model: "ChatGPT-4",
			topic: "",
			style: "",
			fullPrompt: "",
			notation: "(Note, Duration) Pairs",
			issues: "",
            output: ABCNotations["Pirates Trio NoteDur"],
		},
	],
	"Rebellious Mambo": [
		{
			date: "",
			model: "ChatGPT-4",
			topic: "",
			style: "",
			fullPrompt: "",
			notation: "ABC Notation",
			issues: "",
			output: ABCNotations["Rebellious Mambo ABC"],
		},
		{
			date: "",
			model: "ChatGPT-4",
			topic: "",
			style: "",
			fullPrompt: "",
			notation: "(Note, Duration) Pairs",
			issues: "",
            output: ABCNotations["Rebellious Mambo NoteDur"],
		},
	],
	"Show Choir Sandess to Joy": [
		{
			date: "",
			model: "ChatGPT-4",
			topic: "",
			style: "",
			fullPrompt: "",
			notation: "ABC Notation",
			issues: "",
			output: ABCNotations["Show Choir Sandess to Joy ABC"],
		},
		{
			date: "",
			model: "ChatGPT-4",
			topic: "",
			style: "",
			fullPrompt: "",
			notation: "(Note, Duration) Pairs",
			issues: "",
            output: ABCNotations["Show Choir Sandess to Joy NoteDur"],
		},
	],
	"Barbershop Quartet Victory": [
		{
			date: "",
			model: "ChatGPT-4",
			topic: "",
			style: "",
			fullPrompt: "",
			notation: "ABC Notation",
			issues: "",
			output: ABCNotations["Barbershop Quartet Victory ABC"],
		},
		{
			date: "",
			model: "ChatGPT-4",
			topic: "",
			style: "",
			fullPrompt: "",
			notation: "(Note, Duration) Pairs",
			issues: "",
            output: ABCNotations["Barbershop Quartet Victory NoteDur"],
		},
	],
	// "Example": [
	// 	{
	// 		date: "",
	// 		model: "ChatGPT-4",
	// 		topic: "",
	// 		style: "",
	// 		fullPrompt: "",
	// 		notation: "ABC Notation",
	// 		issues: "",
	// 		output: "",
	// 	},
	// 	{
	// 		date: "",
	// 		model: "ChatGPT-4",
	// 		topic: "",
	// 		style: "",
	// 		fullPrompt: "",
	// 		notation: "(Note, Duration) Pairs",
	// 		issues: "",
    //         output: "",
	// 	},
	// ],
};

export default GeneratedTunes;
