import React from 'react'
import { Routes, Route } from 'react-router-dom'
import DefaultLayout from '../layouts/DefaultLayout'
import Home from '../pages/Home'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Exercise from '../pages/Exercise'
import Challenge from '../pages/Challenge'
import Exam from '../pages/Exam'
import PrivateRoute from './PrivateRoute'
import AdminDefaultLayout from '../Admin/layout/AdminDefaultLayout'
import AdminChallenge from '../Admin/pages/Challange'
import ChallengeCreate from '../Admin/pages/Challange/Create'

const Router = () => {
    return (
        <Routes>
            <Route
                path="login"
                element={<Login />}
            />
            <Route
                path="register"
                element={<Register />}
            />
            <Route
                path="/"
                element={<PrivateRoute Component={DefaultLayout} />}
            >
                <Route
                    index
                    element={<Home />}
                />
                <Route
                    path="exercise"
                    element={<Exercise />}
                />
                <Route
                    path="exam"
                    element={<Exam />}
                />
            </Route>

            <Route
                path="challenge"
                element={<PrivateRoute Component={Challenge} />}
            />

            <Route
                path="admin"
                element={<AdminDefaultLayout />}
            >
                <Route
                    path="challenge"
                    element={<AdminChallenge />}
                />

                <Route
                    path="challenge/create"
                    element={<ChallengeCreate />}
                />
            </Route>
        </Routes>
    )
}

export default Router
