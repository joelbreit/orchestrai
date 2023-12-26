const isDebugOn = process.env.REACT_APP_DEBUG === "true";

const Logger = (() => {
	const print = (pieces, level) => {
		if (pieces instanceof Array) {
			pieces = pieces.join("");
		}
		const output = `[${new Date().toISOString()}] [${level}] ${pieces}`;
		if (level === "ERROR") {
			console.error(output);
		} else if (level === "WARN") {
			console.warn(output);
		} else if (isDebugOn) {
			if (level === "LOG") {
				console.log(output);
			} else if (level === "DEBUG") {
				console.debug(output);
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
