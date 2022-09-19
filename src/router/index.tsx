import React from "react";
import { Routes, Route } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import Landing from "../pages/Landing";

const Router = () => {
	return (
		<Routes>
			<Route path="*" element={<Landing />}></Route>
		</Routes>
	);
};

export default Router;
