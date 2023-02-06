import React, { useCallback, useEffect, useState } from 'react'
import Chart from './components/Chart'
import { Form, Select } from 'antd'
import SelectClass from '../Student/components/SelectClass'
import useParams from '../../../utils/useParams'
import StatisticApi from '../../../Api/Statistic/StatisticApi'
import { setDocumentTitle } from '../../../helper/helper'
import SelectChallenge from './components/SelectChallenge'

const AdminStatistics = () => {
    const { params, addParams } = useParams()

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setDocumentTitle('Thống kê')
    }, [])

    const getStatistic = useCallback(() => {
        StatisticApi.statisticByClass(params)
            .then(res => {
                setData(res.data)
            })
            .catch(error => {})
            .finally(() => {
                setLoading(false)
            })
    }, [params])

    useEffect(() => {
        if (params.classId) {
            getStatistic()
        }
    }, [getStatistic, params.classId])

    const onChangeSelect = (key: string, value: any) => {
        if (!value) {
            resetData()
        }

        addParams({ [key]: value })
    }

    const resetData = () => {
        setData([])
    }

    return (
        <div className="h-full w-full py-8 px-7">
            <div className="my-6 mt-0 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Thống kê</h3>
            </div>
            <div className="mb-5 flex items-center gap-5">
                <div>
                    <span className="mr-3">Lớp:</span>
                    <SelectClass
                        onChange={value => onChangeSelect('classId', value)}
                        value={params?.classId}
                    />
                </div>
                <div>
                    <span className="mr-3">Bài tập:</span>
                    <SelectChallenge
                        onChange={value => onChangeSelect('challengeId', value)}
                        value={params?.challengeId}
                        classId={params?.classId}
                    />
                </div>
            </div>

            <Chart data={data} />
        </div>
    )
}

export default AdminStatistics
//chart sv test case
