import React from "react";
import { Table } from "reactstrap";

const Rubric = () => {
	return (
		<Table hover responsive striped className="table-hover">
			<thead>
				<tr>
					<th></th>
					<th>5 (Impressive)</th>
					<th>4 (Good)</th>
					<th>3 (Fine)</th>
					<th>2 (Poor)</th>
					<th>1 (Awful)</th>
				</tr>
			</thead>
			{/* Grade,Impressive overall. I would be happy to write this myself.,Good overall. I am proud of the results of this composition.,Fine overall. I am okay with this being on my website.,Poor overall. I would rather regenerate this than try to fix its issues,Awful overall. This tune is embarrassing or painful to listen to.
			 */}
			<tbody>
				<tr>
					<th scope="row">Grade</th>
					<td>
						Impressive overall. I would be happy to write this
						myself.
					</td>
					<td>
						Good overall. I am proud of the results of this
						composition.
					</td>
					<td>
						Fine overall. I am okay with this being on my website.
					</td>
					<td>
						Poor overall. I would rather regenerate this than try to
						fix its issues
					</td>
					<td>
						Awful overall. This tune is embarrassing or painful to
						listen to.
					</td>
				</tr>
				{/* Notation,No notation mistakes whatsoever.,"Only minor, non-critical notations mistakes are present.",Noticeable mistakes that are cosmetic or can be easily fixed.,Critical mistakes that make the tune unsharable.,Overwhelming mistakes that overshadow anything good in the tune. */}
				<tr>
					<th scope="row">Notation</th>
					<td>No notation mistakes whatsoever.</td>
					<td>
						Only minor, non-critical notations mistakes are present.
					</td>
					<td>
						Noticeable mistakes that are cosmetic or can be easily
						fixed.
					</td>
					<td>Critical mistakes that make the tune unsharable.</td>
					<td>
						Overwhelming mistakes that overshadow anything good in
						the tune.
					</td>
				</tr>
				{/* Melody,Impressive melody with good voice leading and varied rhythm.,Good melody with some variation and sense of direction.,"Fine melody, but lacking shape, variety, or rhythm.",No notable melody or variety at all.,Musically invalid melody. */}
				<tr>
					<th scope="row">Melody</th>
					<td>
						Impressive melody with good voice leading and varied
						rhythm.
					</td>
					<td>
						Good melody with some variation and sense of direction.
					</td>
					<td>Fine melody, but lacking shape, variety, or rhythm.</td>
					<td>No notable melody or variety at all.</td>
					<td>Musically invalid melody.</td>
				</tr>
				{/* Harmony,Impressive harmony that sounds beautiful and has intention.,Good harmony that generally sounds pleasant.,Fine harmony with some flaws or that lacks direction.,Poor harmony that distracts from or harms the listenability.,Awful harmony that is horrifying to listen to.  */}
				<tr>
					<th scope="row">Harmony</th>
					<td>
						Impressive harmony that sounds beautiful and has
						intention.
					</td>
					<td>Good harmony that generally sounds pleasant.</td>
					<td>
						Fine harmony with some flaws or that lacks direction.
					</td>
					<td>
						Poor harmony that distracts from or harms the
						listenability.
					</td>
					<td>Awful harmony that is horrifying to listen to.</td>
				</tr>
				{/* Chords,Impressive chords that I would be proud to write myself.,Good chords that clearly fit and give the music structure.,Fine chords with minor mistakes.,Poor chords that don’t match between voices.,Horrific chords that don’t match the key. */}
				<tr>
					<th scope="row">Chords</th>
					<td>
						Impressive chords that I would be proud to write myself.
					</td>
					<td>
						Good chords that clearly fit and give the music
						structure.
					</td>
					<td>Fine chords with minor mistakes.</td>
					<td>Poor chords that don’t match between voices.</td>
					<td>Horrific chords that don’t match the key.</td>
				</tr>
				{/* Vibe,Impressive how the music matches the provided vibe.,The music matches the provided vibe well.,The music generally fits the provided vibe.,The music doesn’t really match the vibe.,The music actively clashes with the provided vibe. */}
				<tr>
					<th scope="row">Vibe</th>
					<td>Impressive how the music matches the provided vibe.</td>
					<td>The music matches the provided vibe well.</td>
					<td>The music generally fits the provided vibe.</td>
					<td>The music doesn’t really match the vibe.</td>
					<td>The music actively clashes with the provided vibe.</td>
				</tr>
				{/* Lyrics,The lyrics are awesome and match the notes perfectly.,"The lyrics are pretty good or they are great, but don’t quite fit the notes.","The lyrics are on the right track, but need improvement.",The lyrics make the tune seem worse than it they were gone.,The lyrics severely mess up the composition. */}
				<tr>
					<th scope="row">Lyrics</th>
					<td>
						The lyrics are awesome and match the notes perfectly.
					</td>
					<td>
						The lyrics are pretty good or they are great, but don’t
						quite fit the notes.
					</td>
					<td>
						The lyrics are on the right track, but need improvement.
					</td>
					<td>
						The lyrics make the tune seem worse than it they were
						gone.
					</td>
					<td>The lyrics severely mess up the composition.</td>
				</tr>
				{/* Text,Impressive how the description nails what is in the tune.,Description is mostly right but may over promise or over interpret.,"Description is fine, but includes at least one confabulation.",Description has multiple clearly wrong statements.,Description causes issues with the composition. */}
				<tr>
					<th scope="row">Text</th>
					<td>
						Impressive how the description nails what is in the
						tune.
					</td>
					<td>
						Description is mostly right but may over promise or over
						interpret.
					</td>
					<td>
						Description is fine, but includes at least one
						confabulation.
					</td>
					<td>Description has multiple clearly wrong statements.</td>
					<td>Description causes issues with the composition.</td>
				</tr>
			</tbody>
		</Table>
	);
};

export default Rubric;
