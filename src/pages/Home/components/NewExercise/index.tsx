import React, { useEffect, useState } from 'react'

import { FileFilled } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import Box from '../../../../components/Box'
import ChallengeApi from '../../../../Api/Challenge/ChallengeApi'
import { Spin } from 'antd'
import { get } from 'lodash'

const NewExercise: React.FC = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        const getNewestChallenge = async () => {
            setLoading(true)
            try {
                const res = await ChallengeApi.getNewestChallenge()
                setData(res.data?.data)
            } catch (error) {
                if (get(error, 'response.data.code') === 'AUTHORIZE_INVALID') {
                    navigate('/login')
                }
            } finally {
                setLoading(false)
            }
        }

        getNewestChallenge()
    }, [])

    return (
        <Spin spinning={loading}>
            <Box
                className="col-span-1 p-5"
                headerContent={
                    <>
                        <div className="flex items-center text-lg font-medium">
                            <FileFilled className="mr-2" /> Bài tập mới
                        </div>
                        {/* <div className="btn bg-secondary hover:bg-tertiary ">Tải lại</div> */}
                    </>
                }
            >
                <ul className="min-h-[300px] list-decimal">
                    {data.map((item: any) => {
                        return (
                            <li
                                className="ml-8 mb-3"
                                key={item.id}
                            >
                                <Link
                                    to={`/challenge/${item.id}`}
                                    className="text-base"
                                >
                                    {item.title}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </Box>
        </Spin>
    )
}

export default NewExercise
