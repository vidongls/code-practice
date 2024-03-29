import { Button, Col, Form, Input, Row, Select } from 'antd'
import React, { useEffect } from 'react'
import { SearchOutlined, UndoOutlined } from '@ant-design/icons'
interface IFilterProps {
    params: object
    addParams: (filter?: object) => void
}

const Filter: React.FC<IFilterProps> = ({ params, addParams }) => {
    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue(params)
    }, [form, params])

    const handleClear = () => {
        addParams({})
        form.resetFields()
    }

    const handleSearch = (values: any) => {
        addParams({ ...values })
    }

    return (
        <div className="mb-6 rounded-md bg-white p-6 filter">
            <Form
                name="basic"
                layout="vertical"
                form={form}
                onFinish={handleSearch}
            >
                <Row gutter={20}>
                    <Col
                        xs={{ span: 12 }}
                        lg={{ span: 6 }}
                    >
                        <Form.Item
                            label={<span className="text-slate-800">Tiêu đề</span>}
                            name="title"
                        >
                            <Input placeholder="Nhập tiêu đề" />
                        </Form.Item>
                    </Col>
                    <Col
                        xs={{ span: 12 }}
                        lg={{ span: 5 }}
                    >
                        <Form.Item
                            label="Độ khó"
                            name="level"
                        >
                            <Select
                                // style={{
                                //     width: 120,
                                // }}
                                placeholder="Chọn độ khó"
                                allowClear
                                options={[
                                    {
                                        value: 'EASY',
                                        label: 'Dễ',
                                    },
                                    {
                                        value: 'MEDIUM',
                                        label: 'Thường',
                                    },
                                    {
                                        value: 'HARD',
                                        label: 'Khó',
                                    },
                                    {
                                        value: 'EXPERT',
                                        label: 'Chuyên gia',
                                    },
                                ]}
                            />
                        </Form.Item>
                    </Col>

                    <Col
                        span={24}
                        className="flex justify-end"
                    >
                        <Button
                            className="mr-2 rounded"
                            onClick={handleClear}
                        >
                            <UndoOutlined className="anticon-custom" />
                            Làm mới
                        </Button>

                        <Button
                            type="primary"
                            className="rounded bg-primary font-medium"
                            htmlType="submit"
                        >
                            <SearchOutlined className="anticon-custom" />
                            Tìm kiếm
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default Filter
