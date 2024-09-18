import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import ABCEditorPage from "./pages/ABCEditorPage";
import ComposePage from "./pages/ComposePage";
import HomePage from "./pages/HomePage";
import JuxComposePage from "./pages/JuxComposePage";
import NotationStylesPage from "./pages/NotationStylesPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import PortfolioPage from "./pages/PortfolioPage";
import ProfilePage from "./pages/ProfilePage";
// import ResearchPage from "./pages/ResearchPage";
import ResearchPDF from "./pages/ResearchPDF";
import SignupPage from "./pages/SignupPage";
import TunePage from "./pages/TunePage";
import GuestPage from "./pages/GuestPage";

function App() {
	return (
		<AppProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/compose" element={<ComposePage />} />
					<Route path="/abcEditor" element={<ABCEditorPage />} />
					<Route path="/juxcompose" element={<JuxComposePage />} />
					<Route path="/notationStyles" element={<NotationStylesPage />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="/portfolio" element={<PortfolioPage />} />
					{/* <Route path="/research" element={<ResearchPage />} /> */}
					<Route path="/research" element={<ResearchPDF />} />
					<Route path="/tunes/:tuneId" element={<TunePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignupPage />} />
					<Route path="/2iBIh9zHmLViW3N" element={<GuestPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</BrowserRouter>
		</AppProvider>
	);
}

export default App;
