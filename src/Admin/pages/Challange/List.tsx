import { Typography, Table, Tooltip, Modal, Badge } from 'antd'
import React, { useState } from 'react'
import { AlignType } from 'rc-table/lib/interface'
import { CHALLENGE_LEVEL, CHALLENGE_LEVEL_COLOR, TChallengeLevel } from '../../../pages/Challenge/constants/constants'
import { formatDate, truncateString } from '../../../helper/helper'
import { Link } from 'react-router-dom'
interface IListProps {
    data: any
    loading: boolean
}
const { Paragraph } = Typography
const List: React.FC<IListProps> = ({ data, loading }) => {
    const [ellipsis, setEllipsis] = useState(true)

    const columns = [
        {
            title: 'Mã challenge',
            dataIndex: 'code',
            key: 'code',
            render: (text: string, record: any) => {
                const id = record?._id
                return (
                    <Link
                        to={id}
                        className="font-semibold text-blue-600"
                    >
                        {text}
                    </Link>
                )
            },
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Mức độ',
            dataIndex: 'level',
            key: 'level',
            render: (text: TChallengeLevel) => {
                return (
                    <Badge
                        color={CHALLENGE_LEVEL_COLOR[text]}
                        text={CHALLENGE_LEVEL[text]}
                    />
                )
            },
        },
        {
            title: 'Mô tả',
            dataIndex: 'describe',
            key: 'describe',
            width: '25%',
            render: (text: string) => {
                return (
                    <div>
                        <span>{truncateString(text, 80)}</span>

                        {text.length >= 80 && (
                            <span
                                onClick={() => onViewDescribe(text)}
                                className="ml-2 cursor-pointer whitespace-nowrap text-blue-500 hover:text-blue-400"
                            >
                                Xem thêm
                            </span>
                        )}
                    </div>
                )
                // <div dangerouslySetInnerHTML={{ __html: text }}></div>
            },
            // align: 'right' as AlignType,
        },
        {
            title: 'Người tạo',
            key: 'author',
            dataIndex: ['author', 'userName'],
        },
        {
            title: 'Ngày tạo',
            key: 'createdAt',
            dataIndex: 'createdAt',
            render: (text: string) => <span>{formatDate(text)}</span>,
        },
    ]

    const onViewDescribe = (content: string) => {
        Modal.confirm({
            title: '',
            icon: false,
            width: 800,
            content: <div dangerouslySetInnerHTML={{ __html: content }}></div>,
            closable: true,
            cancelText: 'Đóng',
            okButtonProps: { className: 'hidden' },
        })
    }

    return (
        <div className="rounded-md bg-white p-6 ">
            <div className="my-6 mt-0 flex items-center">
                <h3 className="text-base font-semibold">Danh sách challenge</h3>

                <span className="text-gray-900y ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-200 text-xs font-semibold ">
                    2
                </span>
            </div>
            <Table
                columns={columns}
                rowKey={(record: any) => record?._id}
                loading={loading}
                dataSource={data}
                scroll={{
                    x: 768,
                }}
            />
        </div>
    )
}

export default List
