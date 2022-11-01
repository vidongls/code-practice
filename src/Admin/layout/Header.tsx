import { Avatar, Dropdown, Layout, Menu } from 'antd'
import React from 'react'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'

interface Props {
    handleOpenSidebar: () => void
    handleCloseSidebar: () => void
    collapsed: boolean
}

const { Header: HeaderAntd } = Layout

const Header: React.FC<Props> = ({ handleOpenSidebar, handleCloseSidebar, collapsed }) => {
    const { logout } = useAuthStore()

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
            {collapsed ? (
                <MenuUnfoldOutlined onClick={handleOpenSidebar} />
            ) : (
                <MenuFoldOutlined onClick={handleCloseSidebar} />
            )}

            <Dropdown
                overlay={menu}
                trigger={['click']}
                className="cursor-pointer"
            >
                <Avatar
                    style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }}
                    size="large"
                >
                    User
                </Avatar>
            </Dropdown>
        </HeaderAntd>
    )
}

export default Header
