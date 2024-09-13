import React, { useState } from "react";
import { Button, Container, Modal, ModalBody, ModalHeader } from "reactstrap";

import Rubric from "./Rubric";

import EvaluationResults from "../assets/images/EvaluationResults.png";

const ResearchContent = () => {
	const [modal, setModal] = useState(false);

	const toggle = () => setModal(!modal);

	return (
		<Container className="mt-5">
			<h1>
				Automated Music Composition with a Large Language Model - An
				Exploration
			</h1>
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
				The objective, for this project was to utilize the intelligence
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
				In order to address the goals of this research, a large language
				model and a text based music notation style needed to be
				selected. For the large language model, GPT-4 was chosen
				primarily due to its reputation as being the state-of-the-art
				language model in October-December of 2023 when this research
				was conducted{" "}
				<a href="https://huggingface.co/spaces/lmsys/chatbot-arena-leaderboard">
					Chatbot Arena Leaderboard
				</a>
				. This research also likely could have been conducted using
				other LLMs such as Claude from Anthropic or Llama from Meta, but
				such exploration fell outside the scope of this research and
				preliminary testing showed that other models often struggled to
				produce even coherent outputs.
			</p>
			<h3>Picking a Notation Style</h3>
			<p>
				The following formats were tested for text based music notation
				style: 1. ABC notation, 2. (note, duration) pairs (e.g. (“A4”,
				2) where “A4” represents the musical note A4, and 2 represents
				the duration of 2 beats), 3. Python code utilizing the music21
				library, and 4. MusicXML. In test runs, MusicXML was too verbose
				and resulted in invalid syntax and a dearth of musical content
				relative to the volume of text required. Similarly, music21 code
				frequently failed to compile making it difficult to test, and
				(note, duration) pairs were difficult to translate into a usable
				format. ABC notation and (note, duration) pairs provided the
				best preliminary results. Next, 8 identical prompts were used to
				compare the quality of compositions generated using ABC notation
				and (note, duration). No formal analysis was conducted on these
				results, but the resulting compositions can be found at{" "}
				<a href="https://www.OrchestrAI.site/juxcompose">
					https://www.OrchestrAI.site/juxcompose
				</a>
				. Based on the above, it was determined empirically that ABC
				notation produced the best results.
			</p>
			<h3>Creating an Interface</h3>
			<p>
				After making these determinations, an interface needed to be
				developed for replicable usage of the LLM and for translation of
				the LLM’s text based output. To this end, a web application was
				created utilizing web development languages and libraries
				including the open source ABCjs library which allows for
				in-browser rendering of audio-video enabled sheet music from ABC
				notation. For each composition, a different mood was requested
				to be expressed in the music. Upon submission, the prompt
				“Compose a tune that expresses the following mood: [provided
				mood]“ was sent to the API. After completion, the web
				application extracted the ABC notation, provided it in an
				editable text field, rendered the ABC notation as playable
				audio-video sheet music, and separately displayed any
				accompanying text that the model generated.
			</p>
			<h3>Customizing the Model</h3>
			<p>
				For the purpose of this project, a custom GPT-4-Turbo model was
				created using OpenAI’s Assistants API which was available in
				beta at the time. For customization, a custom prompt was
				provided which is available in the appendix of this report. The
				prompt discouraged common failures such as mismatched voices and
				encouraged proven competencies such as including chords and
				composing multiple sections.
			</p>
			<p>
				In addition to a custom prompt, 3 reference materials were added
				to provide a targeted knowledge base for the GPT. The first
				document was a web archive of the ABC notation Standards
				provided at{" "}
				<a href="https://abcnotation.com/wiki/abc:standard:v2.1">
					https://abcnotation.com/wiki/abc:standard:v2.1
				</a>
				. The other two documents were transcripts generated by GPT-4 on
				what makes a good melody and what makes good harmonization. The
				knowledge represented in these documents originated entirely
				from GPT-4.
			</p>
			<h3>Evaluation</h3>
			<p>
				In order to evaluate the results of this project, 20
				compositions were generated with varying request parameters and
				each was evaluated on 11 metrics: grade, notation, melody,
				harmony, chords, mood, lyrics, text, measures, duration, and
				voices. Measures was the number of musical measures written in
				the output, duration was the time that the tune took to play in
				the ABCjs interface, and voices was the number of voices (1
				through 4) included in the composition. All other metrics were
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
				The best way to understand the results of this research are to
				go and view them on its dedicated website:{" "}
				<a href="https://www.OrchestrAI.site/compose">
					https://www.OrchestrAI.site/compose
				</a>
				. The site allows visiters to generate new compositions, view
				them as sheet music, listen and watch them be played back, and
				edit them. It also allows for saving and sharing generated
				compositions. A curated selection of successful compositions
				generated by the model can also be viewed at{" "}
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
				several limitations of the methodology. Mentioned above are
				several reasons for the use of ABC notation however, ABC
				notation has limitations of its own. ABC notation was developed,
				and is largely used for annotation of folk music, and like
				nearly all public sources of written music, ABC notation
				datasets primarily consist of music written at least a century
				ago. This means that any ABC notation that modern LLMs happen to
				be trained on is highly skewed towards simplistic and frankly,
				uninteresting music. This is also at least partially due to the
				fact that if music is particularly complicated or intricate, it
				is unlikely to be represented in ABC notation as opposed to
				other formats. This may result in LLMs being biased towards
				generating simplistic musical structure when prompted to write
				in ABC notation.
			</p>
			<p>
				While it can be shown that LLMs retain an incredible depth of
				knowledge of music theory, it is difficult to demonstrate that
				knowledge through the ABC notation medium. A large portion of
				the tweaking phase of this research was focused on improving the
				interestingness of generated compositions and particularly on
				generating rhythms other than quarter notes and musical
				direction other than stepwise motion. It is also the case that
				while GPT-4 had no trouble describing the rules and conventions
				of good voice leading (the rules that lead to good, or at least
				not unpleasant, harmonies), it frequently failed to implement
				these rules in its compositions.
			</p>
			<p>
				Some other notable and recurring issues included filling
				measures with too many/too few beats, mismatching beats across
				voices, including contradicting chords in different voices,
				failing to put notes in the correct octave (likely due to the
				convoluted nature of octave representation in ABC notation),
				crossing voices (an easy-to-spot voice leading mistake), failing
				to line lyrics up with notes (this is an admittedly difficult
				task), and otherwise failing to generate consistency across
				voices.
			</p>
			<p>
				While there are many limitations to this research, it is the
				first of its kind and provides a strong foundation for future
				research. The resulting tool created by this research is also
				likely the first to accomplish any of the following: generate
				playable music from unrestricted text input, generate viewable
				music notation using a machine learning system, generate
				creative music output not based on a musical corpus, allow
				unrestricted input for music generation, and allow for
				composition editing and extension.
			</p>
			<h3>Further Work</h3>
			<p>
				Ultimately, while this research attempts to provide a high level
				view of the limitations and potential for using large language
				models in music composition, it provides neither a sufficiently
				deep inspection of these limitations nor a comprehensive
				exploration of the possible approaches that this line of
				research could take. There are many facets of large language
				models' understanding of written music that could be further
				scrutinized as well as many other applications of these models
				in music composition that could be explored.
			</p>
			<h4>Prompt and Resource Adjustments</h4>
			<p>
				Considerable progress was made in the quality of the output by
				tweaking the prompt that was provided. Some adjustments have
				already been implemented since this research was conducted, and
				there are likely further improvements that can be made in this
				easy to update domain. Marginal improvements are likely to
				result from a sufficient exploration of prompting techniques.
			</p>
			<p>
				Some of the more surprising improvements came from providing
				resources to the custom GPT. Furthermore, the sources provided
				were selected largely for expiedience and were in fact producted
				directly by the model itself. These resources likely helped in
				priming the results. Future research may explore iteratively
				providing professionally produced resources on music theory and
				notation standards.
			</p>
			<h4>Few Shot Learning</h4>
			<p>
				It was peripherally observed that the model was able to produce
				better results in contexts where successful examples were
				provided. While a few shot learning approach was not implemented
				in this research, it is likely to be a fruitful avenue for
				future research. However, given the importance of creativity in
				music generation, it is possible that this approach could limit
				the variability of output and thus limit visibility into what
				the best case scenarios generations could be.
			</p>
			<h4>Fine Tuning</h4>
			<p>
				Noteably, this research did not attempt to test a fine-tuned
				model. When this research was conducted, fine-tuning was not
				available for GPT-4 and other language models for which
				fine-tuning was available proved significantly less capable at
				generating music. While training data in the form of ABC
				notation may be a limiting factor, fine-tuning will likely
				provide a significant advantage in future research.
			</p>
			<h4>Synthetic Training Data</h4>
			<p>
				A novel approach that this method of music generation allows is
				the creation of synthetic training data. Standardized training
				data for music research is among the most difficult to come by,
				and generating new compositions has, perhaps until now, been
				infeasible outside of the most well funded research efforts.
				Many current generative music systems have been limited to music
				that is a century or more old, is from low quality recordings,
				or that has limited labeling data associated with it. Indeed,
				some of the best generative music systems are trained on just a
				few hundred compositions. Music generated by large language
				models and verified by human judges could be used to create a
				new dataset of music that has ample metadata, and is public
				domain and original by nature. This data could be useful for
				future iterations of this flavor of music generation as well as
				for other music generation tasks.
			</p>
			<h4>Other Text Based Music Notation Formats</h4>
			<p>
				In future work, it may be worth revisiting other text based
				music notation formats. This could include music libraries for
				computer languages like music21, file formats like MusicXML or
				MIDI, or other text representations. There is a wide space to be
				explored in this domain, and more research could be done on
				analyzing what text representations large language models are
				best at comprehending and best at expressing.
			</p>
			<h4>Comparative Evaluations</h4>
			<p>
				Providing training data based on music21, or (note, duration)
				pairs may improve reliability in which case these formats may
				prove superior if LLMs are more adapt to reasoning in code
				(quite possible given the comparative abundance of code training
				data compared to music training data) or in small snippets which
				makes sense a priori. It may also be prudent to create a
				converter that translates syntax like (note, duration) pairs for
				ease of experimentation. Similarly, it would be worth exploring
				how other large language models perform at similar tasks when
				compared to GPT-4. Other models can be fine tuned which is
				likely to provide an important advantage with enough care for
				crafting good training data. Furthermore, a direct comparison of
				evaluations between models may be more enlightening than a
				single evaluation as conducted above.
			</p>
			<h4>Future Models</h4>
			<p>
				Finally, as large language models continue to improve, these
				capabilities may need to be reassessed. It is possible that the
				limitations of this current iteration may soon be address be
				better models with improved reasoning capabilities.
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
