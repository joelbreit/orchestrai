// Helper function to calculate the cumulative distribution function (CDF)
function cdf(x, mean, stdDev) {
	// Z-score calculation
	const z = (x - mean) / stdDev;

	// Approximation of the CDF using the error function (erf)
	return 0.5 * (1 + mathErf(z / Math.SQRT2));
}

// Approximation of the error function (erf)
function mathErf(x) {
	// Using Abramowitz and Stegun approximation for erf
	const sign = (x >= 0) ? 1 : -1;
	x = Math.abs(x);

	const a1 = 0.254829592;
	const a2 = -0.284496736;
	const a3 = 1.421413741;
	const a4 = -1.453152027;
	const a5 = 1.061405429;
	const p = 0.3275911;

	const t = 1.0 / (1.0 + p * x);
	const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

	return sign * y;
}

// Example usage
const mean = 40.38;
const stdDev = 16.30;

function getPercentile(generationDuration) {
	return cdf(generationDuration, mean, stdDev);
}

// Test the function with an example
const result = getPercentile(30); // for generationDuration = 45
console.log(result); // This will return a value between 0 and 1

