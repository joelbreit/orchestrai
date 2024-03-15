// Date is formatted as YYYY-MM-DD mm:hh:ss, but some are missing the time.
// If the date is today, display "Today" instead of the date.
// If the date is yesterday, display "Yesterday" instead of the date.
// If the date is in the last 6 days, display the weekday instead of the date.
// If the date is more than 6 days ago, display the date without the time.

export function formatDate(dateString) {
	const date = new Date(dateString);
	const today = new Date();
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);

	if (date.toDateString() === today.toDateString()) {
		return "Today";
	} else if (date.toDateString() === yesterday.toDateString()) {
		return "Yesterday";
	} else if (date > yesterday) {
		return date.toLocaleDateString("en-US", { weekday: "long" });
	} else {
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	}
}
