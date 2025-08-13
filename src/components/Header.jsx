// Import dependencies
import React, { useContext, useEffect, useState } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import {
    Collapse,
    Nav,
    NavItem,
    NavLink,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Alert,
} from "reactstrap";

// Import services
import Logger from "../services/Logger";

// Import contexts
import { AppContext } from "../contexts/AppContext";

// Import assets
import OrcheImage from "../assets/images/Orche.png";
import { CheckToken } from "../services/APICalls";

const Header = (args) => {
    // App context
    const { appState, setAppState } = useContext(AppContext);

    const [isOpen, setIsOpen] = useState(false);
    const [showBanner, setShowBanner] = useState(true);

    const toggle = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        setAppState((prevState) => ({ ...prevState, authenticated: false }));
        localStorage.removeItem("OrchestrAIToken");
    };

    const dismissBanner = () => {
        setShowBanner(false);
        localStorage.setItem("dismissedAugust2025Banner", "true");
    };

    useEffect(() => {
        const checkToken = async () => {
            const existingToken = localStorage.getItem("OrchestrAIToken");
            if (!appState.authenticated && existingToken) {
                const { status, accountId, email, username, displayName } =
                    await CheckToken(existingToken);
                if (status === "Success") {
                    setAppState((prevState) => ({
                        ...prevState,
                        authenticated: true,
                        accountId: accountId,
                        email: email,
                        username: username,
                        displayName: displayName,
                    }));
                } else {
                    localStorage.removeItem("OrchestrAIToken");
                }
            } else if (!existingToken) {
                Logger.debug("No user token found");
                Logger.debug(`existingToken: ${existingToken}`);
            }
        };

        checkToken();
    }, [appState.authenticated, setAppState]);

    useEffect(() => {
        const bannerDismissed = localStorage.getItem(
            "dismissedAugust2025Banner"
        );
        if (bannerDismissed === "true") {
            setShowBanner(false);
        }
    }, []);

    return (
        <div>
            {showBanner && (
                <Alert
                    color="info"
                    className="mb-0 text-center"
                    toggle={dismissBanner}
                    style={{
                        borderRadius: 0,
                        borderLeft: 0,
                        borderRight: 0,
                        borderTop: 0,
                    }}
                >
                    <strong>🎵 New AI Models Available!</strong> August 2025
                    models now include GPT-5, Claude Sonnet 4, and Gemini 2.5
                    Flash. Try them in the OpenRouter Compose tab of the {" "}
                    <RouterNavLink
                        to="/compose"
                        style={{
                            color: "inherit",
                            textDecoration: "underline",
                        }}
                    >
                        Compose
                    </RouterNavLink>{" "}
                    page!
                </Alert>
            )}
            <Navbar expand="md" light {...args}>
                <NavbarBrand tag={RouterNavLink} to="/">
                    <span className="icon-square flex-shrink-0">
                        {/* <img
							src={OrcheImage}
							width="30"
							height="30"
							alt="Orche"
						/> */}
                        <i className={`bi bi-music-note-beamed`} />{" "}
                        <span>OrchestrAI</span>
                    </span>{" "}
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse
                    isOpen={isOpen}
                    navbar
                    className="justify-content-end"
                >
                    <Nav navbar>
                        <NavItem>
                            <NavLink tag={RouterNavLink} to="/compose">
                                Compose{" "}
                                <span className="icon-square flex-shrink-0 d-none d-lg-inline">
                                    <i className={`bi bi-music-note-beamed`} />
                                </span>{" "}
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
                        <NavItem>
                            <NavLink href="/Article.pdf">
                                Research{" "}
                                <i
                                    className={`bi bi-journals d-none d-lg-inline`}
                                />
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={RouterNavLink} to="/juxcompose">
                                Juxcompose{" "}
                                <i
                                    className={`bi bi-terminal-split d-none d-lg-inline`}
                                />
                            </NavLink>
                        </NavItem>

                        {appState.authenticated ? (
                            <>
                                <NavItem>
                                    <NavLink
                                        tag={RouterNavLink}
                                        to="/profile"
                                        maxwidth="100px"
                                    >
                                        {appState.displayName || "Profile"}{" "}
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
                            <>
                                <NavItem>
                                    <div className="navbar-button btn btn-secondary">
                                        <NavLink
                                            tag={RouterNavLink}
                                            to="/login"
                                        >
                                            Sign In{" "}
                                            <i
                                                className={`bi bi-box-arrow-in-right d-none d-lg-inline`}
                                            />
                                        </NavLink>
                                    </div>
                                </NavItem>
                                <NavItem>
                                    <div className="navbar-button btn">
                                        <NavLink
                                            tag={RouterNavLink}
                                            to="/signup"
                                        >
                                            Sign Up{" "}
                                            <i
                                                className={`bi bi-person-plus d-none d-lg-inline`}
                                            />
                                        </NavLink>
                                    </div>
                                </NavItem>
                            </>
                        )}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default Header;
