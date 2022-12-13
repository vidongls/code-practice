import { Modal, notification, Spin, Table, Tooltip } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

import { classNames, formatDate, truncateString } from '../../../helper/helper'
import { CHALLENGE_LEVEL, CHALLENGE_LEVEL_COLOR, TChallengeLevel } from '../../../pages/Challenge/constants/constants'
import ChallengeApi from '../../../Api/Challenge/ChallengeApi'

interface IListProps {
    data: any
    loading: boolean,
    params: object
}
const List: React.FC<IListProps> = ({ data, loading }) => {
    const [loadingDelete, setLoadingDelete] = useState(false)
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
                    <span
                        className={classNames('rounded px-2.5 py-0.5 text-xs font-semibold', {
                            [CHALLENGE_LEVEL_COLOR[text]]: true,
                        })}
                    >
                        {CHALLENGE_LEVEL[text]}
                    </span>
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
                        <span dangerouslySetInnerHTML={{ __html: truncateString(text, 100) }}></span>

                        {text.length >= 100 && (
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
        {
            title: '',
            key: '_id',
            dataIndex: '_id',
            render: (text: string) => (
                <div>
                    <Tooltip title="Xóa">
                        <Spin spinning={loadingDelete}>
                            <DeleteOutlined
                                className="cursor-pointer p-3 hover:text-red-500"
                                onClick={() => onDeleteChallenge(text)}
                            />
                        </Spin>
                    </Tooltip>
                </div>
            ),
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

    // const onConfirmDelete = (id: string) => {
    //     Modal.confirm({
    //         title: 'Bạn thực sự muốn xóa challenge này?',
    //         icon: <ExclamationCircleOutlined />,
    //         width: 600,
    //         content: '',
    //         closable: true,
    //         cancelText: 'Đóng',
    //         okText: 'Xoá',
    //         okButtonProps: { loading: loadingDelete },
    //         onOk: () => onDeleteChallenge(id),
    //     })
    // }

    const onDeleteChallenge = (id: string) => {
        Modal.confirm({
            title: 'Bạn thực sự muốn xóa challenge này?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            onOk() {
                return ChallengeApi.remove(id)
                    .then(result => {
                        notification.success({ message: 'Xoá challenge thành công' })
                    })
                    .catch(err => {
                        notification.error({ message: 'Xoá challenge thất bại' })
                    })
            },
            onCancel() {},
        })
    }

    return (
        <>
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
            <Modal
                title="Title"
                // open={open}
                // onOk={handleOk}
                // confirmLoading={confirmLoading}
                // onCancel={handleCancel}
            >
                {/* <p>{modalText}</p> */}
            </Modal>
        </>
    )
}

export default List
