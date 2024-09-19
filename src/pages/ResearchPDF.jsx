import React, { useState } from "react";

import Footer from "../components/Footer";
import Header from "../components/Header";

import PDF_FILE from "../assets/Article.pdf";

const ResearchPDF = () => {
	const [loadError, setLoadError] = useState(false);

	const handleError = () => {
		console.error("Failed to load the PDF document.");
		setLoadError(true);
	};

	return (
		<div>
			<Header />
			<div style={{ height: "100vh" }}>
				{loadError ? (
					<div style={{ textAlign: "center", padding: "20px" }}>
						<p>
							Failed to load the PDF document. Please try again
							later.
						</p>
					</div>
				) : (
					<iframe
						src={PDF_FILE}
						title="Research Document"
						style={{
							width: "100%",
							height: "100%",
							border: "none",
						}}
						onError={handleError}
					></iframe>
				)}
			</div>
			<Footer />
		</div>
	);
};

export default ResearchPDF;
