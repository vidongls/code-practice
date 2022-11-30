import { AutoComplete, Input, notification, Select, Spin, Table, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons'
import { useDebounce } from '../../../../hooks/useDebounce'
import { Link } from 'react-router-dom'
import UserApi from '../../../../Api/User/UserApi'

interface ISearchStudentProps {
    selectedItems: any[]
    setSelectedItems: (value: any) => void
}

const { Option } = Select

const userFake = [
    {
        _id: '1',
        userName: 'hehe',
        avatar: '',
    },
    {
        _id: '2',
        userName: 'hehe',
        avatar: '',
    },
]

const SearchStudent: React.FC<ISearchStudentProps> = ({ selectedItems, setSelectedItems }) => {
    const [value, setValue] = useState('')
    const [results, setResults] = useState([])

    const [loading, setLoading] = useState(false)

    const debouncedSearchTerm = useDebounce(value, 1500)

    // Effect for API call
    useEffect(
        () => {
            if (debouncedSearchTerm) {
                setLoading(true)

                UserApi.getAll({ keyword: debouncedSearchTerm })
                    .then(res => {
                        setResults(res.data)
                    })
                    .catch(err => {
                        notification.error({ message: 'Có lỗi xảy ra!' })
                    })
                    .finally(() => setLoading(false))
            } else {
                setResults([])
                setLoading(false)
            }
        },
        [debouncedSearchTerm] // Only call effect if debounced search term changes
    )

    const onChange = (text: string) => {
        setValue(text)
    }
    const renderOptions = (option: any) => {
        console.log('🧙 ~ option', option)
        return {
            label: `${option.userName} - ${option.code}`,
            value: option?._id,
            id: option?._id,
            ...option,
        }
    }

    const onSelect = (option: any) => {
        const selectedIds = selectedItems.map(item => item._id)
        if (!selectedIds.includes(option._id)) {
            setSelectedItems([...selectedItems, option])
        }
        setValue('')
        setResults([])
    }

    return (
        <div>
            <AutoComplete
                options={results.map(renderOptions)}
                onSelect={(value: any, option: any) => onSelect(option)}
                onChange={onChange}
                style={{ width: '100%' }}
                value={value}
                notFoundContent={<p> Không có dữ liệu</p>}
                disabled={loading}
                className="complete-ant"
                children={
                    <Input
                        size="large"
                        placeholder="Nhập mã hoặc tên sinh viên"
                        prefix={loading ? <LoadingOutlined /> : <SearchOutlined />}
                        disabled={loading}
                        allowClear={true}
                    />
                }
            />
        </div>
    )
}

export default SearchStudent
