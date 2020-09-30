import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.div`
	height: 70px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin-bottom: 5px;

	@media screen and (max-width: 800px) {
		margin-bottom: 20px;
	}
`;

export const LogoContainer = styled(Link)`
	height: 100%;
	width: 70px;
	padding: 10px;
`;

export const OptionsContainer = styled.div`
	width: 50%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	font-weight: bold;

	@media screen and (max-width: 800px) {
		width: 80%;
	}
`;

export const OptionLink = styled(Link)`
	padding: 10px 15px;
	cursor: pointer;

	@media screen and (max-width: 800px) {
		padding: 10px 10px;
	}
`;