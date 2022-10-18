import { Navigate, Outlet, useLocation } from 'react-router-dom'
import DefaultLayout from '../layouts/DefaultLayout'
import { useAuthStore } from '../store/useAuthStore'

interface IPrivateRouteProps {}

const PrivateRoute: React.FC<IPrivateRouteProps> = () => {
    const { isLogin } = useAuthStore()
    const location = useLocation()

    console.log('isLogin', isLogin())

    return isLogin() ? <Outlet /> : <Navigate to={'/'} />
}

export default PrivateRoute
