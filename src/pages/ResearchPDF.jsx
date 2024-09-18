import React from "react";

import Article from "../assets/Article.pdf";
import Footer from "../components/Footer";
import Header from "../components/Header";

const ResearchPage = () => {
	return (
		<div>
			<Header />
			<div style={{ height: "100vh" }}>
				<iframe
					src={Article}
					title="Research Document"
					style={{
						width: "100%",
						height: "100%",
						border: "none",
					}}
				></iframe>
			</div>
			<Footer />
		</div>
	);
};

export default ResearchPage;
