import React from 'react'
import { Navigate } from 'react-router-dom'

import { useAuthStore } from '../store/useAuthStore'

interface IPrivateRouteProps {
    Component: any
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({ Component }) => {
    const { isLogin } = useAuthStore()
    return isLogin() ? <Component /> : <Navigate to={'/login'} />
}

export default PrivateRoute
// vidong12345@gmail.com
// Vidong123@
