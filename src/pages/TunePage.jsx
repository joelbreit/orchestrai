import React from "react";
import { Container } from "reactstrap";
// import ABCEditorContent from "../components/ABCEditorContent";
import Footer from "../components/Footer";
import Header from "../components/Header";
import TuneViewerComponent from "../components/TuneViewerComponent";

import { useParams } from "react-router-dom";

const TunePage = () => {
	const { tuneId } = useParams(); // Extracting tuneId from the URL

	const setPageTitle = (title) => {
		document.title = title;
	};

	return (
		<div>
			<Header />
			<Container className="col-12 col-lg-8 mt-4">
				{/* <ABCEditorContent tuneId={tuneId} /> */}
				<TuneViewerComponent
					tuneId={tuneId}
					setPageTitle={setPageTitle}
				/>
			</Container>
			<Footer />
		</div>
	);
};

export default TunePage;
