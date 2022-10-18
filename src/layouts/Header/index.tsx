import React from 'react'
import { Button, Layout } from 'antd'

import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'

const { Header: HeaderAntd } = Layout

const Header: React.FC = props => {
    const { isLogin } = useAuthStore()
    const navigate = useNavigate()

    const handleRedirectLogin = () => {
        navigate('/login')
    }

    const handleRedirectRegister = () => {
        navigate('/register')
    }

    return (
        <HeaderAntd className="header sticky top-0 mb-5 bg-white">
            <div className=" flex items-center justify-between px-9">
                <Navbar />

                {!isLogin() && (
                    <div className="header-right flex items-center">
                        <Button
                            className="mr-2 cursor-pointer rounded-3xl border border-gray-200 px-4 py-1 text-sm transition-all duration-200 hover:border-tertiary hover:text-tertiary"
                            onClick={handleRedirectLogin}
                        >
                            Đăng nhập
                        </Button>
                        <Button
                            onClick={handleRedirectRegister}
                            className="cursor-pointer rounded-3xl border border-gray-200 px-4 py-1 text-sm transition-all duration-200 hover:border-tertiary hover:text-tertiary"
                        >
                            Đăng ký
                        </Button>
                    </div>
                )}
            </div>
        </HeaderAntd>
    )
}

export default Header
