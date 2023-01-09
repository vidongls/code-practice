import React, { useCallback, useEffect, useState } from 'react'

import ClassApi from '../../../Api/Class/ClassApi'
import useParams from '../../../utils/useParams'
import Filter from './Filter'
import List from './List'

interface IStudentsProps {}

const Students: React.FC<IStudentsProps> = props => {
    const { params, addParams } = useParams()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const getStudent = useCallback(() => {
        setLoading(true)
        ClassApi.getOne(params.class)
            .then(res => {
                setData(res.data?.data?.students)
            })
            .catch(error => {})
            .finally(() => {
                setLoading(false)
            })
    }, [params])

    useEffect(() => {
        if (params.class) {
            getStudent()
        }
    }, [getStudent, params.class])

    const resetData = () => {
        setData([])
    }

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
                resetData={resetData}
            />
            <List
                data={data}
                params={params}
                loading={loading}
                getStudent={getStudent}
            />
        </div>
    )
}

export default Students
