import {
	Collapse,
	Nav,
	NavItem,
	NavLink,
	Navbar,
	NavbarBrand,
	NavbarToggler,
} from "reactstrap";
import React, { useState } from "react";

import { NavLink as RouterNavLink } from "react-router-dom";

import OrcheImage from "../assets/images/Orche.png";

const Header = (args) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div>
			<Navbar
				expand="sm"
				color="primary"
				dark
				{...args}
				className="secondary-navbar"
			>
				<NavbarBrand tag={RouterNavLink} to="/">
					<span className="icon-square flex-shrink-0">
						<img
							src={OrcheImage}
							width="30"
							height="30"
							alt="Orche"
						/>{" "}
						{/* <i className={`bi bi-music-note`}></i> */}
					</span>{" "}
					OrchestrAI
				</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="me-auto" navbar>
						<NavItem>
							<NavLink tag={RouterNavLink} to="/compose">
								Compose{" "}
								<span className="icon-square flex-shrink-0">
									<i className={`bi bi-plus`}></i>
								</span>
							</NavLink>
						</NavItem>
						{/* <NavItem>
							<NavLink tag={RouterNavLink} to="/ABCEditor">
								ABCEditor
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink tag={RouterNavLink} to="/portfolio">
								Portfolio
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink tag={RouterNavLink} to="/about">
								About This Site
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink tag={RouterNavLink} to="/research">
								Research
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink tag={RouterNavLink} to="/juxcompose">
								Juxcompose
							</NavLink>
						</NavItem> */}
						{/* TODO Move to far right */}
						<NavItem style={{ marginLeft: "auto" }}>
							<NavLink tag={RouterNavLink} to="/profile">
								<span className="icon-square flex-shrink-0">
									<i className={`bi bi-person-circle`}></i>
								</span>
							</NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
};

export default Header;
