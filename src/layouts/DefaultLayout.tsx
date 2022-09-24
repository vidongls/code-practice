import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";

interface IDefaultLayoutProps {}

const DefaultLayout: React.FC<IDefaultLayoutProps> = () => {
	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default DefaultLayout;
