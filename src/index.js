import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "abcjs/abcjs-audio.css";
import "./assets/sass/music.scss";
import "./assets/sass/color-theme.scss";
import "./assets/sass/syntax-highlighting.scss";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
