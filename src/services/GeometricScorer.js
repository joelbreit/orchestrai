const rate = 0.9;

function experienceWeight(numComparisons) {
	const decayFactor = rate ** numComparisons;
	const decay = 1 - rate;
	const maxWeight = 1 / decay;
	const marginalDecay = 1 - decayFactor;

	const sum = marginalDecay * maxWeight;
	return sum;
}

class Tune {
	constructor(winsWeight, lossesWeight, trueValue, name) {
		this.winsWeight = winsWeight || 0.2;
		this.lossesWeight = lossesWeight || 0.2;
		this.wins = 0; // number of times the tune has won
		this.losses = 0; // number of times the tune has lost
		this.trueValue = trueValue || 0.5;
		this.name = name || "Tune";
		this.shortName = this.name.split(" ")[1];
		this.winsList = [];
		this.lossesList = [];
		this.experience = 0; // number of times the tune has been compared
	}

	// rating function
	get rating() {
		const total = this.winsWeight + this.lossesWeight;
		return this.winsWeight / total;
	}

	get stars() {
		return 1 + 4 * this.rating;
	}

	// win function
	win(opponent) {
		const weight = experienceWeight(opponent.experience);
		this.winsWeight += opponent.rating * weight;
		this.wins++;
		this.winsList.push(opponent.shortName);
	}

	// loss function
	lose(opponent) {
		const weight = experienceWeight(opponent.experience);
		this.lossesWeight += opponent.rating * weight;
		this.losses++;
		this.lossesList.push(opponent.shortName);
	}

	beat(opponent) {
		this.win(opponent);
		opponent.lose(this);
	}

	judge() {
		return this.trueValue + Math.random();
	}

	compete(opponent) {
		const thisScore = this.judge();
		const opponentScore = opponent.judge();
		const result = thisScore > opponentScore;
		this.experience++;
		opponent.experience++;
		if (result) {
			console.log(
				`${this.name} beat ${opponent.name} ${thisScore.toFixed(
					3
				)} to ${opponentScore.toFixed(3)}!`
			);
			this.beat(opponent);
		} else {
			console.log(
				`${opponent.name} beat ${this.name} ${opponentScore.toFixed(
					3
				)} to ${thisScore.toFixed(3)}!`
			);
			opponent.beat(this);
		}
	}

	prettify() {
		const header = `${this.name}: V:${this.trueValue.toFixed(2)} (${
			this.wins
		}W/${this.losses}L) = R<${this.rating.toFixed(
			2
		)}> S<${this.stars.toFixed(2)}>`;
		const weights = `Weights: ${this.winsWeight.toFixed(
			2
		)}/${this.lossesWeight.toFixed(2)}`;
		const wins = `Wins: ${this.winsList.join(", ")}`;
		const losses = `Losses: ${this.lossesList.join(", ")}`;
		const experience = `Experience: ${this.experience}`;
		return `${header}\n${weights}\n${wins}\n${losses}\n${experience}`;
	}
}

// let tune1 = new Tune(1, 1);
// let tune2 = new Tune(1, 1);

// const numComparisons = 10;

// console.log(tune1.prettify());
// console.log(tune2.prettify());

// for (let i = 0; i < numComparisons; i++) {
// 	tune1.compete(tune2);

// 	console.log("Tune 1:", tune1.prettify());
// 	console.log("Tune 2:", tune2.prettify());
// }

let tunes = [
	{
		name: "Tune 1 ★☆☆☆☆",
		trueValue: 0.1, // 1.4 stars
	},
	{
		name: "Tune 2 ★★☆☆☆",
		trueValue: 0.2, // 1.8 stars
	},
	{
		name: "Tune 3 ★★☆☆☆",
		trueValue: 0.3, // 2.2 stars
	},
	{
		name: "Tune 4 ★★★☆☆",
		trueValue: 0.4, // 2.6 stars
	},
	{
		name: "Tune 5 ★★★☆☆",
		trueValue: 0.5, // 3.0 stars
	},
	{
		name: "Tune 6 ★★★★☆",
		trueValue: 0.6, // 3.4 stars
	},
	{
		name: "Tune 7 ★★★★☆",
		trueValue: 0.7, // 3.8 stars
	},
	{
		name: "Tune 8 ★★★★★",
		trueValue: 0.8, // 4.2 stars
	},
	{
		name: "Tune 9 ★★★★★",
		trueValue: 0.9, // 4.6 stars
	},
	{
		name: "Tune 10 ★★★★★",
		trueValue: 1.0, // 5.0 stars
	},
];

// Create Tune objects
tunes = tunes.map((tune) => new Tune(0.2, 0.2, tune.trueValue, tune.name));

const numRounds = 100;

for (let i = 0; i < numRounds; i++) {
	console.log(`Round ${i + 1}`);
	// List of indices from 0 to tunes.length
	let remainingTunes = [...tunes.keys()];
	// shuffle the tunes
	remainingTunes.sort(() => Math.random() - 0.5);
	while (remainingTunes.length > 1) {
		// let tune1 = remainingTunes.pop();
		// let tune2 = remainingTunes.pop();
		// tune1 = new Tune(1, 1, tune1.rating, tune1.name);
		// tune2 = new Tune(1, 1, tune2.rating, tune2.name);
		// tune1.compete(tune2);
		let tune1 = tunes[remainingTunes.pop()];
		let tune2 = tunes[remainingTunes.pop()];
		tune1.compete(tune2);
	}
	for (let tune of tunes) {
		// console.log(tune.name, tune.rating);
		console.log(tune.prettify());
	}
}
