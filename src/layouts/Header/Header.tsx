import React from "react";
import { Layout } from "antd";

interface IHeaderProps {}
const { Header: HeaderAntd } = Layout;

const Header: React.FC<IHeaderProps> = (props) => {
	return (
		<HeaderAntd className="header-login sticky top-0">
			<div className="container p-4 flex items-center justify-between">
				<div className="logo">
					<img src="https://www.hackerrank.com/wp-content/uploads/2018/08/hackerrank_logo.png" alt="logo" />
				</div>
				<div className="navigation"></div>
				<div className="header-right flex items-center">
					<div className="btn mr-2">Login</div>
					<div className="btn border border-zinc-500">Sign Up</div>
				</div>
			</div>
		</HeaderAntd>
	);
};

export default Header;
