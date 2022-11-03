import React, { useState } from 'react'
import Filter from './Filter'
import List from './List'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import useParams from '../../../utils/useParams'
interface IAdminChallengeProps {}

const AdminChallenge: React.FC<IAdminChallengeProps> = props => {
    const { params, addParams } = useParams({ name: 'assa' })
    const [data, setData] = useState()
    console.log('s', params)

    const handleSearchParams = () => {
        addParams({ cc: 'nguuu', lasdas: 'sa' })
    }

    return (
        <div className="h-full w-full py-8 px-7">
            <div className="my-6 mt-0 flex items-center justify-between">
                <h3
                    className="text-lg font-semibold"
                    onClick={handleSearchParams}
                >
                    Challenge
                </h3>
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
            <Filter />
            <List data={data} />
        </div>
    )
}

export default AdminChallenge
