import React from 'react'
import Box from '../../components/Box'
import { Tabs } from 'antd'
import Info from './components/Info'

type Props = {}

const Profile = (props: Props) => {
    const items = [
        {
            label: 'Thông tin',
            key: 'info',
            children: <Info />,
        },
        {
            label: 'Bảo mật',
            key: 'security',
            children: <div>asdsadas</div>,
        },

        // { label: 'Bảng xếp hạng', key: 'ranking', content: 'bxh' },
    ]

    return (
        <div className="p-8 pt-2  lg:p-24 lg:pt-2">
            <Box className="p-6">
                <div>
                    <h3 className="pl-5 text-xl">Thông tin tài khoản</h3>
                    <Tabs
                        className="mt-5"
                        items={items}
                        tabPosition={'left'}
                    />
                </div>
            </Box>
        </div>
    )
}

export default Profile
