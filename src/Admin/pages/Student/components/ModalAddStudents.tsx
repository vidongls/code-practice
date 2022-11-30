import { Button, Modal, Table, Tooltip } from 'antd'
import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import SearchStudent from './SearchStudent'
import { Link } from 'react-router-dom'

interface IModalAddStudentsProps {}

const ModalAddStudents: React.FC<IModalAddStudentsProps> = props => {
    const [visible, setVisible] = useState(false)
    const [selectedItems, setSelectedItems] = useState([])

    const handleShowModal = () => {
        setVisible(true)
    }

    const handleHideModal = () => {
        setVisible(false)
    }
    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
        },
        {
            title: 'Mã sinh viên',
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
            title: 'Họ và tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        // {
        //     title: 'Lớp',
        //     dataIndex: 'level',
        //     key: 'level',
        // },

        {
            title: '',
            key: '_id',
            dataIndex: '_id',
            render: (text: string) => (
                <div>
                    <Tooltip title="Xóa">
                        {/* <Spin spinning={loadingDelete}>
                            <DeleteOutlined
                                className="cursor-pointer p-3 hover:text-red-500"
                                onClick={() => onDeleteChallenge(text)}
                            />
                        </Spin> */}
                    </Tooltip>
                </div>
            ),
        },
    ]

    return (
        <>
            <Button
                type="primary"
                className="rounded bg-primary font-medium"
                onClick={handleShowModal}
            >
                <PlusOutlined className="anticon-custom" />
                Thêm sinh viên
            </Button>
            {console.log('selectedItems', selectedItems)}
            {visible && (
                <Modal
                    title="Thêm sinh viên"
                    open={visible}
                    // onOk={handleOk}
                    onCancel={handleHideModal}
                    width={1000}
                    footer={
                        <>
                            <Button onClick={handleHideModal}>Đóng</Button>
                            <Button
                                className="bg-primary"
                                type="primary"
                            >
                                Lưu
                            </Button>
                        </>
                    }
                >
                    <SearchStudent
                        selectedItems={selectedItems}
                        setSelectedItems={setSelectedItems}
                    />

                    <Table
                        columns={columns}
                        rowKey={(record: any) => record?.id}
                        dataSource={selectedItems}
                        className="mt-10"
                        scroll={{
                            x: 768,
                        }}
                    />
                </Modal>
            )}
        </>
    )
}

export default ModalAddStudents
