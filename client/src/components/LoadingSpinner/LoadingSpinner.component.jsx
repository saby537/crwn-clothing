import React from "react";
import { SpinnerContainer, SpinnerOverlay } from "./LoadingSpinner.styles";

const LoadingSpinner = () => (
	<SpinnerOverlay>
		<SpinnerContainer />
	</SpinnerOverlay>
);

export default LoadingSpinner;
