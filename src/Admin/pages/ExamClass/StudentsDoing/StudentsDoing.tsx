import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ClassApi from '../../../../Api/Class/ClassApi'
import List from './List'
import { get } from 'lodash'
import { ArrowLeftOutlined } from '@ant-design/icons'

const StudentsDoing = () => {
    const { id } = useParams()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const getListDoing = () => {
            setLoading(true)
            ClassApi.getOneClassesDoing({ classId: id })
                .then(res => {
                    console.log('🧙 ~ res', res.data)
                    setData(get(res, 'data', []))
                })
                .catch(() => {})
                .finally(() => setLoading(false))
        }

        getListDoing()
    }, [id])

    return (
        <div className="h-full w-full py-8 px-7">
            <div className="my-3 mt-0 flex items-center justify-between">
                <div>
                    <Link
                        to={-1 as any}
                        className="mb-2 flex w-fit items-center"
                    >
                        <ArrowLeftOutlined className="mr-2" />
                        Trở về
                    </Link>
                </div>
            </div>
            <div className="my-6 mt-0 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Danh sách học sinh đang thi - {get(data, 'classes.name')}</h3>
            </div>

            <List
                data={data}
                loading={loading}
            />
        </div>
    )
}

export default StudentsDoing
