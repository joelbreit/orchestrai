import { Container } from "reactstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ABCEditorContent from "../components/ABCEditorContent";
import React from "react";

const ABCEditorPage = () => {
    return (
        <div>
            <Header />
            <Container className="col-12 col-lg-8 mt-4">
                <ABCEditorContent />
            </Container>
            <Footer />
        </div>
    );
};

export default ABCEditorPage;
