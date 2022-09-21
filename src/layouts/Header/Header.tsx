import React from "react";
import { Layout } from "antd";

interface IHeaderProps {}
const { Header: HeaderAntd } = Layout;

const Header: React.FC<IHeaderProps> = (props) => {
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
					<div className="px-4 mr-2 py-1 border border-gray-200 rounded-3xl cursor-pointer text-sm hover:border-blue-100 hover:text-blue-100 transition-all duration-200">
						Đăng nhập
					</div>
					<div className="px-4 py-1 border border-gray-200 rounded-3xl cursor-pointer text-sm hover:border-blue-100 hover:text-blue-100 transition-all duration-200">
						Đăng ký
					</div>
				</div>
			</div>
		</HeaderAntd>
	);
};

export default Header;
