import React from "react";

const Footer = () => {
	
	const year = new Date().getFullYear();

	return (
		<footer className="bg-light text-center text-lg-start">
			<div className="container mt-4"></div>
			<div className="text-center p-3">
				<div className="row">
					<div className="col-lg-6 col-md-12 mb-4 mb-md-0"></div>
				</div>
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
							href="http://www.linkedin.com/in/joel-breit"
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
			</div>
		</footer>
	);
};

export default Footer;
