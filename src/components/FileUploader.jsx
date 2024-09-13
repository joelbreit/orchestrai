import { useRef } from "react";
import { Button } from "reactstrap";

export const FileUploader = ({ handleFile }) => {
	// Create a reference to the hidden file input element
	const hiddenFileInput = useRef(null);

	// Programatically click the hidden file input element
	// when the Button component is clicked
	const handleClick = (event) => {
		hiddenFileInput.current.click();
	};
	// Call a function (passed as a prop from the parent component)
	// to handle the user-selected file
	const handleChange = (event) => {
		const fileUploaded = event.target.files[0];
		handleFile(fileUploaded);
	};
	return (
		<>
			<Button onClick={handleClick} size="sm" className="primary-button">
				Upload a file
			</Button>
			<input
				type="file"
				onChange={handleChange}
				ref={hiddenFileInput}
				style={{ display: "none" }} // Make the file input element invisible
			/>
		</>
	);
};

export default FileUploader;
