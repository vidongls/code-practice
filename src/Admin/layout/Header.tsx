import { Avatar, Dropdown, Layout, Menu } from 'antd'
import React from 'react'
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'
import Navigator from './Navigator'
interface Props {
    handleOpenSidebar: () => void
    handleCloseSidebar: () => void
    collapsed: boolean
}

const { Header: HeaderAntd } = Layout

const Header: React.FC<Props> = ({ handleOpenSidebar, handleCloseSidebar, collapsed }) => {
    const { isLogin, user, logout } = useAuthStore()

    let navigate = useNavigate()
    const handleLogout = (): void => {
        logout()
        navigate('/login')
    }

    const menu = (
        <Menu>
            <Menu.Item
                key={'1'}
                onClick={handleLogout}
            >
                Logout
            </Menu.Item>
        </Menu>
    )

    return (
        <HeaderAntd className="header flex items-center justify-between">
            <div className="flex items-center gap-3">
                {collapsed ? (
                    <MenuUnfoldOutlined onClick={handleOpenSidebar} />
                ) : (
                    <MenuFoldOutlined onClick={handleCloseSidebar} />
                )}
                <div>
                    <Navigator />
                </div>
            </div>

            <Dropdown
                overlay={menu}
                className="cursor-pointer hover:text-blue-400"
            >
                <div className="cursor-pointer ">
                    <Avatar icon={<UserOutlined />} />

                    <span className="ml-2"> {user?.userName}</span>
                </div>
            </Dropdown>
        </HeaderAntd>
    )
}

export default Header
