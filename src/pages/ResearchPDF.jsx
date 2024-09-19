import React from "react";

import Footer from "../components/Footer";
import Header from "../components/Header";

const ResearchPDF = () => {
	return (
		<div>
			<Header />
			<div style={{ height: "100vh" }}>
				<iframe
					src={"/Article.pdf"}
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

export default ResearchPDF;
