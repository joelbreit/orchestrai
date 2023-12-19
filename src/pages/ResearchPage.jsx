import React from "react";
import { Container } from "reactstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ResearchContent from "../components/ResearchContent";

const ResearchPage = () => {
	return (
		<div>
			<Header />
			<Container className="col-12 col-lg-8 mt-4">
				<ResearchContent />
			</Container>
			<Footer />
		</div>
	);
};

export default ResearchPage;
