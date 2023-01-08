import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Modal, notification, Spin, Table, Tooltip } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import ClassApi from '../../../Api/Class/ClassApi'
import Avatar from '../../../components/Avatar'

interface IListProps {
    data: any
    loading: boolean
    params: any
    getClass: () => void
}
const List: React.FC<IListProps> = ({ data, loading, params, getClass }) => {
    const [loadingDelete, setLoadingDelete] = useState(false)

    const columns = [
        {
            title: 'Mã lớp',
            dataIndex: 'code',
            key: 'code',
            render: (text: string, record: any) => {
                return <span className="font-semibold">{text}</span>
            },
        },
        {
            title: 'Tên lớp',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Tổng số sinh viên',
            dataIndex: 'students',
            key: 'students',
            render: (students: any) => {
                return <span>{students?.length} Sinh viên</span>
            },
        },
        {
            title: '',
            key: '_id',
            dataIndex: '_id',
            render: (text: string) => (
                <div>
                    {' '}
                    <Spin spinning={loadingDelete}>
                        <Tooltip title="Xóa">
                            <DeleteOutlined
                                className="cursor-pointer p-3 hover:text-red-500"
                                onClick={() => onDeleteChallenge(text)}
                            />
                        </Tooltip>{' '}
                    </Spin>
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
            title: 'Bạn thực sự muốn xóa sinh viên này?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            onOk() {
                return ClassApi.removeMember(params?.class, { student: id })
                    .then(result => {
                        getClass()
                        notification.success({ message: 'Xoá sinh viên thành công' })
                    })
                    .catch(err => {
                        notification.error({ message: 'Xoá sinh viên thất bại' })
                    })
            },
            onCancel() {},
        })
    }

    return (
        <>
            <div className="rounded-md bg-white p-6 ">
                <div className="my-6 mt-0 flex items-center justify-between">
                    <div className="flex items-center">
                        <h3 className="text-base font-semibold">Danh sách lớp</h3>

                        <span className="text-gray-900y ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-200 text-xs font-semibold ">
                            {data?.length || 0}
                        </span>
                    </div>
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
        </>
    )
}

export default List
