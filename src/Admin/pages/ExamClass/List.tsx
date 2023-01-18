import { DeleteOutlined, EditOutlined, UserOutlined, InfoCircleOutlined, MoreOutlined } from '@ant-design/icons'
import { Avatar, Button, Modal, notification, Spin, Table, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'

import { get, isEmpty } from 'lodash'
import ClassApi from '../../../Api/Class/ClassApi'

interface IListProps {}
const List: React.FC<IListProps> = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getListDoing = () => {
            setLoading(true)
            ClassApi.getClassesDoing()
                .then(res => {
                    setData(get(res, 'data.data', []))
                })
                .catch(() => {})
                .finally(() => setLoading(false))
        }

        getListDoing()
    }, [])
    console.log(data)
    return (
        <Spin spinning={loading}>
            <div className="rounded-md bg-white p-6 ">
                <div className="flex flex-wrap gap-4">
                    {!isEmpty(data) &&
                        data.map((item: any) => {
                            return (
                                <div className="w-72 overflow-hidden rounded-md border border-gray-200 text-white shadow">
                                    <div className="flex flex-col gap-4 bg-amber-600 p-4">
                                        <h3 className="flex items-center gap-4 text-xl font-medium text-white">
                                            <p className="max-w-[250px] truncate ">{get(item, 'data.name')}</p>
                                            {/* <MoreOutlined className="cursor-pointer hover:text-blue-400" /> */}
                                            <div></div>
                                        </h3>
                                        <span>{`${get(item, 'data.authorId.firstName')} ${get(
                                            item,
                                            'data.authorId.lastName'
                                        )}`}</span>
                                    </div>
                                    <div className="relative h-24">
                                        <div className="absolute right-4 h-16 w-16 -translate-y-1/2  overflow-hidden rounded-full">
                                            <img
                                                src="https://lh3.googleusercontent.com/a-/AD5-WClSLMtj1oFVbRmsBKN-95mcgUsBn3sNHdhDl5hK=s75-c"
                                                alt=""
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end p-4">
                                        <div>
                                            {item.students.map((student: any, index: number) => {
                                                return index > 3 ? (
                                                    <></>
                                                ) : (
                                                    <Avatar
                                                        src={
                                                            student.avatar
                                                                ? student.avatar
                                                                : 'https://cdn-icons-png.flaticon.com/512/488/488925.png?w=826&t=st=1674057786~exp=1674058386~hmac=d534517b9024693a8f722416344c93d253b18bedc3de67d0c47113faa4b94e32'
                                                        }
                                                        className="ml-1"
                                                    />
                                                )
                                            })}
                                        </div>
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
