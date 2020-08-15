import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "./pages/Homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component.jsx";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.components.jsx";
import CheckoutPage from "./pages/CheckoutPage/checkout.component.jsx";
import Header from "./components/header/header.component.jsx";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selector";
import "./App.css";

class App extends React.Component {
  unSubscribeAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unSubscribeAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((Snapshot) => {
          setCurrentUser({
            id: Snapshot.id,
            ...Snapshot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }
  componentWillUnmount() {
    this.unSubscribeAuth();
  }

  render() {
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
              this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUp />
            }
          />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
