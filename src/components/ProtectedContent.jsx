// Import dependencies
import React, { useContext, useState } from "react";

// Import components
import {
	Button,
	Col,
	Container,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
} from "reactstrap";
import CreateAccountForm from "./CreateAccountForm";
import LoginForm from "./LoginForm";

// Import contexts
import { AppContext } from "../contexts/AppContext";

const LOGGED_IN = process.env.REACT_APP_LOGGED_IN;

const ProtectedContent = ({ children }) => {
	const { appState } = useContext(AppContext);
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
	const [hasAccount, setHasAccount] = useState(false);

	const toggleLoginModal = () => setIsLoginModalOpen(!isLoginModalOpen);
	const changeMode = () => setHasAccount(!hasAccount);

	return (
		<>
			{appState.authenticated || LOGGED_IN ? (
				children
			) : (
				<Container className="mb-3">
					<div>
						<strong>This feature is completely free</strong>, but
						you will need to login or create an account to use it:{" "}
						<Col className="mt-2">
							<Button
								onClick={() => {
									setHasAccount(true);
									toggleLoginModal();
								}}
								className="primary-button-outline"
							>
								Login{" "}
								<span role="img" aria-label="checkmark">
									✅
								</span>
							</Button>{" "}
							<Button
								onClick={() => {
									setHasAccount(false);
									toggleLoginModal();
								}}
								className="primary-button"
							>
								Create an Account!{" "}
								<span role="img" aria-label="checkmark">
									✅
								</span>
							</Button>
						</Col>
					</div>
					<Modal isOpen={isLoginModalOpen} toggle={toggleLoginModal}>
						<ModalHeader toggle={toggleLoginModal}>
							{hasAccount ? "Login" : "Create Account"}
						</ModalHeader>
						<ModalBody style={{ paddingBottom: "0px" }}>
							{hasAccount ? <LoginForm /> : <CreateAccountForm />}
						</ModalBody>
						<ModalFooter>
							{hasAccount ? (
								<div>
									Don't have an account?{" "}
									<Button color="link" onClick={changeMode}>
										Create one
									</Button>
								</div>
							) : (
								<div>
									Already have an account?{" "}
									<Button color="link" onClick={changeMode}>
										Login
									</Button>
								</div>
							)}
						</ModalFooter>
					</Modal>
				</Container>
			)}
		</>
	);
};

export default ProtectedContent;
