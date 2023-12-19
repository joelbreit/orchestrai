
const ABCNotations = {
    "Swing Dance Party NoteDur": 
`X:1
T:Swing Party
M:4/4
L:1/8
Q:1/4=160
K:C
%%MIDI program 1
P:A
|: c2 e2 g2 e2 | f4 e4 | d2 cB A2 G2 |1 E4 E4 :|2 E4 E2 G2 |
|: A2 c2 e2 c2 | G4 F4 | E2 EG F2 ED | C4 C4 :|
P:B
|: A2 GA B2 BA | G2 FG A2 GA | E2 EG F2 ED | C4 C4 :|`,
    "Pirate's Horizon": 
`X:1
T:Pirate's Horizon
C:Generated with AI!
M:4/4
L:1/8
Q:1/4=120
K:Dm
V:1 clef=treble
V:2 clef=treble
V:3 clef=bass
% The Melody
V:1
|:"Dm"D2A2 A2d2|f2e2 d4|"C"c2G2 G2c2|"Am"e2d2 c4|
"Dm"d2f2 a2f2|"Gm"g2f2 e4|"A7"c2e2 a2g2|"Dm"f2d2 d4:|
|:"Dm"A2d2 f2a2|"C"e2c2 "G/B"d4|"Am"c2e2 g2e2|"Dm"f2d2 A4|
"F"A2c2 f2a2|"C"e2c2 "A7"e4|"Dm"d2f2 "A7"a2g2|"Dm"f2d2 d4:|
% The Counter Melody
V:2
|:"Dm"F2A2 c2A2|a2g2 f4|"C"c2E2 G2E2|"Am"A2G2 F4|
"Dm"F2A2 c2A2|"Gm"B2A2 G4|"A7"E2G2 c2B2|"Dm"A2F2 F4:|
|:"Dm"A2d2 c2A2|"C"G2E2 "G/B"F4|"Am"E2G2 A2F2|"Dm"D2F2 D4|
"F"C2E2 F2A2|"C"G2E2 "A7"G4|"Dm"D2F2 "A7"A2G2|"Dm"F2D2 D4:|
% The Bass Line
V:3
|:"Dm"D4 A,4|D4 F4|"C"E4 C4|"Am"A,4 E4|
"Dm"D4 A,4|"Gm"G,4 B,4|"A7"E4 C4|"Dm"D4 A,4:|
|:"Dm"A,4 A,4|"C"E4 C4|"G/B"G,4 B,4|"Am"A,4 E4|
"F"F4 C4|"C"E4 C4|"A7"E4 C4|"Dm"D4 A,4:|`,
    "Brass Band Road Trip ABC": 
`X:1
T:Road Trip Adventure
C:AI Composer
M:4/4
L:1/8
K:Bb
|: "Bb"D2 F2 G2 A2 | B4 B2 A2 | "Eb"G2 E2 F2 G2 | "F"F6 z2 |
|: "Bb"D2 B2 B2 c2 | d4 d2 c2 | "Eb"B2 G2 G2 A2 | "Bb"B6 z2 :|
|: "Gm"G2 B2 d2 g2 | "F"A4 A2 G2 | "Eb"G2 E2 C2 G,2 | "Bb"B,6 z2 :|
|: "Bb"D2 F2 G2 A2 | B4 B2 A2 | "Eb"G2 E2 F2 G2 | "F"F6 z2 :|
|: "Bb"D2 B2 B2 c2 | d4 d2 c2 | "Eb"B2 G2 G2 A2 | "Bb"B6 z2 :|`,
"Brass Band Road Trip NoteDur":
`X:1
T:Road Trip Adventure
M:4/4
L:1/8
K:Cmaj
%%staves {Trumpet1 Trumpet2} {Horn1 Horn2} {Trombone1 Trombone2} Tuba
V:Trumpet1 clef=treble
V:Trumpet2 clef=treble
V:Horn1 clef=treble
V:Horn2 clef=treble
V:Trombone1 clef=bass
V:Trombone2 clef=bass
V:Tuba clef=bass

% Introduction
[V:Trumpet1] C2 E2 | G2 c2 |
[V:Horn1] G,4 | E,4 |

% Main Theme
[V:Trumpet1] D2 F2 | A2 d2 |
[V:Trombone1] F2 A2 | B,2 D2 |
[V:Tuba] D,4 | F,4 |

% Bridge
[V:Trombone1] G,4 | E,4 | C,4 | G,,4 |
[V:Tuba] C,,8 | G,,8 |

% Climax
[V:Trumpet1] G4 B4 | d4 f4 |
[V:Horn1] C2 E2 | G2 B2 |
[V:Tuba] G,2 E,2 | C,2 G,,2 |

% Conclusion
[V:Trumpet1] c2 A2 | F2 D2 |
[V:Trombone1] F,4 | D,4 |
[V:Tuba] C,,8 | G,,8 |`,
"Quarantine String Quartet ABC":
`X:1
T:Quarantine
C:AI Composer
M:4/4
L:1/8
Q:1/4=50
K:Dmin
V:1 
A,4 D4 | F4 A4 | d6 c2 | B6 A2 | G4 F4 | E6 D2 | C8 | D8 |
V:2 
F,4 A,4 | C4 E4 | A,6 G,2 | F,6 E,2 | D,4 C,4 | B,,6 A,,2 | G,,8 | A,,8 |
V:3 
D2 F2 A2 d2 | c2 A2 F2 D2 | B,2 D2 G2 B2 | A2 F2 E2 C2 | D2 C2 B,2 A,2 | G,4 F,4 | E,8 | D8 |
V:4 
D,8 | A,,8 | D,8 | A,,8 | D,8 | A,,8 | D,8 | D,8 |`,
"Quarantine String Quartet NoteDur":
`X:1
T:Quarantine Reflections
C:Anonymous
M:4/4
L:1/8
K:Cmaj
%%staves {V1 V2 Va Vc}
V:V1 name="Violin 1"
[V:V1] E2 G2 F4 | DE F2 E4 |
V:V2 name="Violin 2"
[V:V2] C4 A,4 | G2 A2 B2 A2 |
V:Va name="Viola"
[V:Va] A2 B2 C4 | E8 |
V:Vc name="Cello"
[V:Vc] G,8 | D,8 |
V:V1
[V:V1] B2 A2 G4 | E2 F2 G2 F2 |
V:V2
[V:V2] D4 C4 | B2 C2 D2 C2 |
V:Va
[V:Va] G2 A2 B4 | C8 |
V:Vc
[V:Vc] A,8 | E,8 |
V:V1
[V:V1] C2 B2 A4 | G2 A2 B2 A2 |
V:V2
[V:V2] E4 D4 | C2 D2 E2 D4 |
V:Va
[V:Va] B2 A2 G4 | F8 |
V:Vc
[V:Vc] B,8 | G,8 |`,
"Sadness to Joy Marching Band ABC":
`M:4/4
L:1/8
K:Gmin
G2 A2 B2 c2 | d4 d4 | e2 f2 g2 a2 | b4 b4 |
c2 B2 A2 G2 | F4 F4 | G2 A2 B2 c2 | d4 d4 |
K:Gmaj
e2 f2 g2 a2 | b4 b4 | c2 d2 e2 f2 | g4 g4 |
a2 b2 c'2 d'2 | e'4 e'4 | f'2 g'2 a'2 b'2 | c''4 c''4 |
d''2 c''2 b'2 a'2 | g'4 g'4 | f'2 e'2 d'2 c'2 | B4 B4 |
A2 G2 F2 E2 | D4 D4 | C2 B2 A2 G2 | F4 F4 |`,
"Sadness to Joy Marching Band NoteDur":
`X:1
T:Journey from Sadness to Joy
C:Anonymous
M:4/4
L:1/8
K:Cmin
V:Flute clef=treble
V:Clarinet clef=treble
V:Alto_Sax clef=treble
V:Trumpet clef=treble
[V:Flute] G2 F2 E4 | G2 F2 E4 | A1 B1 c1 d1 | e1 f1 g1 a1 | c2 d2 e2 f2 || 
[V:Clarinet] C2 B,2 A,4 | C2 B,2 A,4 | F1 G1 A1 B1 | c1 d1 e1 f1 | A2 B2 c2 d2 || 
[V:Alto_Sax] E2 D2 C4 | E2 D2 C4 | c1 d1 e1 f1 | g1 a1 b1 c'1 | e2 f2 g2 a2 || 
[V:Trumpet] A2 G2 F4 | A2 G2 F4 | G1 A1 B1 c1 | d1 e1 f1 g1 | B2 c2 d2 e2 ||`,
"Brass Trio Celebration ABC":
`X:1
T:Triumphal Fanfare
C:AI Composer
M:4/4
L:1/8
K:C
V:1 clef=treble name="Trumpet 1"
V:2 clef=treble name="Trumpet 2"
V:3 clef=bass name="Trombone"
% Trumpet 1
V:1
!f! | c2 e2 g2 a2 | b2 a2 g2 e2 | d'2 c'2 b2 a2 | g4 a4 |
| c2 e2 g2 a2 | b2 a2 g2 e2 | d'2 c'2 b2 a2 | c'4 !fermata!z4 |
% Trumpet 2
V:2
z | e2 e2 f2 g2 | a2 g2 f2 d2 | c'2 b2 a2 g2 | e4 f4 |
| e2 e2 f2 g2 | a2 g2 f2 d2 | c'2 b2 a2 g2 | e4 !fermata!z4 |
% Trombone
V:3
z | C2 C2 E2 G2 | A2 G2 E2 C2 | G2 F2 E2 D2 | C4 D4 |
| C2 C2 E2 G2 | A2 G2 E2 C2 | G2 F2 E2 D2 | C4 !fermata!z4 |`,
"Brass Trio Celebration NoteDur":
`X: 1
T: Triumphant Celebration
M: 4/4
L: 1/4
Q: 1/4=120
K: C
%%score (T | H | B)
V: T clef=treble
V: H clef=treble-8
V: B clef=bass
% Trumpet Part
V: T
|: c d e g | g2 e2 | d e f g | g>f e2 :|
% Horn Part
V: H
|: G A B d | d2 B2 | A B c d | d>c B2 :|
% Trombone Part
V: B
|: G, A, B, D | D2 B,2 | A, B, C D | D>C B,2 :|`,
"3-part Pirates ABC":
`X:1
T:Pirate's Horizon
C:AI Composer
M:4/4
L:1/8
Q:1/4=120
K:Dm
% The main melody
V:1 clef=treble
|: "Dm"d2A2 A2fd | "C"e2G2 G2ec | "Bb"A2F2 F2Bd | "A"A2E2 E4 |
"Dm"d2A2 A2fd | "C"e2G2 G2ec | "Bb"A2F2 "A"E2D2 |1 "Dm"D4 D4 :|2 "Dm"D4 z4 |
% The counter melody
V:2 clef=treble
|: "Dm"A2d2 f2a2 | "C"g2e2 e2g2 | "Bb"f2d2 d2f2 | "A"e2^c2 c4 |
"Dm"A2d2 f2a2 | "C"g2e2 e2g2 | "Bb"f2d2 "A"e2^c2 |1 "Dm"d4 d4 :|2 "Dm"d4 z4 |
% The bass line
V:3 clef=bass
|: "Dm"D4 F4 | "C"E4 G4 | "Bb"B,4 D4 | "A"A,4 E4 |
"Dm"D4 F4 | "C"E4 G4 | "Bb"B,4 "A"C4 |1 "Dm"D4 D4 :|2 "Dm"D4 z4 |`,
"3-part Pirates NoteDur":
`X:1
T:Pirate's Theme
M:4/4
L:1/8
Q:1/4=120
K:Dmin
%%score (T1 T2) B
V:T1           clef=treble-8
V:T2           clef=treble
V:B            clef=bass
% 1. Melody
[V:T1] D4 A3 B3 | A4 G3 A3 | D3 D2 z4 | F4 D3 E3 | F4 E3 D3 | C3 C2 z4 |
% 2. Counter Melody
[V:T2] A4 G3 A3 | B4 A3 G3 | F3 F2 z4 | D4 B3 A3 | G4 F3 E3 | D3 D2 z4 |
% 3. Bass Line
[V:B]  D2 z2 C2 z2 | B,2 z2 A,2 z2 | D2 z2 G,2 z2 | A,2 z2 D2 z2 |`,
"Pirates Trio ABC":
`X:1
T:Pirate's Horizon
C:AI Composer
M:4/4
L:1/8
Q:1/4=120
K:Dm
V:1 clef=treble
V:2 clef=treble
V:3 clef=bass
% The Melody
V:1
|:"Dm"D2A2 A2d2|f2e2 d4|"C"c2G2 G2c2|"Am"e2d2 c4|
"Dm"d2f2 a2f2|"Gm"g2f2 e4|"A7"c2e2 a2g2|"Dm"f2d2 d4:|
|:"Dm"A2d2 f2a2|"C"e2c2 "G/B"d4|"Am"c2e2 g2e2|"Dm"f2d2 A4|
"F"A2c2 f2a2|"C"e2c2 "A7"e4|"Dm"d2f2 "A7"a2g2|"Dm"f2d2 d4:|
% The Counter Melody
V:2
|:"Dm"F2A2 c2A2|a2g2 f4|"C"c2E2 G2E2|"Am"A2G2 F4|
"Dm"F2A2 c2A2|"Gm"B2A2 G4|"A7"E2G2 c2B2|"Dm"A2F2 F4:|
|:"Dm"A2d2 c2A2|"C"G2E2 "G/B"F4|"Am"E2G2 A2F2|"Dm"D2F2 D4|
"F"C2E2 F2A2|"C"G2E2 "A7"G4|"Dm"D2F2 "A7"A2G2|"Dm"F2D2 D4:|
% The Bass Line
V:3
|:"Dm"D4 A,4|D4 F4|"C"E4 C4|"Am"A,4 E4|
"Dm"D4 A,4|"Gm"G,4 B,4|"A7"E4 C4|"Dm"D4 A,4:|
|:"Dm"A,4 A,4|"C"E4 C4|"G/B"G,4 B,4|"Am"A,4 E4|
"F"F4 C4|"C"E4 C4|"A7"E4 C4|"Dm"D4 A,4:|`,
"Pirates Trio NoteDur":
`X:1
T:Pirate Theme - Melody
M:4/4
K:C
L:1/16
V:1 clef=treble
C2E2 GAF2 E2D2 | C2E2 G4 A2G2F2 | E2F2 G2E2 D2C2 | B,2C2 ||
V:2 clef=treble
GAB2 cBAG F2A2 | B2c2 d2c2 B2A2G2 | F2G2 A2G2 F2E2 | D2E2 ||
V:3 clef=bass
C,EGC, C,EGC, | E,G,C,E, E,G,C,E, | D,F,AD, D,F,AD, ||`,
"Rebellious Mambo ABC":
`X:1
T:Rebel Mambo
M:4/4
L:1/8
Q:1/4=120
K:Cmaj
P:A
V:1 treble
V:2 treble
V:3 bass
% Voice 1 - Melody
[V:1] z4 G4 | A2 AB c4 | d2 dc BAG2 | G6 z2 |
G2 G2 A2 F2 | G4 E4 | D2 DE FG A2 | G6 z2 |
% Voice 2 - Counter Melody
[V:2] z4 c4 | e2 ef g4 | a2 ag fed2 | c6 z2 |
c2 c2 d2 A2 | c4 B4 | G2 GA Bc d2 | c6 z2 |
% Voice 3 - Bass Line
[V:3] C,4 C,4 | D,2 D,2 E,4 | F,2 F,2 G,2 G,2 | C,6 z2 |
C,4 C,4 | D,2 D,2 E,4 | F,2 F,2 G,2 G,2 | C,6 z2 |`,
"Rebellious Mambo NoteDur":
`X:1
T:Rebellion Mambo
M:4/4
L:1/8
Q:1/4=120
K:Cmaj
V:V1 name="Melody"
V:V2 name="Counter Melody"
V:V3 name="Bass Line"
[V:V1] c2 |:  e2 g4 z2 | g2 f1 e5 :|
[V:V2] z2 |: A4 G2 F2 | E2 D2 C4 :|
[V:V3] z2 |: C4 E4 | G,8 | C,8 :|`,
"Show Choir Sandess to Joy ABC":
`X:1
T:From Sadness to Joy
M:4/4
L:1/8
Q:1/4=60
K:Amin
V:M name="Melody" clef=treble
V:CM name="Counter Melody" clef=treble
V:B name="Bass" clef=bass
% 8 bars of sadness in A minor
[V:M] z4 A2 B2 | c4 B2 A2 | G4 E2 F2 | E4 D2 C2 |
[V:M] A,4 C2 E2 | D4 C2 B,2 | A,6 z2 |1 E4 F2 G2 :|2 E4 F2 A2 |
[V:CM] E4 F2 G2 | A4 G2 F2 | E4 C2 D2 | C4 B,2 A,2 |
[V:CM] C4 E2 G2 | F4 E2 D2 | C6 z2 |1 A,4 G2 F2 :|2 A,4 G2 A2 |
[V:B] A,4 A,2 B,2 | C4 B,2 A,2 | G,4 E2 F2 | E4 D2 C2 |
[V:B] A,2 A,2 A,2 C2 | D4 C2 B,2 | A,6 z2 |1 E4 F2 G2 :|2 E4 F2 A,2 |
% Transition measures
[V:M] E4 c2 B2 | A4 G2 F2 | E4 c2 d2 | c4 B2 A2 |
[V:CM] C4 E2 F2 | G4 F2 E2 | C4 E2 F2 | E4 D2 C2 |
[V:B] C2 C2 C2 E2 | F2 F2 E2 D2 | C2 C2 C2 E2 | E2 E2 D2 C2 |
% 8 bars of joy in A Major
Q:1/4=120
K:Amaj
[V:M] z4 A2 ^c2 | d4 e2 f2 | e4 ^c2 d2 | ^c4 B2 A2 |
[V:M] A,4 E2 A2 | B4 A2 ^G2 | A6 z2 |1 E4 F2 ^G2 :|2 E4 F2 A2 |
[V:CM] E4 F2 ^G2 | A4 ^G2 F2 | E4 A2 B2 | B4 A2 ^G2 |
[V:CM] A,4 E2 A2 | B4 A2 F2 | A6 z2 |1 C4 D2 E2 :|2 C4 D2 A2 |
[V:B] A,4 A,2 B,2 | C4 B,2 A,2 | E,4 A,2 B,2 | B,4 A,2 ^G,2 |
[V:B] A,2 A,2 E2 A,2 | B,4 A,2 ^F,2 | A,6 z2 |1 E4 F2 ^G2 :|2 E4 F2 A,2 |`,
"Show Choir Sandess to Joy NoteDur":
`X:1
T:From Sadness to Joy
M:4/4
L:1/8
Q:1/4=60
K:Cmin
"Cm" C4 E4 G2 | A4 F4 E2 | D4 F4 A2 | G8 | 
"Cm" C2 D2 E4 G4 | E2 F2 G4 A4 | G2 A2 B4 c4 | A4 F4 |
"Dm" C2 E2 G2 E2 | G2 A2 G2 E2 | C2 G2 E2 C2 | D2 G2 F2 D2 |
"CM" C8 | 
"CM" E2 G2 c2 G2 | E2 G2 c2 G2 | D2 G2 B2 G2 | C2 E2 A2 E2 | G8 |`,
"Barbershop Quartet Victory ABC":
`X:1
T:Victory Song
C:AI Composer
M:4/4
L:1/4
Q:1/4=120
K:C
%%score (T1 T2) (B1 B2)
V:T1           clef=treble-8
V:T2           clef=treble-8
V:B1           clef=bass
V:B2           clef=bass
% Voice lead - Typically the main melody in a barbershop quartet
[V:T1]
G | c B A G | E2 G2 | c B A G | E4 |
[V:T2] 
(E | G) F E D | C2 E2 | G F E D | C4 |
[V:B1]
C, | E, F, G, A, | B,,2 E,2 | G, A, B, C | G,,4 |
[V:B2]
(C | E) D C B, | A,2 C2 | E D C B, | G,,4 |
% Now a harmony that would be typical of barbershop
[V:T1] G | c B A G | E2 G2 | c B A G | E4 |
[V:T2] (E | G) F E D | C2 E2 | G F E D | C4 |
[V:B1] C, | E, F, G, A, | B,,2 E,2 | G, A, B, C | G,,4 |
[V:B2] (C | E) D C B, | A,2 C2 | E D C B, | G,,4 |
% Ending with a typical barbershop tag
[V:T1] G | c3 B | c2 E2 | G4- | G4 |
[V:T2] (E | G)3 F | E2 C2 | E4- | E4 |
[V:B1] C, | E,3 F, | G,2 B,,2 | C4- | C4 |
[V:B2] (C | E)3 D | C2 A,2 | C4- | C4 |`,
"Barbershop Quartet Victory NoteDur":
`X:1
T:Victory Song
C:Traditional Barbershop
M:4/4
L:1/8
Q:1/4=120
K:C
G2 A B c B A G2 | E4 D2 E F G F E D | C2 E G A B G A2 | G2 G A B c B A G | F4 G2 E4 |]`,

    
};

export default ABCNotations;