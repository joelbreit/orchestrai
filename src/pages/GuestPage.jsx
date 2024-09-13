import React, { useContext } from "react";
import { Container } from "reactstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HomeContent from "../components/HomeContent";

import { AppContext } from "../contexts/AppContext";

const GuestPage = () => {
	const { setAppState } = useContext(AppContext);
	setAppState({
		authenticated: true,
		accountId: "m113iref",
		email: "Guest@OrchestrAI.site",
		username: "Guest",
		displayName: "Guest User",
	});

	return (
		<div>
			<Header />
			<Container className="col-12 col-lg-8 mt-4">
				<HomeContent />
			</Container>
			<Footer />
		</div>
	);
};

export default GuestPage;
