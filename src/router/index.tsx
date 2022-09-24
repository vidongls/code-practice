import React from "react";
import { Routes, Route } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";

const Router = () => {
	return (
		<Routes>
			<Route path="login" element={<Login />} />
			<Route path="login" element={<Register />} />
			<Route path="/" element={<DefaultLayout />}>
				<Route index element={<Home />} />
				<Route path="exercise" element={<div>asdasd</div>} />
				<Route path="exam" element={<div>thiii</div>} />
			</Route>
		</Routes>
	);
};

export default Router;
