import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

interface IDefaultLayoutProps {
}

const DefaultLayout: React.FC<IDefaultLayoutProps> = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default DefaultLayout
