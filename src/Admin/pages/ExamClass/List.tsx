import {
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
    InfoCircleOutlined,
    MoreOutlined,
} from '@ant-design/icons'
import { Button, Modal, notification, Spin, Table, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'

import { get } from 'lodash'
import ClassApi from '../../../Api/Class/ClassApi'

interface IListProps {}
const List: React.FC<IListProps> = () => {
    useEffect(() => {
        const getListDoing = () => {
            ClassApi.getClassesDoing().then(res => {
                console.log(res.data)
            })
        }

        getListDoing()
    }, [])

    return (
        <>
            <div className="rounded-md bg-white p-6 ">
                <div className="flex flex-wrap">
                    <div className="overflow-hidden rounded-md border border-gray-200  text-white">
                        <div className="flex flex-col gap-4 bg-amber-600 p-4">
                            <h3 className="flex items-center gap-4 text-xl font-medium text-white">
                                <p className="max-w-[250px] truncate "> Công nghệ phần mềm 1</p>
                                {/* <MoreOutlined className="cursor-pointer hover:text-blue-400" /> */}
                                <div></div>
                            </h3>
                            <span>Vi Trường Đông</span>
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default List
