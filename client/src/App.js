import React, { lazy, Suspense, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/header/header.component.jsx";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selector";
import { checkSession } from "./redux/user/user.actions";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner.component";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import "./App.css";

const Homepage = lazy(() => import("./pages/Homepage/homepage.component"));
const ShopPage = lazy(() => import("./pages/shop/shop.component.jsx"));
const SignInAndSignUp = lazy(() =>
	import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.components.jsx")
);
const CheckoutPage = lazy(() =>
	import("./pages/CheckoutPage/checkout.component")
);
const App = ({ checkSession, currentUser }) => {
	useEffect(() => {
		checkSession();
	}, [checkSession]);

	return (
		<div className="App">
			<Header />
			<Switch>
				<ErrorBoundary>
					<Suspense fallback={<LoadingSpinner />}>
						<Route exact path="/" component={Homepage} />
						<Route path="/shop" component={ShopPage} />
						<Route exact path="/checkout" component={CheckoutPage} />
						<Route
							path="/signin"
							component={() =>
								currentUser ? <Redirect to="/" /> : <SignInAndSignUp />
							}
						/>
					</Suspense>
				</ErrorBoundary>
			</Switch>
		</div>
	);
};
const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
	checkSession: () => dispatch(checkSession()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
