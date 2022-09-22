import React, { useState } from "react";
import { Layout } from "antd";
import Login from "../../pages/Login";
import Register from "../../pages/Register";

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
				<div className="header-left flex items-center">
					<div className="logo">
						<img src="https://www.hackerrank.com/wp-content/uploads/2018/08/hackerrank_logo.png" alt="logo" />
					</div>
					<ul className="navigation flex items-center ml-3">
						<li>Bài tập</li>
						<li>Kỳ thi</li>
						<li>Bài nộp</li>
						<li>Xếp hạng</li>
						<li>Live IDE</li>
					</ul>
				</div>

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
