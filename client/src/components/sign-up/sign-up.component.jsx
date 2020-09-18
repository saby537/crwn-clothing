import React, { useState } from "react";
import FormInput from "../Form-Input/Form-Input.component";
import CustomButton from "../Custom-Button/Custom-Button.component";
import { connect } from "react-redux";
import { signUpStart } from "../../redux/user/user.actions";
import "./sign-up.styles.scss";

const SignUp = ({ signUp }) => {
	const [userCredentials, setUserCredentials] = useState({
		displayName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const { displayName, email, password, confirmPassword } = userCredentials;

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			alert("Passwords donot match");
			return;
		}
		signUp({ email, password, displayName });
	};
	const handleChange = (event) => {
		const { name, value } = event.target;
		setUserCredentials({ ...userCredentials, [name]: value });
	};
	return (
		<div className="sign-up">
			<h2 title="title">I donot have an account</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					type="text"
					name="displayName"
					value={displayName}
					onChange={handleChange}
					label="Display Name"
					required
				/>
				<FormInput
					type="email"
					name="email"
					value={email}
					onChange={handleChange}
					label="Email"
					required
				/>
				<FormInput
					type="password"
					name="password"
					value={password}
					onChange={handleChange}
					label="Password"
					required
				/>
				<FormInput
					type="password"
					name="confirmPassword"
					value={confirmPassword}
					onChange={handleChange}
					label="Confirm Password"
					required
				/>
				<div className="signup-btn">
					<CustomButton type="submit">SIGN UP</CustomButton>
				</div>
			</form>
		</div>
	);
};
const mapDispatchToProps = (dispatch) => ({
	signUp: (userCredentials) => dispatch(signUpStart(userCredentials)),
});

export default connect(null, mapDispatchToProps)(SignUp);
