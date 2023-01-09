import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal, notification } from 'antd'
import React, { useState } from 'react'
import ClassApi from '../../../Api/Class/ClassApi'

interface IAddClass {
    getClass: () => void
}

const AddClass: React.FC<IAddClass> = ({ getClass }) => {
    const [form] = Form.useForm()
    const [isVisible, setIsVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const onCreateClass = () => {
        form.validateFields().then(values => {
            setLoading(true)

            ClassApi.createClass(values)
                .then(values => {
                    getClass()
                    handleHideModal()
                    notification.success({ message: 'Tạo lớp thành công' })
                })
                .catch(error => {
                    notification.error({ message: 'Tạo lớp thất bại' })
                })
                .finally(() => {
                    setLoading(false)
                })
        })
    }

    const handleShowModal = () => {
        setIsVisible(true)
    }
    const handleHideModal = () => {
        setIsVisible(false)
    }

    return (
        <>
            <Button
                type="primary"
                className="rounded bg-primary font-medium"
                // loading={loadingBtn}
                onClick={handleShowModal}
            >
                <PlusOutlined className="anticon-custom" />
                Thêm lớp
            </Button>
            {isVisible && (
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onCreateClass}
                >
                    <Modal
                        open={true}
                        title="Tạo lớp"
                        onOk={onCreateClass}
                        onCancel={handleHideModal}
                        footer={
                            <>
                                <Button onClick={handleHideModal}>Đóng</Button>
                                <Button
                                    className="bg-primary"
                                    type="primary"
                                    onClick={onCreateClass}
                                    loading={loading}
                                >
                                    Thêm
                                </Button>
                            </>
                        }
                    >
                        <Form.Item
                            name="name"
                            label="Tên lớp"
                            rules={[{ required: true, message: 'Không được để trống' }]}
                        >
                            <Input placeholder="Nhập tên lớp..." />
                        </Form.Item>
                    </Modal>
                </Form>
            )}
        </>
    )
}

export default AddClass
