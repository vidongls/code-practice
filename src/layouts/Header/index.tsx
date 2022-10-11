import React from "react";
import { Button, Layout } from "antd";

import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const { Header: HeaderAntd } = Layout;

const Header: React.FC = (props) => {
	const navigate = useNavigate();

	const handleRedirectLogin = () => {
		navigate("/login")
	};

	const handleRedirectRegister = () => {
		navigate("/register")
	};

	return (
		<HeaderAntd className="header sticky top-0 mb-5 bg-white">
			<div className=" flex items-center justify-between px-9">
				<Navbar />

				<div className="header-right flex items-center">
					<Button
						className="px-4 mr-2 py-1 border border-gray-200 rounded-3xl cursor-pointer text-sm hover:border-tertiary hover:text-tertiary transition-all duration-200"
						onClick={handleRedirectLogin}
					>
						Đăng nhập
					</Button>
					<Button
						onClick={handleRedirectRegister}
						className="px-4 py-1 border border-gray-200 rounded-3xl cursor-pointer text-sm hover:border-tertiary hover:text-tertiary transition-all duration-200"
					>
						Đăng ký
					</Button>
				</div>
			</div>
		</HeaderAntd>
	);
};

export default Header;
