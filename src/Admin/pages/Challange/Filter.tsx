import { Button, Col, Form, Input, Row, Select } from 'antd'
import React from 'react'
import { SearchOutlined, UndoOutlined } from '@ant-design/icons'
interface IFilterProps {}

const Filter: React.FC<IFilterProps> = props => {
    return (
        <div className="mb-6 rounded-md bg-white p-6 filter">
            <Form
                name="basic"
                layout="vertical"
            >
                <Row gutter={20}>
                    <Col
                        xs={{ span: 12 }}
                        lg={{ span: 6 }}
                    >
                        <Form.Item
                            label="Tiêu đề"
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
                        xs={{ span: 12 }}
                        lg={{ span: 5 }}
                    >
                        <Form.Item
                            label="Trạng thái"
                            name="status"
                        >
                            <Select
                                placeholder="Chọn trạng thái"
                                allowClear
                                options={[
                                    {
                                        value: 'ACTIVE',
                                        label: 'Đang hoạt động',
                                    },
                                    {
                                        value: 'INACTIVE',
                                        label: 'Dừng hoạt động',
                                    },
                                ]}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Button className="mr-2 rounded">
                            <UndoOutlined className="anticon-custom" />
                            Làm mới
                        </Button>

                        <Button
                            type="primary"
                            className="rounded bg-primary font-medium"
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
