import React from 'react'
import Box from '../../components/Box'

type Props = {}

const Profile = (props: Props) => {
    return (
        <div className="p-8 pt-2  lg:p-24 lg:pt-2">
            <Box className="p-6">
                <div className="mb-4 flex items-center justify-between border-b border-b-gray-200 pb-3">
                    <h3 className="text-medium text-lg">Lớp học</h3>
                </div>

                <div className="rounded-md bg-white p-6 "></div>
            </Box>
        </div>
    )
}

export default Profile
