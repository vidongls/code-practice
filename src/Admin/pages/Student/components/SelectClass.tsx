import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Divider, Form, Input, Modal, Select, Space } from 'antd'
import React, { useEffect, useState } from 'react'

import ClassApi from '../../../../Api/Class/ClassApi'
import useParams from '../../../../utils/useParams'

interface ISelectClassProps {
    onChange: (value: any) => void
    value?: any
}

const { Option } = Select
const SelectClass: React.FC<ISelectClassProps> = ({ onChange, value }) => {
    const [form] = Form.useForm()
    const { params, addParams } = useParams()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const getAll = async () => {
            setLoading(true)
            try {
                const res = await ClassApi.getClassByAuthor()
                setData(res.data.data)
            } catch (error) {
            } finally {
                setLoading(false)
            }
        }

        getAll()
    }, [])

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
        form.resetFields()
    }

    const handleAddClass = () => {
        if (params) {
            form.validateFields()
                .then(values => {
                    console.log('🧙 ~ values', values)
                    ClassApi.createClass(values)
                        .then(res => {})
                        .catch(() => {})
                })
                .catch(() => {})
        }
    }

    return (
        <>
            <Select
                placeholder="Chọn lớp"
                allowClear
                loading={loading}
                options={data.map((item: any) => ({ label: item.name, value: item._id }))}
                onChange={onChange}
                value={value ? value : undefined}
                dropdownRender={menu => (
                    <>
                        {menu}
                        <Divider className="mt-3 mb-0" />
                        <Button
                            type="text"
                            className="w-full"
                            icon={<PlusOutlined />}
                            onClick={showModal}
                        >
                            Tạo lớp
                        </Button>
                    </>
                )}
            />

            <Form form={form}>
                {isModalOpen && (
                    <Modal
                        title="Tạo lớp"
                        open={true}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={
                            <>
                                <Button onClick={handleCancel}>Đóng</Button>
                                <Button
                                    className="bg-primary"
                                    type="primary"
                                    loading={loading}
                                    onClick={handleAddClass}
                                >
                                    Lưu
                                </Button>
                            </>
                        }
                    >
                        <Form.Item
                            label={<span>Tên lớp</span>}
                            name="name"
                            rules={[{ required: true, message: 'Nhập tên lớp' }]}
                        >
                            <Input placeholder="Nhập tên lớp" />
                        </Form.Item>
                    </Modal>
                )}
            </Form>
        </>
    )
}

export default SelectClass
