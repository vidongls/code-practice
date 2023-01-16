import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'

interface INavbarProps {}

const Navbar: React.FC<INavbarProps> = props => {
    const { user } = useAuthStore()

    const navList = [
        {
            label: 'Trang chủ',
            to: '/',
        },
        {
            label: 'Bài tập',
            to: 'exercise',
        },
        // {
        //     label: 'Kỳ thi',
        //     to: 'exam',
        // },
        // {
        //     label: 'Bài nộp',
        //     to: 'submissions',
        // },
        // {
        //     label: 'Xếp hạng',
        //     to: 'rank',
        // },
        {
            label: 'Live code',
            to: 'live-code',
        },
        user.role !== 'USER'
            ? {
                  label: 'Quản lý',
                  to: 'admin',
              }
            : {
                  label: '',
                  to: '233',
              },
    ]

    return (
        <div className="header-left flex items-center">
            <ul className="navigation ml-3 flex items-center">
                {navList.map((nav, idx) => (
                    <li key={idx}>
                        <div>
                            <NavLink
                                to={nav.to}
                                className={({ isActive }) => (isActive ? 'active' : undefined)}
                                end
                            >
                                {nav.label}
                            </NavLink>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Navbar
