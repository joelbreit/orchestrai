import React, { useState } from "react";
import {
	Button,
	Container,
	Modal,
	ModalBody,
	ModalHeader
} from "reactstrap";


import Rubric from "./Rubric";

import EvaluationResults from "../assets/images/EvaluationResults.png";

const ResearchContent = () => {
	const [modal, setModal] = useState(false);

	const toggle = () => setModal(!modal);

	return (
		<Container className="mt-5">
			<h1>Automated Music Composition using GPT-4 - An Exploration</h1>
			<h5>Joel P. S. Breit</h5>
			<h5>University of Pittsburgh</h5>
			<h5>December 2023</h5>
			<hr />
			<h2>Abstract</h2>
			<p>
				This project explores, the potential for an LLM, specifically
				OpenAI’s GPT-4-Turbo via its assistants API, to perform the task
				of creating text based musical compositions from text based
				input. It focuses on the creation of valid and pleasing short
				tunes using ABC notation and explores the technical
				complications involved. A comparison of potential techniques is
				discussed, and the results of the utilized approach are
				evaluated across 20 compositions resulting in average output of
				fine to good quality. Finally, several directions for future
				research are discussed.
			</p>
			<hr />
			<h2>Introduction</h2>
			<h3>Background</h3>
			<p>
				As of 2023, the capabilities of large language models (LLMs)
				have far outpaced those of generative music AI. While
				theoretically coherent text generation is a much more difficult
				task than coherent music notation, few options are available for
				musicians who want to generate music notation from text
				descriptions. At the same time, current LLMs are capable of
				eloquently describing the core ideas of music theory and
				composition and can describe music in text. This begs the
				question, can advanced LLMs fill the gap that text-to-notation
				generative music AI has left wide open?
			</p>
			<h3>Objectives</h3>
			<p>
				My objective, for this project was to utilize the intelligence
				of an LLM to easily generate pleasant and customizable musical
				compositions. This objective consisted of many subgoals
				including the following:
			</p>
			<ol>
				<li>Restructure user input for optimal use with an LLM</li>
				<li>
					Prompt the LLM in a way that utilizes the wide range of its
					musical understanding
				</li>
				<li>Generate actual music, not just descriptions of music</li>
				<li>Get output from the LLM that makes the music legible</li>
				<li>
					Provide guide rails to guide the LLM towards composition
					tasks that it is capable of
				</li>
				<li>
					Assure that the musical output is technically well formed
					(lacking detrimental mistakes)
				</li>
				<li>
					Translate the LLMs output into actual audio/visual output
				</li>
				<li>
					Maintain the individuality of user input by creating music
					that specifically matches their input
				</li>
				<li>Generate genuinely new music</li>
				<li>Generate music of substantial length</li>
				<li>Generate music with substantial texture</li>
				<li>Generate coherent music</li>
				<li>Generate music with interesting melodic direction</li>
				<li>Generate music with interesting rhythmic structure</li>
			</ol>
			<hr />
			<h2>Methods</h2>
			<h3>Picking an LLM</h3>
			<p>
				In order to address the goals of this project, I needed to pick
				a large language model and a text based music notation style.
				For the large language model, I chose GPT-4 primarily due to its
				reputation as being the state-of-the-art language model in
				October-December of 2023 when this research was conducted{" "}
				<a href="https://huggingface.co/spaces/lmsys/chatbot-arena-leaderboard">
					Chatbot Arena Leaderboard
				</a>
				. This research also likely could have been conducted using
				other LLMs such as Claude from Anthropic or Llama from Meta, but
				such exploration fell outside the scope of this project (i.e.
				would have required a lot more time and effort).
			</p>
			<h3>Picking a Notation Style</h3>
			<p>
				As for the text based music notation style, I explored creating
				output in the following formats: 1. ABC notation, 2. (note,
				duration) pairs (e.g. (“A4”, 2) where “A4” represents the
				musical note A4, and 2 represents the duration of 2 beats), 3.
				Python code utilizing the music21 library, and 4. MusicXML. In
				test runs, MusicXML was too verbose and resulted in invalid
				syntax and a dearth of musical content relative to the volume of
				text required. Similarly, music21 code frequently failed to
				compile making it difficult to test, and (note, duration) pairs
				were difficult to translate into a usable format. ABC notation
				and (note, duration) pairs provided the best preliminary
				results, so I tested them each with 8 identical prompts and
				compared the results. I did not conduct a formal analysis, but
				the resulting compositions can be found at{" "}
				<a href="https://www.OrchestrAI.site/juxcompose">
					https://www.OrchestrAI.site/juxcompose
				</a>
				. Based on the above, I determined empirically that ABC notation
				produced the best results although it has its own limitations
				which are outline in the limitations section below.
			</p>
			<h3>Creating an Interface</h3>
			<p>
				After making these determinations, an interface needed to be
				developed for replicable usage of the LLM and for translation of
				the LLM’s text based output. To this end, I created a web
				application utilizing web development languages and libraries
				including the open source ABCjs library which allows for
				in-browser rendering of audio-video enabled sheet music from ABC
				notation. To simplify the composition process, I only included a
				field for providing a mood for the composition to emulate. Upon
				submission, the prompt “Compose a tune that expresses the
				following mood: [provided mood]“ was sent to the API. After
				completion, the web application extracted the ABC notation,
				provided it in an editable text field, rendered the ABC notation
				as playable audio-video sheet music, and separately displayed
				any accompanying text that the model generated.
			</p>
			<h3>Customizing the Model</h3>
			<p>
				For the purpose of this project, I created a custom GPT-4-Turbo
				model using OpenAI’s Assistants API which was available in beta
				at the time. For customization, I provided a custom prompt
				provided in the appendix of this report that discouraged common
				failures such as mismatched voices and encouraged its proven
				competencies such as including chords and composing multiple
				sections.
			</p>
			<p>
				In addition to a custom prompt, I also provided 3 reference
				materials to provide a targeted knowledge base for the GPT. The
				first document was a web archive of the ABC notation Standards
				provided at{" "}
				<a href="https://abcnotation.com/wiki/abc:standard:v2.1">
					https://abcnotation.com/wiki/abc:standard:v2.1
				</a>
				. The other two documents were transcripts generated by GPT-4 on
				what makes a good melody and what makes good harmonization.
				These knowledge represented in these documents originated
				entirely from GPT-4, so compositions can really be attributed as
				original.
			</p>
			<h3>Evaluation</h3>
			<p>
				In order to evaluate the results of this project, I generated 20
				mood ideas with the model created for this project, and
				evaluated them on 11 metrics: grade, notation, melody, harmony,
				chords, mood, lyrics, text, measures, duration, and voices.
				Measures was the number of musical measure written in the
				output, duration was the time that the tune took to play in the
				ABCjs interface, and voices was the number of voices (1 through
				4) included in the composition. All the other metrics were
				assessed qualitatively according to the following rubric:
			</p>
			<Button
				color="primary"
				onClick={toggle}
				className="primary-button mb-3"
			>
				Open Rubric{" "}
				<span className="icon-square flex-shrink-0">
					<i className={`bi bi-question-circle`}></i>
				</span>
			</Button>

			<Modal
				isOpen={modal}
				toggle={toggle}
				backdrop
				fade
				centered
				scrollable
				size="xl"
				fullscreen="lg"
			>
				<ModalHeader toggle={toggle}>Feedback Rubric</ModalHeader>
				<ModalBody>
					<Rubric />
				</ModalBody>
			</Modal>

			<hr />
			<h2>Results</h2>
			<p>
				The best way to understand the results of this project are to go
				and view them on the site:{" "}
				<a href="https://www.OrchestrAI.site/compose">
					https://www.OrchestrAI.site/compose
				</a>
				. You can generate new tunes there with an OpenAI API key, or
				you can listen to some previously generated ABC notation tunes
				using software that can render it (one such place is also on my
				site:{" "}
				<a href="https://www.OrchestrAI.site/abcEditor">
					https://www.OrchestrAI.site/abcEditor
				</a>
				). You find some of the best results at{" "}
				<a href="https://www.OrchestrAI.site/portfolio">
					https://www.OrchestrAI.site/portfolio
				</a>
				.
			</p>
			<p>
				For a more analytical review of the results, rubric-graded
				results are provided below. Average overall quality fell between
				fine (3) and good (4) quality. The most satisfying aspects, in
				order, were the text descriptions, chords, mood, and melody,
				while harmony, notation, and lyrics left room for improvement.
				Notably, some compositions turned out well in nearly all aspects
				while others were crippled by failure to create clean, coherent
				syntax.
			</p>
			<img
				src={EvaluationResults}
				alt="Evaluation Results"
				className="img-fluid"
			/>
			<hr />
			<h2>Discussion</h2>
			<h3>Limitations</h3>
			<p>
				It was difficult to conduct this research without noticing
				several limitations of the methodology. For example, I mentioned
				above several reasons for the use of ABC notation however, ABC
				notation has limitations of its own. ABC notation was developed,
				and is largely used for annotation of folk music, and like
				nearly all public sources of written music, ABC notation
				datasets primarily consist of music written at least a century
				ago. This means that any ABC notation that modern LLMs happen to
				be trained on is highly skewed towards simplistic and frankly,
				uninteresting music. This is also at least partially due to the
				fact that if music is particularly complicated or intricate, it
				is unlikely to be represented in ABC notation as opposed to
				other formats. This I believe has resulted in LLMs being biased
				towards generating simplistic musical structure when prompted to
				write in ABC notation.
			</p>
			<p>
				While it can be shown that LLMs retain an incredible depth of
				knowledge of music theory it is difficult to coax into
				demonstrating that knowledge through the ABC notation medium. A
				large portion of my struggle in improving the interestingness of
				generated compositions consisted of pleading in every way that I
				could articulate for it to include any rhythm other than quarter
				notes and any musical direction other than stepwise motion. It
				is also the case that while GPT-4 had no trouble describing the
				rules and conventions of good voice leading (the rules that lead
				to good, or at least not unpleasant, harmonies), it struggled to
				implement these concepts in its generated output.
			</p>
			<p>
				Some other notable and recurring issues included filling
				measures with too many/too few beats, mismatching beats across
				voices, including contradicting chords in different voices,
				forgetting to put notes in the correct octave (likely due to the
				convoluted nature of octave representation in ABC notation),
				crossing voices (an easy-to-spot voice leading mistake), failing
				to line lyrics up with notes (this is an admittedly difficult
				task), and otherwise failing to generate consistency across
				voices.
			</p>
			<h3>Successes</h3>
			<p>
				While the end results are inconsistent and not well measured in
				comparison to other methods, I am immensely proud of the overall
				product. I believe this is the first ever successful(-ish)
				implementation of an LLM as a music composer. I also believe
				this is genuinely among one of the most useful tools created for
				music composition. I would have loved to have a tool like this
				when writing music for bands, and I think further improvements
				are very much within grasp.
			</p>
			<p>
				It is also worth mentioning that this is a completely insane
				project to be doing. I am using a language model to reason about
				music and wrangling its conjectures into real, playable music
				that is at least occasionally inspiring and beautiful! It is
				very cool to be alive right now, and I hope the future lives up
				to being as exhilarating as it looks to be headed.
			</p>
			<h3>Further Work</h3>
			<p>
				I am filled with ideas for the future relating to how this type
				of research could be expanded upon. A lot of improvement was
				made by tweaking the prompt that I provided to GPT-4, I have
				already tweaked it more since conducting the evaluation, and I
				think there are further improvements that can be made in that
				easy to update domain. I believe another 15% improvement is
				likely to result from working on this.
			</p>
			<p>
				Some of the most surprising improvements came from providing
				resources to the custom GPT. The sources I provided were simply
				more content created by the same LLM, but they helped in priming
				the results and overcoming the limitations of its related
				training data. My impression is that providing the knowledge
				base materials could help improve the compositions by another
				50%.
			</p>
			<p>
				Next is using a few shot learning approach. In particular,
				providing just a few example messages in the thread generates
				new results could help keep it much more on track. I observed
				this in a few unintentional circumstances, and intended to use
				this technique in the project before time limitations
				necessitated that I not. This would likely reduce the failures
				of the output by 90%, but it may also reduce the creativity -
				something that is particularly important in this use case.
			</p>
			<p>
				Perhaps the most obvious next improvement is fine-tuning. While
				fine-tuning is not yet available for GPT-4, it will be soon, and
				that is an obvious area to focus future efforts. Even just a
				little bit of fine-tuned training would likely improve this
				model especially given how strange the task I am asking of it is
				compared to most of its training. A lot of fine-tuning might
				make this as good a music generator as currently exists.
			</p>
			<p>
				Another future area I am excited about is using this kind of
				model for generating synthetic data. It seems that large,
				relevant musical datasets will be out of reach for many, many
				years, and some of the best generative music AIs are trained on
				just a few hundred compositions! Being that music generated with
				LLMs is necessarily public domain and original (my attempts to
				get LLMs to recreate or even recognize common songs have been
				entirely fruitless), there is a huge opportunity for creating a
				synthetic dataset of music that is not a century old, is not
				from low quality recordings, and has ample text related
				descriptions. This really may be the future of generative music
				notation AI.
			</p>
			<p>
				In future work, it may be worth revisiting other text based
				music notation formats. This could include music libraries for
				computer languages like music21, file formats like MusicXML or
				MIDI, or other text representations. There is a lot to explore
				here, and combining LLMs, code and other technologies could help
				elevate one of those notation techniques to helping compose or
				even record incredible music. More research could be done on
				analyzing what text representations LLMs are best at
				comprehending and best at expressing.
			</p>
			<p>
				Providing training data based on music21, or (note, duration)
				pairs may improve reliability in which case these formats may
				prove superior if LLMs are more adapt to reasoning in code
				(quite possible given the comparative abundance of code training
				data compared to music training data) or in small snippets which
				makes sense a priori. It may also be prudent to create a
				converter that translates syntax like (note, duration) pairs for
				ease of experimentation.Similarly, it would be worth exploring
				how other LLMs do compared to GPT-4. Other models can be fine
				tuned which is likely to provide a huge advantage with enough
				care for crafting good training data. I expect that a direct
				comparison of evaluations between models would be more
				enlightening than a single evaluation on its own.
			</p>
			<p>
				Finally, it is probably worth mentioning that AI and especially
				LLMs are improving at an exhilarating pace, and it may be the
				case that by the time any of this research is conducted in
				totality, new LLM technology will lap the music AI community in
				capabilities yet again.
			</p>
			<hr />
			<h2>Appendix</h2>
			<h3>Custom Prompt</h3>
			<p>
				OrchestrAI is an advanced AI composer specializing in ABC
				notation, focusing on producing longer musical pieces, with a
				beginning, middle and end, with a strong emphasis on technical
				music theory. It avoids creating short, simplistic tunes and
				ensures structural consistency by preventing mismatched beams
				and inconsistent pickup beats across voices. It does not include
				percussion instruments. OrchestrAI crafts compositions with
				rhythmically varied and harmonically rich elements, harmonizing
				voices, matching chords, and incorporating counter melodies and
				bass lines. It uses music theory to enhance compositions and
				includes lyrics when appropriate. It sets an appropriate tempo
				and sets the composer to "OrchestrAI". The GPT refrains from
				unnecessary explanations of ABC notation and does not include
				any text after the ABC notation, and focuses instead on coming
				up with interesting music theory ideas and then implementing
				them in the ABC notation section.
			</p>
		</Container>
	);
};

export default ResearchContent;
