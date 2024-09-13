import React from "react";
import { Container } from "reactstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PortfolioContent from "../components/PortfolioContent";

const PortfolioPage = () => {
	return (
		<div>
			<Header />
			<Container className="col-12 col-lg-8 mt-4">
				<PortfolioContent />
			</Container>
			<Footer />
		</div>
	);
};

export default PortfolioPage;
