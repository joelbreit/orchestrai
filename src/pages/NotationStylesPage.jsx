import React from "react";
import { Container } from "reactstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NotationStylesContent from "../components/NotationStylesContent";

const NotationStylesPage = () => {
	return (
		<div>
			<Header />
			<Container className="col-12 col-lg-8 mt-4">
				<NotationStylesContent />
			</Container>
			<Footer />
		</div>
	);
};

export default NotationStylesPage;
