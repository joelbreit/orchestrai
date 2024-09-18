import React, { useContext, useState } from "react";
import {
	Button,
	Container,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
} from "reactstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ComposeContent from "../components/ComposeContent";

// Import contexts
import { AppContext } from "../contexts/AppContext";
import QuickComposeForm from "../components/QuickComposeForm";
import { Link } from "react-router-dom";
import AdvancedComposeForm from "../components/AdvancedComposeForm";
import OpenRouterComposeForm from "../components/OpenRouterComposeForm";

const ComposePage = () => {
	// App context
	const { appState } = useContext(AppContext);

	// Modal State
	const [showComposeModal, setShowComposeModal] = useState(false);
	const [modalMode, setModalMode] = useState(null);
	const [modalTitle, setModalTitle] = useState("");
	const [modalContent, setModalContent] = useState("");

	const switchMode = () => {
		if (modalMode === "Quick Compose") {
			setModalMode("Advanced Compose");
			setModalTitle("Advanced Compose");
			setModalContent(<AdvancedComposeForm />);
		} else {
			setModalMode("Quick Compose");
			setModalTitle("Quick Compose");
			setModalContent(<QuickComposeForm />);
		}
	};

	return (
		<div>
			<Header />
			<Container className="col-12 col-lg-8 mt-4">
				<ComposeContent />

				{/* {!appState.authenticated && (
					<p className="mt-3">
						<a href="/signup">Create a free account</a> or{" "}
						<a href="/login">log in</a> to use the advanced compose
						feature.
					</p>
				)}
				<Button
					className="primary-button-outline"
					onClick={() => {
						setModalTitle("Quick Compose");
						setModalContent(<QuickComposeForm />);
						setShowComposeModal(true);
					}}
				>
					Quick Compose <i className="bi bi-music-note"></i>
				</Button>

				<Button
					className="primary-button"
					disabled={!appState.authenticated}
					style={{ marginLeft: "10px" }}
					title={
						!appState.authenticated && "Log in to use this feature"
					}
					onClick={() => {
						setModalTitle("Advanced Compose");
						setModalContent(<AdvancedComposeForm />);
						setShowComposeModal(true);
					}}
				>
					Advanced Compose <i className="bi bi-code-square"></i>
				</Button>

				<Button
					className="primary-button"
					disabled={!appState.authenticated}
					style={{ marginLeft: "10px" }}
					title={
						!appState.authenticated && "Log in to use this feature"
					}
					onClick={() => {
						setModalTitle("OpenRouter Compose");
						setModalContent(<OpenRouterComposeForm />);
						setShowComposeModal(true);
					}}
				>
					OpenRouter Compose <i className="bi bi-code-square"></i>
				</Button>

				<div
					isOpen={showComposeModal}
					toggle={() => setShowComposeModal(!showComposeModal)}
					// className="modal-dialog-centered"
				>
					<div>{modalTitle}</div>
					<div>{modalContent}</div>
					<div>
						{modalMode === "Advanced Compose" ? (
							<div>
								Switch to{" "}
								<Button color="link" onClick={switchMode}>
									Quick Compose
								</Button>
							</div>
						) : (
							<div>
								<p>
									{!appState.authenticated ? (
										<>
											<Link to="/login">Log in</Link>
											{" or "}
											<Link to="/signup">
												create an account
											</Link>
											{" to use "}
											<Link onClick={switchMode}>
												Advanced Compose
											</Link>
										</>
									) : (
										<p>
											Switch to{" "}
											<Link onClick={switchMode}>
												Quick Compose
											</Link>
										</p>
									)}
								</p>
							</div>
						)}
					</div>
				</div> */}
			</Container>
			<Footer />
		</div>
	);
};

export default ComposePage;
