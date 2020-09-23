import React from "react";
import { Component } from "react";
import {
	ErrorImageContainer,
	ErrorImageOverlay,
	ErrorImageText,
} from "./ErrorBoundary.styles";

class ErrorBoundary extends Component {
	constructor() {
		super();
		this.state = {
			hasErrored: false,
		};
	}

	static getDerivedStateFromError(Error) {
		return { hasErrored: true };
	}

	componentDidCatch(error, info) {
		console.log(error);
	}

	render() {
		if (this.state.hasErrored) {
			return (
				<ErrorImageOverlay>
					<ErrorImageContainer imageUrl="https://i.imgur.com/yW2W9SC.png" />
					<ErrorImageText>
						Something Went Wrong. Please refresh the page
					</ErrorImageText>
				</ErrorImageOverlay>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
