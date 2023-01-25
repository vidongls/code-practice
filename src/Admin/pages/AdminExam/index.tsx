import React, { useEffect, useState, useCallback } from 'react'
import Filter from './Filter'
import List from './List'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import useParams from '../../../utils/useParams'
import ChallengeApi from '../../../Api/Challenge/ChallengeApi'
import { setDocumentTitle } from '../../../helper/helper'
import { useNavigatorStore } from '../../../store/useNavigatorStore'

interface IAdminExamProps {}

const AdminExam: React.FC<IAdminExamProps> = props => {
    const { setNavigator } = useNavigatorStore()
    const { params, addParams } = useParams()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const getChallenge = useCallback(() => {
        setLoading(true)
        ChallengeApi.getAllExam(params)
            .then(res => {
                setData(res.data?.challenge)
            })
            .catch(error => {})
            .finally(() => {
                setLoading(false)
            })
    }, [params])

    useEffect(() => {
        getChallenge()
    }, [getChallenge])

    useEffect(() => {
        setDocumentTitle('Bài thi')
        setNavigator({
            title: 'exam',
            navigator: [
                {
                    name: 'Bài thi',
                },
            ],
        })
    }, [])

    return (
        <div className="h-full w-full py-8 px-7">
            <div className="my-6 mt-0 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Bài tập</h3>
                <Link to="/admin/challenge/create">
                    <Button
                        type="primary"
                        className="rounded bg-primary font-medium"
                    >
                        <PlusOutlined className="anticon-custom" />
                        Tạo mới bài tập
                    </Button>
                </Link>
            </div>
            <Filter
                params={params}
                addParams={addParams}
            />
            <List
                data={data}
                params={params}
                loading={loading}
                getChallenge={getChallenge}
            />
        </div>
    )
}

export default AdminExam
