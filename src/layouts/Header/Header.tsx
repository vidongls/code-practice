import React, { useState } from "react";
import { Layout } from "antd";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import Navbar from "./Navbar";

interface IHeaderProps {}
const { Header: HeaderAntd } = Layout;

const Header: React.FC<IHeaderProps> = (props) => {
	const [visibleLogin, setVisibleLogin] = useState(false);
	const [visibleRegister, setVisibleRegister] = useState(false);

	const handleHideLogin = () => {
		setVisibleLogin(false);
	};

	const handleShowLogin = () => {
		setVisibleLogin(true);
	};

	const handleHideRegister = () => {
		setVisibleRegister(false);
	};

	const handleShowRegister = () => {
		setVisibleRegister(true);
	};

	const handleChangeToLogin = () => {
		handleHideRegister();
		handleShowLogin();
	};

	const handleChangeToRegister = () => {
		handleHideLogin();
		handleShowRegister();
	};

	return (
		<HeaderAntd className="header sticky top-0 mb-5">
			<div className=" flex items-center justify-between px-9">
				<Navbar />

				<div className="header-right flex items-center">
					<Login
						visibleLogin={visibleLogin}
						handleHideLogin={handleHideLogin}
						handleShowLogin={handleShowLogin}
						handleChangeToRegister={handleChangeToRegister}
					/>
					<Register
						visibleRegister={visibleRegister}
						handleHideRegister={handleHideRegister}
						handleShowRegister={handleShowRegister}
						handleChangeToLogin={handleChangeToLogin}
					/>
				</div>
			</div>
		</HeaderAntd>
	);
};

export default Header;
