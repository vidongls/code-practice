import React, { useRef, useState } from 'react'
import { Divider, Input, Select, Spin } from 'antd'
import { UserOutlined, SearchOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import ChallengeApi from '../../Api/Challenge/ChallengeApi'
import { get, isEmpty, trim } from 'lodash'
import useOutsideAlerter from '../../hooks/useOutsideAlerter'
import { classNames } from '../../helper/helper'

interface ISelectInput {}

let timeout: ReturnType<typeof setTimeout> | null
let currentValue: string

const SearchInput: React.FC<ISelectInput> = props => {
    const [data, setData] = useState([])
    const [isFocus, setIsFocus] = useState(false)
    const [loading, setLoading] = useState(false)

    const refInput = useRef<any>(null)

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

            ChallengeApi.userSearchChallenge({ title: trim(value) ? trim(value) : undefined })
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
            <Spin spinning={loading}>
                <Input
                    suffix={<SearchOutlined className="text-base" />}
                    placeholder="Tìm kiếm"
                    className="min-w-[400px] rounded-lg py-2"
                    onChange={e => handleChange(e.target.value)}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => {
                        setTimeout(() => {
                            setIsFocus(false)
                        }, 100)
                    }}
                    ref={refInput}
                />
            </Spin>
            <div
                className={classNames(
                    'absolute top-12 left-0 z-20 mt-2 w-full min-w-[500px] rounded-md border border-gray-200 bg-white p-4 shadow-lg shadow-gray-200',
                    {
                        hidden: !isFocus,
                    }
                )}
                // onClick={() => {
                //     setIsFocus(true)
                // }}
            >
                <div className="text-red text-base font-medium leading-5"> Tìm kiếm</div>
                <Divider className="my-2 mb-4" />
                {!isEmpty(data) ? (
                    <ul>
                        {data.map((item: any) => (
                            <li className="mb-3 cursor-pointer  rounded-md  border-b border-l-2 leading-5 transition duration-75 hover:bg-blue-50">
                                <Link
                                    to={`/challenge/${item?.id}`}
                                    className="inline-block w-full py-2 pl-2"
                                >
                                    {get(item, 'title')}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="p-2 text-center leading-4 text-gray-400">Không có dữ liệu</div>
                )}
            </div>
        </div>
    )
}

export default SearchInput
