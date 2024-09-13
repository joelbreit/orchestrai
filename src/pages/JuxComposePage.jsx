import React from "react";
import { Container } from "reactstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import JuxComposeContent from "../components/JuxComposeContent";

const JuxComposePage = () => {
	return (
		<div>
			<Header />
			<Container className="col-12 col-xl-8 mt-4">
				<JuxComposeContent />
			</Container>
			<Footer />
		</div>
	);
};

export default JuxComposePage;
