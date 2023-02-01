import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, Layout, Menu } from 'antd'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import logo from '../../resources/img/logo-main.png'
import { useAuthStore } from '../../store/useAuthStore'
import Navbar from './Navbar'
import SearchInput from './SearchInput'

const { Header: HeaderAntd } = Layout

const Header: React.FC = props => {
    const { isLogin, user, logout } = useAuthStore()
    console.log('🧙 ~ user', user)
    const navigate = useNavigate()

    const handleRedirectLogin = () => {
        navigate('/login')
    }

    const handleRedirectRegister = () => {
        navigate('/register')
    }

    const handleRedirectProfile = () => {
        navigate('/profile')
    }

    const menu = (
        <Menu
            items={[
                {
                    label: <p>Thông tin tài khoản</p>,
                    key: 'profile',
                    onClick: handleRedirectProfile,
                },
                {
                    label: <p>Đăng xuất</p>,
                    key: 'logout',
                    onClick: logout,
                },
            ]}
        />
    )

    return (
        <HeaderAntd className="header sticky top-0 z-50 mb-5 bg-white">
            <div className=" flex items-center justify-between px-9">
                <div className="logo flex items-center justify-center">
                    <div className="mx-auto w-20 ">
                        <Link to="/">
                            <img
                                src={logo}
                                className="h-full w-full object-cover"
                                alt="logo"
                            />
                        </Link>
                    </div>
                </div>

                {!isLogin() ? (
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
                ) : (
                    <div className="header-right flex items-center">
                        <SearchInput />
                        <Navbar />
                        <Dropdown
                            overlay={menu}
                            className="ml-10 cursor-pointer hover:text-blue-400"
                        >
                            <div>
                                <Avatar icon={<UserOutlined />} />

                                <span className="ml-2"> {user?.userName}</span>
                            </div>
                        </Dropdown>
                    </div>
                )}
            </div>
        </HeaderAntd>
    )
}

export default Header
