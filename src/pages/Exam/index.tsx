import { CalendarOutlined, ClockCircleOutlined, DownOutlined, RedoOutlined, SearchOutlined } from '@ant-design/icons'
import { Avatar, Badge, Button, Dropdown, Input, List, Menu, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Box from '../../components/Box'
import { get, isEmpty } from 'lodash'
import UserApi from '../../Api/User/UserApi'

interface IExamProps {}

const Exam: React.FC<IExamProps> = props => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    const menu = (
        <Menu
            items={[
                {
                    label: <p>Tất cả</p>,
                    key: '0',
                },
                {
                    label: <p>Đang diễn ra</p>,
                    key: '1',
                },
                {
                    label: <p>Chưa bắt đầu</p>,
                    key: '2',
                },
                {
                    label: <p>Đã kết thúc</p>,
                    key: '3',
                },
            ]}
        />
    )

    useEffect(() => {
        setLoading(true)
        UserApi.getInfo()
            .then(res => {
                console.log(get(res, 'data.classes'))
                setData(get(res, 'data.classes'))
            })
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="p-8 pt-2  lg:p-24 lg:pt-2">
            <Box className="p-6">
                <div className="mb-4 flex items-center justify-between border-b border-b-gray-200 pb-3">
                    <h3 className="text-medium text-lg">Lớp học</h3>
                </div>
                <Spin spinning={loading}>
                    <div className="rounded-md bg-white p-6 ">
                        <div className="flex flex-wrap gap-4">
                            {!isEmpty(data) &&
                                data.map((item: any, index: number) => {
                                    return (
                                        <div
                                            className="w-72 overflow-hidden rounded-md border border-gray-200 text-white shadow"
                                            key={index}
                                        >
                                            <div className="flex flex-col gap-4 bg-amber-600 p-4">
                                                <h3 className="flex items-center gap-4 text-xl font-medium text-white">
                                                    <Link
                                                        to={get(item, '_id')}
                                                        className="max-w-[250px] truncate "
                                                    >
                                                        {get(item, 'name')}
                                                    </Link>
                                                    {/* <MoreOutlined className="cursor-pointer hover:text-blue-400" /> */}
                                                    <div></div>
                                                </h3>
                                                <span>{`${get(item, 'authorId.firstName')} ${get(
                                                    item,
                                                    'authorId.lastName'
                                                )}`}</span>
                                            </div>
                                            <div className="relative h-24">
                                                <div className="absolute right-4 h-16 w-16 -translate-y-1/2  overflow-hidden rounded-full">
                                                    <img
                                                        src="https://cdn-icons-png.flaticon.com/512/488/488925.png?w=826&t=st=1674057786~exp=1674058386~hmac=d534517b9024693a8f722416344c93d253b18bedc3de67d0c47113faa4b94e32"
                                                        alt=""
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                </Spin>
            </Box>
        </div>
    )
}

export default Exam
