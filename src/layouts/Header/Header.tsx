import React, { useState } from "react";
import { Button, Layout } from "antd";
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
					{/* <Login
						visibleLogin={visibleLogin}
						handleHideLogin={handleHideLogin}
						handleShowLogin={handleShowLogin}
						handleChangeToRegister={handleChangeToRegister}
					/> */}
					<Button
						className="px-4 mr-2 py-1 border border-gray-200 rounded-3xl cursor-pointer text-sm hover:border-blue-100 hover:text-blue-100 transition-all duration-200"
						onClick={handleShowLogin}
					>
						Đăng nhập
					</Button>
					<Button
						onClick={handleShowRegister}
						className="px-4 py-1 border border-gray-200 rounded-3xl cursor-pointer text-sm hover:border-blue-100 hover:text-blue-100 transition-all duration-200"
					>
						Đăng ký
					</Button>
					{/* <Register
						visibleRegister={visibleRegister}
						handleHideRegister={handleHideRegister}
						handleShowRegister={handleShowRegister}
						handleChangeToLogin={handleChangeToLogin}
					/> */}
				</div>
			</div>
		</HeaderAntd>
	);
};

export default Header;
