import React from "react";
import { Routes, Route } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import Home from "../pages/Home";

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<DefaultLayout />}>
				<Route index element={<Home />} />
				<Route path="exercise" element={<div>asdasd</div>} />
				<Route path="exam" element={<div>thiii</div>} />
			</Route>
		</Routes>
	);
};

export default Router;
