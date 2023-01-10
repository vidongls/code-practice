import { Button, Col, Form, Input, Row, Select } from 'antd'
import React, { useEffect } from 'react'
import { SearchOutlined, UndoOutlined } from '@ant-design/icons'
import SelectClass from './components/SelectClass'
interface IFilterProps {
    params: object
    addParams: (filter?: object) => void
    resetData: () => void
}

const Filter: React.FC<IFilterProps> = ({ params, addParams, resetData }) => {
    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue(params)
    }, [form, params])

    const handleClear = () => {
        addParams({})
        resetData()
        form.resetFields()
    }

    const handleSearch = (values: any) => {
        addParams({ ...values })
    }

    const onChangeSelect = (key: string, value: any) => {
        if (!value) {
            resetData()
        }

        addParams({ [key]: value })
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
                        lg={{ span: 5 }}
                    >
                        <Form.Item
                            label="Lớp"
                            name="class"
                        >
                            <SelectClass onChange={value => onChangeSelect('class', value)} />
                        </Form.Item>
                    </Col>

                    <Col
                        span={19}
                        className="flex items-center"
                    >
                        <Button
                            className="mr-2 mt-1 rounded"
                            onClick={handleClear}
                        >
                            <UndoOutlined className="anticon-custom" />
                            Làm mới
                        </Button>

                        <Button
                            type="primary"
                            className="mt-1 rounded bg-primary font-medium "
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
