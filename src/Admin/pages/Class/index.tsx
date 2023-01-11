import { Table } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import ClassApi from '../../../Api/Class/ClassApi'
import useParams from '../../../utils/useParams'
import List from './List'
import { setDocumentTitle } from '../../../helper/helper'

const AdminClass = () => {
    const { params, addParams } = useParams()
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setDocumentTitle('Lớp')
    }, [])

    const getClass = useCallback(async () => {
        setLoading(true)
        try {
            const res = await ClassApi.getClassByAuthor(params)
            setData(res.data.data)
        } catch (error) {
        } finally {
            setLoading(false)
        }
    }, [params])

    useEffect(() => {
        getClass()
    }, [getClass])

    return (
        <div className="h-full w-full py-8 px-7">
            <div className="my-6 mt-0 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Lớp</h3>
            </div>

            <List
                data={data}
                params={params}
                loading={loading}
                getClass={getClass}
            />
        </div>
    )
}

export default AdminClass
