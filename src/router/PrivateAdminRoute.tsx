import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { isManager } from '../helper/helper'

import { useAuthStore } from '../store/useAuthStore'

interface IPrivateAdminRouteProps {
    Component: any
}

const PrivateAdminRoute: React.FC<IPrivateAdminRouteProps> = ({ Component }) => {
    const { isLogin, getUser } = useAuthStore()

    if (!isLogin()) {
        return <Navigate to={'/login'} />
    }

    return isManager(getUser().role) ? <Component /> : <Navigate to={'/'} />
}

export default PrivateAdminRoute
// vidong12345@gmail.com
// Vidong123@
