import React from "react";

import { Alert, Container, Row } from "reactstrap";

const Footer = () => {
	const year = new Date().getFullYear();

	return (
		<footer className="bg-light text-center text-lg-start mt-4">
			<Alert color="info" className="text-center">
				<h4 className="alert-heading">
					OrchestrAI is under construction{" "}
					<span className="icon-square flex-shrink-0">
						<i className={`bi bi-tools`}></i>
					</span>
				</h4>
				<p className="mb-0">
					We just added the ability to save your compositions and
					share them with others and more features are on the way! In
					the meantime, join our{" "}
					<a
						href="https://discord.gg/e3nNUGVA7A"
						target="_blank"
						rel="noreferrer"
					>
						Discord
					</a>{" "}
					to get updates and chat with us!
				</p>
			</Alert>
			<Container className="text-center p-3">
				<h5 className="text-uppercase">Contact Info</h5>
				<ul className="list-unstyled mb-0">
					<li>joel [at] breitest [dot] com</li>
					<li>
						<a
							href="https://github.com/joelbreit"
							target="_blank"
							rel="noreferrer"
							className="text-dark"
						>
							GitHub Profile{" "}
							<i className="bi bi-box-arrow-up-right"></i>
						</a>
					</li>
					<li>
						<a
							href="https://www.linkedin.com/in/joel-breit/"
							target="_blank"
							rel="noreferrer"
							className="text-dark"
						>
							LinkedIn Profile{" "}
							<i className="bi bi-box-arrow-up-right"></i>
						</a>
					</li>
				</ul>
				<div className="mt-5">&copy; {year} Joel Breit</div>
			</Container>
		</footer>
	);
};

export default Footer;
