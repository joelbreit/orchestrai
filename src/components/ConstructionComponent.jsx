// Import dependencies
import React from "react";

// Import components
import { Alert } from "reactstrap";

const ConstructionComponent = () => {
	return (
		<Alert color="info" className="text-center">
			Coming Soon{" "}
			<span className="icon-square flex-shrink-0">
				<i className={`bi bi-tools`} />
			</span>
			<p>
				This feature is currently under construction. Check back soon!
			</p>
		</Alert>
	);
};

export default ConstructionComponent;
