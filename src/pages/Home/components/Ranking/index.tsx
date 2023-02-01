import React, { useEffect, useState } from 'react'

import ChallengeApi from '../../../../Api/Challenge/ChallengeApi'
import Box from '../../../../components/Box'
import { classNames } from '../../../../helper/helper'
import { Spin } from 'antd'
import { isEmpty } from 'lodash'

interface IRankingProps {}

const Ranking: React.FC<IRankingProps> = props => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getNewestChallenge = async () => {
            setLoading(true)
            try {
                const res = await ChallengeApi.getRankingChallenge()
                setData(res.data?.data)
            } catch (error) {
                console.log('🧙 ~ error', error)
            } finally {
                setLoading(false)
            }
        }

        getNewestChallenge()
    }, [])

    return (
        <>
            <Box
                className="h-full p-5 lg:mt-0"
                headerContent={
                    <>
                        <div className="text-lg font-medium">Xếp hạng</div>
                        {/* <div className="btn bg-secondary hover:bg-tertiary ">Tải lại</div> */}
                    </>
                }
            >
                <Spin spinning={loading}>
                    {!isEmpty(data) ? (
                        data?.map((item: any, index: number) => {
                            return (
                                <div
                                    className="mb-1"
                                    key={index}
                                >
                                    <span>{index + 1}. </span>
                                    <span
                                        className={classNames('font-semibold', {
                                            'text-orange-500': index === 0,
                                            'text-purple-600': index !== 0,
                                        })}
                                    >
                                        {item?.user?.userName}
                                    </span>
                                    <span> - {item.count} bài</span>
                                </div>
                            )
                        })
                    ) : (
                        <div className="flex justify-center">Chưa có dữ liệu</div>
                    )}
                </Spin>
            </Box>
        </>
    )
}

export default Ranking
