import React, { useEffect, useState } from 'react'
import Filter from './Filter'
import List from './List'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import useParams from '../../../utils/useParams'
import ChallengeApi from '../../../Api/Challenge/ChallengeApi'
import ClassApi from '../../../Api/Class/ClassApi'

interface IStudentsProps {}

const Students: React.FC<IStudentsProps> = props => {
    const { params, addParams } = useParams()
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getStudent = () => {
            setLoading(true)
            ClassApi.getOne(params.class)
                .then(res => {
                    setData(res.data?.data?.students)
                })
                .catch(error => {})
                .finally(() => {
                    setLoading(false)
                })
        }

        if (params.class) {
            getStudent()
        }

    }, [params])

    return (
        <div className="h-full w-full py-8 px-7">
            <div className="my-6 mt-0 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Student</h3>
                {/* <Link to="create">
                    <Button
                        type="primary"
                        className="rounded bg-primary font-medium"
                    >
                        <PlusOutlined className="anticon-custom" />
                        Tạo mới Student
                    </Button>
                </Link> */}
            </div>
            <Filter
                params={params}
                addParams={addParams}
            />
            <List
                data={data}
                params={params}
                loading={loading}
            />
        </div>
    )
}

export default Students
