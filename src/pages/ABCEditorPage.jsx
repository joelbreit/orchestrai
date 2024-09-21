import { Container } from "reactstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ABCEditorContent from "../components/ABCEditorContent";
import React, { useState } from "react";

const ABCEditorPage = () => {
	const [layout, setLayout] = useState("tall");

	return (
		<div>
			<Header />
			<Container
				className={
					layout === "tall" ? "col-12 col-lg-8 mt-4" : "col-12 mt-4"
				}
			>
				<ABCEditorContent
					handleLayoutChange={setLayout}
					layout={layout}
				/>
			</Container>
			<Footer />
		</div>
	);
};

export default ABCEditorPage;
