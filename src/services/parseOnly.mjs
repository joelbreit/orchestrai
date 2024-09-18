
import abcjs from "abcjs";


const abcNotation = `X:1
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
"D" D,2F,A, D2F,2|"G" G,2B,D G2B,2|"A7" A,2CE A2C2|"D" D,2A,,2 D,4:|`;

const thing = abcjs.parseOnly(abcNotation);

console.log(thing);