import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "./pages/Homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component.jsx";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.components.jsx";
import CheckoutPage from "./pages/CheckoutPage/checkout.component.jsx";
import Header from "./components/header/header.component.jsx";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selector";
import { checkSession } from "./redux/user/user.actions";
import "./App.css";

const App = ({ checkSession, currentUser }) => {
  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={CheckoutPage} />
        <Route
          path="/signin"
          component={() =>
            currentUser ? <Redirect to="/" /> : <SignInAndSignUp />
          }
        />
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
