import React from "react";
import { useNavigate } from "react-router-dom";
import {
	Button,
	Container,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
} from "reactstrap";
import CreateAccountForm from "../components/CreateAccountForm";
import Footer from "../components/Footer";
import Header from "../components/Header";

const SignupPage = () => {
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
					<ModalHeader>Create an Account</ModalHeader>
					<ModalBody style={{ paddingBottom: "0px" }}>
						<CreateAccountForm redirect={redirect} />
					</ModalBody>
					<ModalFooter>
						<div>
							Already have an account?{" "}
							<Button color="link" href="/login">
								Login
							</Button>
						</div>
					</ModalFooter>
				</Modal>
			</Container>
			<Footer />
		</div>
	);
};

export default SignupPage;
