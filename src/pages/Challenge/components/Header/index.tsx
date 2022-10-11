import { Layout, PageHeader } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

interface IHeaderProp {}

const { Header: HeaderAntd } = Layout

const Header: React.FC<IHeaderProp> = props => {
    const routes = [
        {
            path: 'index',
            breadcrumbName: 'First-level Menu',
        },
        {
            path: 'first',
            breadcrumbName: 'Second-level Menu',
        },
        {
            path: 'second',
            breadcrumbName: 'Third-level Menu',
        },
    ]

    return (
        <HeaderAntd className="header sticky top-0 flex items-center bg-gray-700 h-[50px]">
            <div className="logo flex items-center justify-center">
                <Link
                    to="/"
                    className="text-4xl font-extrabold text-white">
                    Non
                </Link>
            </div>
            <PageHeader
                className="challenge-page-header"
                title={false}
                breadcrumb={{ routes }}
                subTitle={false}
            />
        </HeaderAntd>
    )
}

export default Header
