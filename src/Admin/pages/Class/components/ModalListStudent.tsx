import { Button, Modal, Table } from 'antd'
import React from 'react'

interface IModalListStudentProps {
    handleHideModal: () => void
    data: any
}

const ModalListStudent: React.FC<IModalListStudentProps> = ({ handleHideModal, data }) => {
    console.log('🧙 ~ data', data)

    const columns = [
        // {
        //     title: 'Avatar',
        //     dataIndex: 'avatar',
        //     key: 'avatar',
        //     render: (text: string, record: any) => {
        //         return (
        //             <div className="w-fit">
        //                 <Avatar src={text} />
        //             </div>
        //         )
        //     },
        // },
        {
            title: 'Mã sinh viên',
            dataIndex: 'code',
            key: 'code',
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
    ]

    return (
        <>
            <Modal
                open={true}
                title={`Danh sách sinh viên`}
                // onOk={onCreateClass}
                onCancel={handleHideModal}
                width={800}
                footer={
                    <>
                        <Button onClick={handleHideModal}>Đóng</Button>
                    </>
                }
            >
                <Table
                    columns={columns}
                    dataSource={data}
                />
            </Modal>
        </>
    )
}

export default ModalListStudent
