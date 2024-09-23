import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const [appState, setAppState] = useState({
		debug: false,
		authenticated: false,
		UUID: "",
		accountId: "",
		isEditing: false,
	});

	return (
		<AppContext.Provider value={{ appState, setAppState }}>
			{children}
		</AppContext.Provider>
	);
};
