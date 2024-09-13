import React, { useState } from "react";
import { Container, Tooltip } from "reactstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";

const NotFoundPage = () => {
	const [tooltipOpen, setTooltipOpen] = useState(false);
	const toggle = () => setTooltipOpen(!tooltipOpen);

	return (
		<div>
			<Header />
			<Container className="col-12 col-lg-8 mt-4">
				<h1>404 - Page Not Found</h1>
				<p>
					Whale crap! This page may have been moved or deleted. Please
					check your URL or consider starting{" "}
					<a href="/" id="tooltip">
						da capo
					</a>
					.
				</p>
				<Tooltip isOpen={tooltipOpen} target="tooltip" toggle={toggle} placement="bottom">
					From the top! Or, uh, the home page.
				</Tooltip>
			</Container>
			<Footer />
		</div>
	);
};

export default NotFoundPage;
