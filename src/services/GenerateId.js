// Generates a unique(-ish) ID
export default function GenerateId() {
	const timestamp = Date.now().toString(36); // Convert timestamp to base 36 for a compact representation
	// const randomString = Math.random().toString(36).substring(2, 8); // Generate a random string and take 6 characters
	// return `${timestamp}-${randomString}`;
	return `${timestamp}`;
}
