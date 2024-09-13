import React from "react";
import { useNavigate } from "react-router-dom";
import {
	Button,
	Container,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader
} from "reactstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
	const navigate = useNavigate();

	const redirect = () => {
		navigate("/");
	};

	const toggleModal = () => {
		navigate("/");
	};

	return (
		<div>
			<Header />
			<Container className="col-12 col-lg-8 mt-4">
				<div style={{ height: "50vh" }}></div>
				<Modal isOpen={true} toggle={toggleModal} fade={false}>
					<ModalHeader>Login</ModalHeader>
					<ModalBody style={{ paddingBottom: "0px" }}>
						<LoginForm redirect={redirect} />
					</ModalBody>
					<ModalFooter>
						<div>
							Don't have an account?{" "}
							<Button color="link" href="/signup">
								Create one
							</Button>
						</div>
					</ModalFooter>
				</Modal>
			</Container>
			<Footer />
		</div>
	);
};

export default LoginPage;
