import React, { useEffect, useState } from 'react'

import ChallengeApi from '../../../../Api/Challenge/ChallengeApi'
import Box from '../../../../components/Box'
import { classNames } from '../../../../helper/helper'

interface IRankingProps {}

const Ranking: React.FC<IRankingProps> = props => {
    const [data, setData] = useState([])
    console.log('🧙 ~ data', data)

    useEffect(() => {
        const getNewestChallenge = async () => {
            const res = await ChallengeApi.getRankingChallenge()
            setData(res.data?.data)
        }

        getNewestChallenge()
    }, [])

    return (
        <Box
            className="p-5 lg:mt-0"
            headerContent={
                <>
                    <div className="text-lg font-medium">Xếp hạng</div>
                    {/* <div className="btn bg-secondary hover:bg-tertiary ">Tải lại</div> */}
                </>
            }
        >
            <div>
                {data.map((item: any, index: number) => {
                    return (
                        <div className="mb-1">
                            <span>{index + 1}.</span>
                            <span
                                className={classNames('font-semibold', {
                                    'text-orange-500': index === 0,
                                    'text-purple-600': index !== 0,
                                })}
                            >
                                {item?.user?.userName}
                            </span>
                            <span>- {item.count} bài</span>
                        </div>
                    )
                })}
            </div>
        </Box>
    )
}

export default Ranking
