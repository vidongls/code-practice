import React from 'react'

import { FileFilled } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import Box from '../../../../components/Box'

const NewExercise: React.FC = () => {
    return (
        <Box
            className="col-span-1 p-3"
            headerContent={
                <>
                    <div className="flex items-center text-lg font-medium">
                        <FileFilled className="mr-2" /> Bài tập mới
                    </div>
                    <div className="btn bg-secondary hover:bg-tertiary ">Tải lại</div>
                </>
            }>
            <ul className="list-disc">
                <li className="ml-8 mb-3">
                    <Link to="#">TIMUOC - Tìm ước của 1 số</Link>
                </li>
                <li className="ml-8 mb-3">
                    <Link to="#">TIMUOC - Tìm ước của 1 số</Link>
                </li>
                <li className="ml-8 mb-3">
                    <Link to="#">TIMUOC - Tìm ước của 1 số</Link>
                </li>
                <li className="ml-8 mb-3">
                    <Link to="#">TIMUOC - Tìm ước của 1 số</Link>
                </li>
                <li className="ml-8 mb-3">
                    <Link to="#">TIMUOC - Tìm ước của 1 số</Link>
                </li>
                <li className="ml-8 mb-3">
                    <Link to="#">TIMUOC - Tìm ước của 1 số</Link>
                </li>
                <li className="ml-8 mb-3">
                    <Link to="#">TIMUOC - Tìm ước của 1 số</Link>
                </li>
                <li className="ml-8 mb-3">
                    <Link to="#">TIMUOC - Tìm ước của 1 số</Link>
                </li>
            </ul>
        </Box>
    )
}

export default NewExercise
