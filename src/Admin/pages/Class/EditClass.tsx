import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import ClassApi from '../../../Api/Class/ClassApi'
import { get } from 'lodash'

interface IEditClass {
    getClass: () => void
    handleHideModal: () => void
    data: any
}

const EditClass: React.FC<IEditClass> = ({ getClass, handleHideModal, data }) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (Object.keys(data).length > 0) {
            form.setFieldsValue({ name: data?.name })
        }
    }, [data])

    const onCreateClass = () => {
        form.validateFields().then(values => {
            setLoading(true)

            ClassApi.updateClass(data?._id, values)
                .then(values => {
                    getClass()
                    handleHideModal()
                    notification.success({ message: 'Chỉnh sửa lớp thành công' })
                })
                .catch(error => {
                    notification.error({ message: 'Chỉnh sửa lớp thất bại' })
                })
                .finally(() => {
                    setLoading(false)
                })
        })
    }

    return (
        <>
            <Modal
                open={true}
                title={`Chỉnh sửa lớp - ${get(data, 'name')}`}
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
                            Sửa
                        </Button>
                    </>
                }
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onCreateClass}
                >
                    <Form.Item
                        name="name"
                        label="Tên lớp"
                        rules={[{ required: true, message: 'Không được để trống' }]}
                        className="mb-0"
                    >
                        <Input placeholder="Nhập tên lớp..." />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default EditClass
