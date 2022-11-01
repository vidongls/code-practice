import { Layout, Menu } from 'antd'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

import Sidebar from './Sidebar'

interface IAdminDefaultLayoutProps {
    // children: React.ReactNode
}

const { Content } = Layout

const AdminDefaultLayout: React.FC<IAdminDefaultLayoutProps> = props => {
    const [collapsed, setCollapsed] = useState(false)

    const handleOpenSidebar = () => {
        setCollapsed(false)
    }

    const handleCloseSidebar = () => {
        setCollapsed(true)
    }

    return (
        <Layout className="layout admin-layout">
            <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                handleCloseSidebar={handleCloseSidebar}
            />

            <Layout>
                <Header
                    handleOpenSidebar={handleOpenSidebar}
                    handleCloseSidebar={handleCloseSidebar}
                    collapsed={collapsed}
                />
                <Content className='overflow-auto'>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}

export default AdminDefaultLayout
