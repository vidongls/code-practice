import React, { useState } from 'react'
import { Divider, Input, Select } from 'antd'
import { UserOutlined, SearchOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import ChallengeApi from '../../Api/Challenge/ChallengeApi'
import { get } from 'lodash'

interface ISelectInput {}

let timeout: ReturnType<typeof setTimeout> | null
let currentValue: string

const SearchInput: React.FC<ISelectInput> = props => {
    const [data, setData] = useState([] as any)
    const [value, setValue] = useState('')

    const [loading, setLoading] = useState(false)

    const handleChange = (value: string) => {
        if (value) {
            getData(value)
        } else {
            setData([])
        }
    }

    const getData = (value: string) => {
        if (timeout) {
            clearTimeout(timeout)
            timeout = null
        }
        currentValue = value

        const getDataNe = () => {
            setLoading(true)
            ChallengeApi.userSearchChallenge({ title: value })
                .then(res => {
                    setData(get(res, 'data.challenge'))
                })
                .catch(() => {})
                .finally(() => {
                    setLoading(false)
                })
        }

        timeout = setTimeout(getDataNe, 300)
    }

    return (
        <div className="relative">
            <Input
                suffix={<SearchOutlined className="text-base" />}
                placeholder="Tìm kiếm"
                className="min-w-[300px] rounded-lg py-2"
                onChange={e => handleChange(e.target.value)}
            />
            <div className="absolute top-12 left-0 z-20 mt-2 w-full min-w-[500px] rounded-md border border-gray-200 bg-white p-4 shadow-lg shadow-gray-200">
                <div className="text-red text-base font-medium leading-5"> Tìm kiếm</div>
                <Divider className="my-2 mb-4" />
                <ul>
                    <li className="mb-2 cursor-pointer rounded-md  border-l-2 leading-5 transition duration-75 hover:bg-blue-50">
                        <Link
                            to=""
                            className="inline-block w-full py-2 pl-2"
                        >
                            asdsa
                        </Link>
                    </li>
                    <li className="mb-2 cursor-pointer rounded-md  border-l-2 leading-5 transition duration-75 hover:bg-blue-50">
                        <Link
                            to=""
                            className="inline-block w-full py-2 pl-2"
                        >
                            asdsa
                        </Link>
                    </li>
                    <li className="mb-2 cursor-pointer rounded-md  border-l-2 leading-5 transition duration-75 hover:bg-blue-50">
                        <Link
                            to=""
                            className="inline-block w-full py-2 pl-2"
                        >
                            asdsa
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SearchInput
