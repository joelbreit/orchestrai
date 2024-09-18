import React, { useState } from "react";
import {
	Button,
	Container,
	Input,
	InputGroup,
	InputGroupText,
} from "reactstrap";

const SearchInput = () => {
	// Initial list of options
	// MIDI Instrument names
	const options = [
		"Acoustic Grand Piano",
		"Bright Acoustic Piano",
		"Electric Grand Piano",
	];

	// State for the search query
	const [query, setQuery] = useState("");
	const [showOptions, setShowOptions] = useState(false);

	// Filtered list of options based on the search query
	const filteredOptions = options.filter((option) =>
		option.toLowerCase().includes(query.toLowerCase())
	);

	// return (
	// 	<>
	// 		<div className="form-group">
	// 			{/* Search input field */}
	// 			<input
	// 				type="text"
	// 				className="form-control"
	// 				placeholder="Search..."
	// 				value={query}
	// 				onChange={(e) => setQuery(e.target.value)}
	// 				onFocus={() => setShowOptions(true)}
	// 				onBlur={() => setShowOptions(false)}
	// 			/>
	// 		</div>
	// 		<ul
	// 			className={`list-group mt-2 ${
	// 				showOptions ? "d-block" : "d-none"
	// 			}`}
	// 		>
	// 			{/* Display filtered options */}
	// 			{filteredOptions.map((option, index) => (
	// 				<li key={index} className="list-group-item">
	// 					{option}
	// 				</li>
	// 			))}
	// 		</ul>
	// 	</>
	// );

	return (
		<>
			<InputGroup>
				{/* Search input field */}
				<Input
					type="text"
					placeholder="Search..."
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onFocus={() => setShowOptions(true)}
					onBlur={() => setShowOptions(false)}
				/>
				<InputGroupText>
					<i className="fa fa-search"></i>
				</InputGroupText>
			</InputGroup>
			<ul
				className={`list-group mt-2 ${
					showOptions ? "d-block" : "d-none"
				}`}
			>
				{/* Display filtered options */}
				{filteredOptions.map((option, index) => (
					<li key={index} className="list-group-item">
						{option}
					</li>
				))}
			</ul>
		</>
	)
};

export default SearchInput;
