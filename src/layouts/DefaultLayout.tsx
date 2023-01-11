import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import { setDocumentTitle } from '../helper/helper'

interface IDefaultLayoutProps {}

const DefaultLayout: React.FC<IDefaultLayoutProps> = () => {
    useEffect(() => {
        setDocumentTitle('')
    }, [])

    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            {/* <Footer /> */}
        </>
    )
}

export default DefaultLayout
