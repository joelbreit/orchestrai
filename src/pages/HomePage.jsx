import React from "react";
import { Container } from "reactstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HomeContent from "../components/HomeContent";

const HomePage = () => {
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

export default HomePage;
