import { useEffect } from "react";

function useOutsideAlerter(ref, onOutsideClick) {
	useEffect(() => {
		// Function to call when click is detected outside
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				onOutsideClick();
			}
		}
		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref, onOutsideClick]);
}

export default useOutsideAlerter;
