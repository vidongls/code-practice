import { Select } from 'antd'
import React, { useEffect, useState } from 'react'

import ClassApi from '../../../../Api/Class/ClassApi'
import useParams from '../../../../utils/useParams'

interface ISelectChallengeProps {
    onChange: (value: any) => void
    value?: any
    classId?: string
}

const { Option } = Select
const SelectChallenge: React.FC<ISelectChallengeProps> = ({ onChange, value, classId }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getAll = async () => {
            setLoading(true)
            try {
                const res = await ClassApi.getChallengeByClass(classId)
                setData(res.data.data)
            } catch (error) {
            } finally {
                setLoading(false)
            }
        }

        getAll()
    }, [classId])

    return (
        <>
            <Select
                placeholder="Chọn bài tập"
                allowClear
                loading={loading}
                options={data.map((item: any) => ({ label: `${item.title} - ${item.code}`, value: item._id }))}
                onChange={onChange}
                value={value ? value : undefined}
                className="min-w-[200px] "
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input)}
                filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                showSearch
            />
        </>
    )
}

export default SelectChallenge
