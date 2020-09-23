import React from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.component";

const Spinner = (WrappedComponent) => ({ isLoading, ...otherProps }) => {
	return isLoading ? <LoadingSpinner /> : <WrappedComponent {...otherProps} />;
};

export default Spinner;
