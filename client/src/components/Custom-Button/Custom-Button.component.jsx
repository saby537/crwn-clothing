import React from "react";
import { CustomButtonContainer } from "./custom-button.styled.component";

const CustomButton = ({ children, ...otherProps }) => (
  <CustomButtonContainer {...otherProps}>{children}</CustomButtonContainer>
);
export default CustomButton;
