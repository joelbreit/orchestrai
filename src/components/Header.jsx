// Import dependencies
import React, { useContext, useEffect, useState } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import {
	Badge,
	Collapse,
	Nav,
	NavItem,
	NavLink,
	Navbar,
	NavbarBrand,
	NavbarToggler,
} from "reactstrap";

// Import contexts
import { AppContext } from "../contexts/AppContext";

// Import assets
import OrcheImage from "../assets/images/Orche.png";
import { CheckToken } from "../services/APICalls";

const Header = (args) => {
	// App context
	const { appState, setAppState } = useContext(AppContext);

	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	const handleLogout = () => {
		setAppState((prevState) => ({ ...prevState, authenticated: false }));
		localStorage.removeItem("userToken");
	};

	useEffect(() => {
		const checkToken = async () => {
			const userToken = localStorage.getItem("userToken");
			if (!appState.authenticated && userToken) {
				const { status, accountId, email } = await CheckToken(
					userToken
				);
				if (status === "Success") {
					setAppState((prevState) => ({
						...prevState,
						authenticated: true,
						accountId: accountId,
						email: email,
					}));
				} else {
					localStorage.removeItem("userToken");
				}
			}
		};
		checkToken();
	}, [appState.authenticated, setAppState]);

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
						<span className="d-sm-none d-md-inline d-inline">
							OrchestrAI
						</span>
					</span>{" "}
				</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse
					isOpen={isOpen}
					navbar
					className="justify-content-end"
				>
					<Nav className="" navbar>
						<NavItem>
							<NavLink tag={RouterNavLink} to="/compose">
								Compose{" "}
								<span className="icon-square flex-shrink-0 d-none d-lg-inline">
									<i className={`bi bi-music-note-beamed`} />
								</span>{" "}
								<Badge
									color="success"
									pill
									className="d-none d-md-inline"
								>
									Try It!
								</Badge>
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink tag={RouterNavLink} to="/ABCEditor">
								ABCEditor{" "}
								<span className="icon-square flex-shrink-0 d-none d-lg-inline">
									<i className={`bi bi-pencil-square`} />
								</span>
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink tag={RouterNavLink} to="/portfolio">
								Portfolio{" "}
								<span className="icon-square flex-shrink-0 d-none d-lg-inline">
									<i className={`bi bi-journal-text`} />
								</span>
							</NavLink>
						</NavItem>
						{/* 
						<NavItem>
							<NavLink tag={RouterNavLink} to="/about">
								About This Site
							</NavLink>
						</NavItem> */}
						<NavItem>
							<NavLink tag={RouterNavLink} to="/research">
								Research{" "}
								<span className="icon-square flex-shrink-0 d-none d-lg-inline">
									<i className={`bi bi-trophy`} />
								</span>
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink tag={RouterNavLink} to="/juxcompose">
								Juxcompose{" "}
								<span className="icon-square flex-shrink-0 d-none d-lg-inline">
									<i className={`bi bi-terminal-split`} />
								</span>
							</NavLink>
						</NavItem>
						{/* TODO Move to far right */}

						{appState.authenticated ? (
							<>
								<NavItem>
									<NavLink
										tag={RouterNavLink}
										to="/profile"
										maxwidth="100px"
									>
										{appState.email || "Profile"}{" "}
										<span className="icon-square flex-shrink-0 d-none d-lg-inline">
											<i
												className={`bi bi-person-circle`}
											/>
										</span>
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										tag={RouterNavLink}
										onClick={handleLogout}
										to="#"
										active={false}
										className="inactive-navbar-link"
									>
										Logout{" "}
										<span className="icon-square flex-shrink-0 d-none d-lg-inline">
											<i
												className={`bi bi-box-arrow-right`}
											/>
										</span>
									</NavLink>
								</NavItem>
							</>
						) : (
							<NavItem>
								{/* <NavLink tag={RouterNavLink} to="/login">
									Login{" "}
									<span className="icon-square flex-shrink-0 d-none d-lg-inline">
										<i
											className={`bi bi-box-arrow-in-right`}
										/>
									</span>
								</NavLink> */}
							</NavItem>
						)}
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
};

export default Header;
