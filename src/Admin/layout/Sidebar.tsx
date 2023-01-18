import { CloseOutlined, TeamOutlined, NodeIndexOutlined, ApartmentOutlined, FileSyncOutlined } from '@ant-design/icons'
import { Layout, Menu, MenuProps } from 'antd'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../resources/img/logo-main.png'

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
                setOpenKeys(['challenge'])
                break
            case '/admin/challenge':
                setOpenKeys(['challenge'])
                break
            case '/admin/students':
                setOpenKeys(['students'])
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
            label: <Link to={'challenge'}>Bài tập</Link>,
            key: 'challenge',
            icon: <NodeIndexOutlined />,
        },
        {
            label: <Link to={'students'}>Sinh viên</Link>,
            key: 'students',
            icon: <ApartmentOutlined />,
        },
        {
            label: <Link to={'class'}>Lớp</Link>,
            key: 'class',
            icon: <TeamOutlined />,
        },
        {
            label: <Link to={'exam-class'}>Lớp thi</Link>,
            key: 'exam-class',
            icon: <FileSyncOutlined />,
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
            {sm && (
                <div className="mx-auto max-w-[90px] ">
                    <Link to="/">
                        <img
                            src={logo}
                            className="h-full w-full object-cover"
                            alt="logo"
                        />
                    </Link>
                </div>
            )}

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
