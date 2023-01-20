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
import Submission from '../pages/Submission'
import Student from '../Admin/pages/Student'
import Lobby from '../pages/Lobby'
import ChallengeStatics from '../Admin/pages/Challange/Statics'
import ChallengeEdit from '../Admin/pages/Challange/Edit'
import AdminChallengeDetail from '../Admin/pages/Challange/Detail'
import PrivateAdminRoute from './PrivateAdminRoute'
import AdminClass from '../Admin/pages/Class'
import LiveCode from '../pages/LiveCode'
import AdminLiveCode from '../Admin/pages/LiveCode'
import ExamClass from '../Admin/pages/ExamClass'
import StudentsDoing from '../Admin/pages/ExamClass/StudentsDoing/StudentsDoing'
import ExamList from '../pages/Exam/ExamList'
import ExamDoing from '../pages/Exam/ExamDoing'

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
                <Route path="exam">
                    <Route
                        element={<Exam />}
                        index
                    />
                    <Route
                        element={<ExamList />}
                        path=":classId"
                    />
                    <Route
                        element={<ExamDoing />}
                        path=":classId/:challengeId"
                    />
                </Route>

                <Route
                    path="submissions"
                    element={<Submission />}
                />
                <Route
                    path="lobby"
                    element={<Lobby />}
                />
                <Route
                    path="challenge/:id"
                    element={<Challenge />}
                />
                <Route
                    path="live-code"
                    element={<LiveCode />}
                />
            </Route>
            {/* 
            <Route
                path="challenge/:id"
                element={<PrivateRoute Component={Challenge} />}
            /> */}

            <Route
                path="admin"
                element={<PrivateAdminRoute Component={AdminDefaultLayout} />}
            >
                <Route
                    path=""
                    element={<AdminChallenge />}
                />
                <Route path="challenge">
                    <Route
                        index
                        element={<AdminChallenge />}
                    />
                    <Route
                        path="create"
                        element={<ChallengeCreate />}
                    />
                    <Route
                        path=":id"
                        element={<AdminChallengeDetail />}
                    />
                    <Route
                        path="edit/:id"
                        element={<ChallengeEdit />}
                    />

                    <Route
                        path="statics/:id"
                        element={<ChallengeStatics />}
                    />
                </Route>

                <Route
                    path="students"
                    element={<Student />}
                />
                <Route
                    path="class"
                    element={<AdminClass />}
                />
                <Route
                    path="live-code/:userId"
                    element={<AdminLiveCode />}
                />
                <Route path="exam-class">
                    <Route
                        element={<ExamClass />}
                        index
                    />

                    <Route
                        path=":id"
                        element={<StudentsDoing />}
                    />
                    <Route
                        path=":classId/:studentId"
                        element={<AdminLiveCode />}
                    />
                </Route>
            </Route>
        </Routes>
    )
}

export default Router
