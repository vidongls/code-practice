import { Avatar, Badge, Spin } from 'antd'
import { get, isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import ClassApi from '../../../../Api/Class/ClassApi'

import { DOING_TYPE, TDOING } from '../constanst'

interface IListProps {
    data: any
    loading: boolean
}
const List: React.FC<IListProps> = ({ data, loading }) => {
    const [students, setStudents] = useState([])

    useEffect(() => {
        setStudents(get(data, 'students'))
    }, [data])

    return (
        <Spin spinning={loading}>
            <div className="rounded-md bg-white p-6 ">
                <div className="flex flex-wrap gap-4">
                    {!isEmpty(students) &&
                        students.map((item: any, index: number) => {
                            return (
                                <div
                                    className="w-64 overflow-hidden rounded-md border border-gray-200 text-white shadow"
                                    key={index}
                                >
                                    <div className="flex flex-col bg-purple-500 p-4">
                                        <h3 className="flex items-center gap-4 text-xl font-medium text-white">
                                            <Link
                                                to={get(item, 'data._id')}
                                                className="max-w-[250px] truncate "
                                            >
                                                {`${get(item, 'data.firstName', '-')} ${get(
                                                    item,
                                                    'data.lastName',
                                                    '-'
                                                )}`}
                                            </Link>
                                            {/* <MoreOutlined className="cursor-pointer hover:text-blue-400" /> */}
                                            <div></div>
                                        </h3>
                                        <div>{get(item, 'data.code')}</div>
                                    </div>
                                    <div className="relative h-12">
                                        <div className="absolute right-4 h-16 w-16 -translate-y-1/2  overflow-hidden rounded-full">
                                            <img
                                                src="https://cdn-icons-png.flaticon.com/512/488/488925.png?w=826&t=st=1674057786~exp=1674058386~hmac=d534517b9024693a8f722416344c93d253b18bedc3de67d0c47113faa4b94e32"
                                                alt=""
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end p-4">
                                        <Badge
                                            status={DOING_TYPE[item.status as TDOING]?.status}
                                            text={DOING_TYPE[item.status as TDOING]?.label}
                                            className="text-black"
                                        />
                                    </div>
                                </div>
                            )
                        })}
                </div>
            </div>
        </Spin>
    )
}

export default List
