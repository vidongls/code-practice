import React from "react";
import Header from "./Header/Header";

interface IDefaultLayoutProps {
	children: React.ReactNode;
}

const DefaultLayout: React.FC<IDefaultLayoutProps> = ({ children }) => {
	return (
		<>
			<Header />
			<main className="bg-gray-100">{children}</main>
		</>
	);
};

export default DefaultLayout;
