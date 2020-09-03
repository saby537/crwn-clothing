import React from "react";
import { connect } from "react-redux";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../redux/user/user.actions";
import FormInput from "../Form-Input/Form-Input.component";
import CustomButton from "../Custom-Button/Custom-Button.component";
import "./sign-in.styles.scss";

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { emailSignIn } = this.props;
    const { email, password } = this.state;
    emailSignIn(email, password);
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            value={this.state.email}
            handleChange={this.handleChange}
            label="Email"
            required
          />
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
            label="Password"
            required
          />
          <div className="buttons">
            <CustomButton type="submit">Sign In</CustomButton>
            <CustomButton
              type="button"
              onClick={this.props.googleSignIn}
              isGoogleSignIn
            >
              Sign In with Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  googleSignIn: () => dispatch(googleSignInStart()),
  emailSignIn: (email, password) => dispatch(emailSignInStart(email, password)),
});
export default connect(null, mapDispatchToProps)(SignIn);
