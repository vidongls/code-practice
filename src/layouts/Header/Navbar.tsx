import React from "react";
import { Link, NavLink } from "react-router-dom";

interface INavbarProps {}

const navList = [
	{
		label: "Bài tập",
		to: "exercise",
	},
	{
		label: "Kỳ thi",
		to: "exam",
	},
	{
		label: "Bài nộp",
		to: "submissions",
	},
	{
		label: "Xếp hạng",
		to: "rank",
	},
	{
		label: "Live IDE",
		to: "live-code",
	},
];

const Navbar: React.FC<INavbarProps> = (props) => {
	return (
		<div className="header-left flex items-center">
			<div className="logo">
				<Link to="/">
					<img src="https://www.hackerrank.com/wp-content/uploads/2018/08/hackerrank_logo.png" alt="logo" />
				</Link>
			</div>
			<ul className="navigation flex items-center ml-3">
				{navList.map((nav, idx) => (
					<li key={idx}>
						<NavLink to={nav.to} className={({ isActive }) => (isActive ? "active" : undefined)}>
							{nav.label}
						</NavLink>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Navbar;
