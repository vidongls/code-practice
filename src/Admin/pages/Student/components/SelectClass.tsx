import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
import ClassApi from '../../../../Api/Class/ClassApi'

interface ISelectClassProps {
    onChange: (value: any) => void
    value?: any
}

const SelectClass: React.FC<ISelectClassProps> = ({ onChange, value }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getAll = async () => {
            setLoading(true)
            try {
                const res = await ClassApi.getClassByAuthor()
                setData(res.data.data)
            } catch (error) {
            } finally {
                setLoading(false)
            }
        }

        getAll()
    }, [])

    return (
        <Select
            placeholder="Chọn lớp"
            allowClear
            loading={loading}
            options={data.map((item: any) => ({ label: item.name, value: item._id }))}
            onChange={onChange}
            value={value ? value : undefined}
        />
    )
}

export default SelectClass
