const isDebugOn = process.env.REACT_APP_DEBUG === "true";

const Logger = (() => {
	const print = (pieces, level) => {
		const timestampString = `[${new Date().toISOString()}]`;
		const levelString = `[${level}]`;
		if (level === "ERROR") {
			console.error(timestampString, levelString, ...pieces);
		} else if (level === "WARN") {
			console.warn(timestampString, levelString, ...pieces);
		} else if (isDebugOn) {
			if (level === "LOG") {
				console.log(timestampString, levelString, ...pieces);
			} else if (level === "DEBUG") {
				console.debug(timestampString, levelString, ...pieces);
			}
		}
	};

	return {
		error: (...pieces) => print(pieces, "ERROR"),
		warn: (...pieces) => print(pieces, "WARN"),
		log: (...pieces) => print(pieces, "LOG"),
		debug: (...pieces) => print(pieces, "DEBUG"),
	};
})();

export default Logger;
