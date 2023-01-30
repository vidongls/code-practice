import { Form, Input, Row, Upload, message } from 'antd'
import type { UploadProps } from 'antd'
import React, { useState } from 'react'
import { InboxOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons'

type Props = {}

const { Dragger } = Upload

const Info = (props: Props) => {
    const [form] = Form.useForm()
    const [imageUrl, setImageUrl] = useState('')
    const [isLoadingUpload, setIsLoadingUpload] = useState(false)

    const uploadButton = (
        <div>
            {isLoadingUpload ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Tải lên</div>
        </div>
    )
    return (
        <div className="p-4">
            <div>
                <h3 className="mb-5 text-base">Cập nhật Avatar</h3>
                <Upload
                    accept={'image/*'}
                    name="file"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    // beforeUpload={beforeUpload}
                    // beforeUpload={beforeUpload}
                    maxCount={1}
                    // action="http://127.0.0.1:5000/api/upload"
                >
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt="avatar"
                            className="w-full p-8"
                            style={{ width: '100%' }}
                        />
                    ) : (
                        uploadButton
                    )}
                </Upload>
            </div>
            <div className="mt-5">
                <h3 className="mb-5 text-base">Thông tin cá nhân</h3>
                <Form
                    form={form}
                    layout="vertical"
                >
                    <Row>
                        <Form.Item
                            name="firstName"
                            className="mb-0 mr-5"
                            label={<span className="font-medium">Họ và tên đệm</span>}
                            rules={[
                                {
                                    required: true,
                                    message: 'Họ không được bỏ trống',
                                    whitespace: false,
                                },
                            ]}
                        >
                            <Input
                                placeholder="Nhập họ và tên đệm..."
                                size="middle"
                            />
                        </Form.Item>
                        <Form.Item
                            name="lastName"
                            className="mb-0"
                            label={<span className="font-medium">Tên</span>}
                            rules={[
                                {
                                    required: true,
                                    message: 'Tên không được bỏ trống',
                                    whitespace: false,
                                },
                            ]}
                        >
                            <Input
                                placeholder="Nhập tên..."
                                size="middle"
                            />
                        </Form.Item>
                    </Row>
                </Form>
            </div>
        </div>
    )
}

export default Info
