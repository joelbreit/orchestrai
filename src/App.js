import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ABCEditorPage from "./pages/ABCEditorPage";
import JuxComposePage from "./pages/JuxComposePage";
import ComposePage from "./pages/ComposePage";
import ProfilePage from "./pages/ProfilePage";
import { AppProvider } from "./contexts/AppContext";
import PortfolioPage from "./pages/PortfolioPage";
import ResearchPage from "./pages/ResearchPage";
import TunePage from "./pages/TunePage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
	return (
		<AppProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/compose" element={<ComposePage />} />
					<Route path="/abcEditor" element={<ABCEditorPage />} />
					<Route path="/juxcompose" element={<JuxComposePage />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="/portfolio" element={<PortfolioPage />} />
					<Route path="/research" element={<ResearchPage />} />
					<Route path="/tunes/:tuneId" element={<TunePage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</BrowserRouter>
		</AppProvider>
	);
}

export default App;
