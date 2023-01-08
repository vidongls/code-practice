import { Button, Modal, notification, Spin, Table, Tooltip } from 'antd'
import React, { useState } from 'react'
import { PlusOutlined, UserOutlined, DeleteOutlined } from '@ant-design/icons'
import SearchStudent from './SearchStudent'
import { Link } from 'react-router-dom'
import Avatar from '../../../../components/Avatar'
import { AlignType } from 'rc-table/lib/interface'
import ClassApi from '../../../../Api/Class/ClassApi'
interface IModalAddStudentsProps {
    classId: string
    getStudent: () => void
}

const ModalAddStudents: React.FC<IModalAddStudentsProps> = ({ classId, getStudent }) => {
    const [visible, setVisible] = useState(false)
    const [selectedItems, setSelectedItems] = useState([])
    const [loading, setLoading] = useState(false)

    const handleShowModal = () => {
        setVisible(true)
    }

    const handleHideModal = () => {
        setVisible(false)
        setSelectedItems([])
    }
    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (text: string, record: any) => {
                return (
                    <div className="w-fit">
                        <Avatar src={text} />
                    </div>
                )
            },
        },
        {
            title: 'Mã sinh viên',
            dataIndex: 'code',
            key: 'code',
            // align: 'right' as AlignType,
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
            dataIndex: 'fistName',
            key: 'fistName',
            render: (fistName: string, record: any) => {
                const lastName = record?.lastName

                return <span>{fistName && lastName ? `${fistName} ${lastName}` : '---'} </span>
            },
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
                <Tooltip title="Xóa">
                    <DeleteOutlined
                        className="cursor-pointer p-3 hover:text-red-500"
                        onClick={() => handleDeleteStudent(text)}
                    />
                </Tooltip>
            ),
        },
    ]

    const handleSave = async () => {
        setLoading(true)

        try {
            const data = selectedItems.map((item: any) => item._id)

            const res = await ClassApi.addMemberToClass(classId, { student: data })
            handleHideModal()
            getStudent()
            notification.success({ message: 'Thêm sinh viên thành công!' })
        } catch (error) {
            notification.error({ message: 'Thêm sinh viên thất bại!' })
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteStudent = (id: string) => {
        setSelectedItems(prev => prev.filter((item: any) => item._id !== id))
    }

    return (
        <>
            {classId && (
                <Button
                    type="primary"
                    className="rounded bg-primary font-medium"
                    onClick={handleShowModal}
                >
                    <PlusOutlined className="anticon-custom" />
                    Thêm sinh viên
                </Button>
            )}
            {visible && (
                <Modal
                    title="Thêm sinh viên"
                    open={true}
                    // onOk={handleOk}
                    onCancel={handleHideModal}
                    width={1000}
                    footer={
                        <>
                            <Button onClick={handleHideModal}>Đóng</Button>
                            <Button
                                className="bg-primary"
                                type="primary"
                                onClick={handleSave}
                                disabled={!selectedItems.length}
                                loading={loading}
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
