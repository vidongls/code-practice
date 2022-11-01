import { CloseOutlined, UserOutlined, NodeIndexOutlined } from '@ant-design/icons'
import { Layout, Menu, MenuProps } from 'antd'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface Props {
    collapsed: boolean
    setCollapsed: (val: boolean) => void
    handleCloseSidebar: () => void
}

const { Sider } = Layout

const Sidebar = ({ collapsed, setCollapsed, handleCloseSidebar }: Props) => {
    const [openKeys, setOpenKeys] = useState<string[]>([''])
    const { xs, sm } = useBreakpoint()
    const location = useLocation()

    useEffect(() => {
        switch (location.pathname) {
            case '/admin':
                setOpenKeys(['admin'])
                break
            case '/admin/challenge':
                setOpenKeys(['challenge'])
                break
            default:
                break
        }
    }, [location])

    const handleChangeKey = (e: any) => {
        setOpenKeys(e.keyPath)
    }

    const items: MenuProps['items'] = [
        {
            label: <Link to={''}>Admin</Link>,
            key: 'admin',
            icon: <UserOutlined />,
        },
        {
            label: <Link to={'challenge'}>Challenge</Link>,
            key: 'challenge',
            icon: <NodeIndexOutlined />,
        },
    ]

    return (
        <Sider
            breakpoint="lg"
            collapsedWidth={xs ? '0' : undefined}
            // collapsible={!xs && true}
            trigger={null}
            collapsed={collapsed}
            className={`sidebar ${xs && 'sidebar-mobile'} ${xs ? (!collapsed ? 'expand' : '') : 'collapsed'}`}
        >
            {xs && (
                <div className="menu-collapse w- flex items-center justify-between">
                    <div className="logo">MGW</div>
                    <div
                        className="flexitems-center"
                        onClick={handleCloseSidebar}
                    >
                        <CloseOutlined />
                    </div>
                </div>
            )}
            {sm && <div className="logo">{/* <img src={logo} alt="logo" /> */}</div>}

            <Menu
                theme="light"
                mode="inline"
                selectedKeys={openKeys}
                onClick={handleChangeKey}
                items={items}
            />
        </Sider>
    )
}

export default Sidebar
