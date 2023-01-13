import React, { useEffect, useState } from 'react'
import Box from '../../../../components/Box'
import StatisticApi from '../../../../Api/Statistic/StatisticApi'
import { get } from 'lodash'

type Props = {}

const Statistic = (props: Props) => {
    const [statistic, setStatistic] = useState({})

    useEffect(() => {
        const getStatistic = () => {
            StatisticApi.getsHomeStatistic()
                .then(res => {
                    setStatistic(get(res, 'data'))
                })
                .catch(() => {})
        }

        getStatistic()
    }, [])

    return (
        <Box
            className=" mt-4 p-5"
            headerContent={
                <>
                    <div className="text-lg font-medium">Thống kê</div>
                    {/* <div className="btn bg-secondary hover:bg-tertiary ">Tải lại</div> */}
                </>
            }
        >
            <ul className="ml-4 list-disc">
                <li>
                    <span>Số lượng bài tập: </span>
                    <span>{get(statistic, 'totalChallenge', 0)}</span>
                </li>
                <li>
                    <span>Tổng số bài nộp: </span>
                    <span>{get(statistic, 'totalSubmitChallenge', 0)}</span>
                </li>
                <li>
                    <span>Số lượng thành viên: </span>
                    <span>{get(statistic, 'totalUser', 0)}</span>
                </li>
                <li>
                    <span>Số bài nộp hôm nay: </span>
                    <span>{get(statistic, 'totalSubmitChallengeToday', 0)}</span>
                </li>
            </ul>
        </Box>
    )
}

export default Statistic
