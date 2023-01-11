import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Modal, notification, Spin, Table, Tooltip } from 'antd'
import React, { useState } from 'react'

import ClassApi from '../../../Api/Class/ClassApi'
import AddClass from './AddClass'
import EditClass from './EditClass'

interface IListProps {
    data: any
    loading: boolean
    params: any
    getClass: () => void
}
const List: React.FC<IListProps> = ({ data, loading, params, getClass }) => {
    const [loadingBtn, setLoadingBtn] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [dataEdit, setDataEdit] = useState({})

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
            title: 'Chức năng',
            key: '_id',
            dataIndex: '_id',
            render: (text: string, record: any) => (
                <div className="flex items-center">
                    <Spin spinning={loadingBtn}>
                        <Tooltip title="Chỉnh sửa">
                            <div
                                // to={`/admin/challenge/edit/${id}`}
                                className="leading-3"
                            >
                                <EditOutlined
                                    className="cursor-pointer p-3 text-blue-600 hover:text-blue-400"
                                    onClick={() => handleVisibleModal(record)}
                                />
                            </div>
                        </Tooltip>
                    </Spin>

                    <Spin spinning={loadingBtn}>
                        <Tooltip title="Xóa">
                            <DeleteOutlined
                                className="cursor-pointer p-3 text-red-600 hover:text-red-400"
                                onClick={() => onDeleteChallenge(text)}
                            />
                        </Tooltip>
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
            title: 'Bạn thực sự muốn xóa lớp này?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            onOk() {
                setLoadingBtn(true)
                return ClassApi.deleteClass(id)
                    .then(result => {
                        getClass()
                        notification.success({ message: 'Xoá lớp thành công' })
                    })
                    .catch(err => {
                        notification.error({ message: 'Xoá lớp thất bại' })
                    })
                    .finally(() => setLoadingBtn(false))
            },
            onCancel() {},
        })
    }
    const handleHideModal = () => {
        setIsVisible(false)
        setDataEdit({})
    }
    const handleVisibleModal = (data: any) => {
        setIsVisible(true)
        setDataEdit(data)
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
                    <AddClass getClass={getClass} />
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
            {isVisible && (
                <EditClass
                    handleHideModal={handleHideModal}
                    getClass={getClass}
                    data={dataEdit}
                />
            )}
        </>
    )
}

export default List
