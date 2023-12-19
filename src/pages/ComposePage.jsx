import React from "react";
import { Container } from "reactstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ComposeContent from "../components/ComposeContent";

const ComposePage = () => {
    return (
        <div>
            <Header />
            <Container className="col-12 col-lg-8 mt-4">
                <ComposeContent />
            </Container>
            <Footer />
        </div>
    );
};

export default ComposePage;
