import Footer from "../components/Footer";
import Header from "../components/Header";
import ProfileContent from "../components/ProfileContent";
import React from "react";
import ProtectedContent from "../components/ProtectedContent";
import { Container } from "reactstrap";

const JuxComposePage = () => {
    return (
        <div>
            <Header />
            <Container className="col-12 col-lg-8 mt-4">
                <ProtectedContent>
                    <ProfileContent />
                </ProtectedContent>
            </Container>
            <Footer />
        </div>
    );
};

export default JuxComposePage;
