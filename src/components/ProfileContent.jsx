// Import dependencies
import React, { useContext } from "react";

// Import components
import { Container } from "reactstrap";

// Import contexts
import { AppContext } from "../contexts/AppContext";

const ProfileContent = () => {
	// App context
	const { appState } = useContext(AppContext);

	return (
		<Container className="mt-5">
			<h1>Profile</h1>
			<p>Here you can find your profile information.</p>
			<p>Username: {appState.username}</p>
		</Container>
	);
};

export default ProfileContent;
