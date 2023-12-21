// Import dependencies
import React, { useContext, useState } from "react";

// Import components
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import CreateAccountForm from "./CreateAccountForm";
import LoginForm from "./LoginForm";

// Import contexts
import { AppContext } from "../contexts/AppContext";

const ProtectedContent = ({ children }) => {
	const { appState } = useContext(AppContext);
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
	const [hasAccount, setHasAccount] = useState(false);

	const toggleLoginModal = () => setIsLoginModalOpen(!isLoginModalOpen);
	const changeMode = () => setHasAccount(!hasAccount);

	return (
		<>
			{appState.authenticated ? (
				children
			) : (
				<>
					<p>
						You need to login to use this feature.{" "}
						<Button color="primary" onClick={toggleLoginModal} className="primary-button">
							Create an Account!{" "}
							<span role="img" aria-label="checkmark">
								✅
							</span>
						</Button>
					</p>
					<Modal isOpen={isLoginModalOpen} toggle={toggleLoginModal}>
						<ModalHeader toggle={toggleLoginModal}>
							{hasAccount ? "Login" : "Create Account"}
						</ModalHeader>
						<ModalBody>
							{hasAccount ? <LoginForm /> : <CreateAccountForm />}
						</ModalBody>
						<ModalFooter>
							{hasAccount ? (
								<p>
									Don't have an account?{" "}
									<Button color="link" onClick={changeMode}>
										Create one
									</Button>
									.
								</p>
							) : (
								<p>
									Already have an account?{" "}
									<Button color="link" onClick={changeMode}>
										Login
									</Button>
									.
								</p>
							)}
						</ModalFooter>
					</Modal>
				</>
			)}
		</>
	);
};

export default ProtectedContent;
