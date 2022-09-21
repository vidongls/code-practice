import React from "react";
import { Layout } from "antd";

interface IHeaderProps {}
const { Header: HeaderAntd } = Layout;

const Header: React.FC<IHeaderProps> = (props) => {
	return (
		<HeaderAntd className="header sticky top-0">
			<div className="container flex items-center justify-between">
				<div className="logo">
					<img src="https://www.hackerrank.com/wp-content/uploads/2018/08/hackerrank_logo.png" alt="logo" />
				</div>
				<ul className="navigation flex items-center">
					<li>Bài tập</li>
					<li>Kỳ thi</li>
					<li>Bài nộp</li>
					<li>Xếp hạng</li>
					<li>Live IDE</li>
				</ul>
				<div className="header-right flex items-center">
					<div className="px-4 mr-2 py-1 border border-gray-200 rounded-3xl cursor-pointer text-sm">Đăng nhập</div>
					<div className="px-4 py-1 border border-gray-200 rounded-3xl cursor-pointer text-sm">Đăng ký</div>
				</div>
			</div>
		</HeaderAntd>
	);
};

export default Header;
