import React from "react";
import { Container } from "reactstrap";
// import ABCEditorContent from "../components/ABCEditorContent";
import TuneViewerComponent from "../components/TuneViewerComponent";
import Footer from "../components/Footer";
import Header from "../components/Header";

import { useParams } from "react-router-dom";

const TunePage = () => {
	const { tuneId } = useParams(); // Extracting tuneId from the URL
	return (
		<div>
			<Header />
			<Container className="col-12 col-lg-8 mt-4">
				{/* <ABCEditorContent tuneId={tuneId} /> */}
				<TuneViewerComponent tuneId={tuneId} />
			</Container>
			<Footer />
		</div>
	);
};

export default TunePage;
