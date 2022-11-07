import React, { useEffect, useState } from 'react'
import Filter from './Filter'
import List from './List'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import useParams from '../../../utils/useParams'
import ChallengeApi from '../../../Api/Challenge/ChallengeApi'

interface IAdminChallengeProps {}

const AdminChallenge: React.FC<IAdminChallengeProps> = props => {
    const { params, addParams } = useParams()
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const getChallenge = () => {
            setLoading(true)
            ChallengeApi.getAll(params)
                .then(res => {
                    setData(res.data)
                })
                .catch(error => {})
                .finally(() => {
                    setLoading(false)
                })
        }
        getChallenge()
    }, [params])

    return (
        <div className="h-full w-full py-8 px-7">
            <div className="my-6 mt-0 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Challenge</h3>
                <Link to="create">
                    <Button
                        type="primary"
                        className="rounded bg-primary font-medium"
                    >
                        <PlusOutlined className="anticon-custom" />
                        Tạo mới challenge
                    </Button>
                </Link>
            </div>
            <Filter
                params={params}
                addParams={addParams}
            />
            <List
                data={data}
                loading={loading}
            />
        </div>
    )
}

export default AdminChallenge
