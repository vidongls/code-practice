import { DeleteOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, message, notification, Row, Tooltip, Upload } from 'antd'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import UserApi from '../../../Api/User/UserApi'
import { get, isEmpty, values } from 'lodash'

type Props = {}

const { Dragger } = Upload

const Info = (props: Props) => {
    const [form] = Form.useForm()
    const [imageUrl, setImageUrl] = useState('')
    const [isLoadingUpload, setIsLoadingUpload] = useState(false)
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState({} as any)

    useEffect(() => {
        const getInfo = async () => {
            try {
                const res = await UserApi.getInfo()
                setImageUrl(get(res, 'data.avatar', ''))
                setUserData(res.data)
            } catch (error) {}
        }

        getInfo()
    }, [])

    useEffect(() => {
        if (!isEmpty(userData)) {
            form.setFieldsValue(userData)
        }
    }, [userData])

    const uploadButton = (
        <div>
            {isLoadingUpload ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Tải lên</div>
        </div>
    )

    async function beforeUpload(file: any) {
        setIsLoadingUpload(true)

        const storage = getStorage()

        const storageRef = ref(storage, `images/${file.name}-${file.uid}`)

        uploadBytes(storageRef, file)
            .then(snapshot => {
                getDownloadURL(snapshot.ref).then((downloadURL: any) => {
                    setImageUrl(downloadURL)

                    setLoading(true)
                    try {
                        UserApi.userChangeAvatar({ avatar: downloadURL })
                            .then(() => {
                                notification.success({
                                    message: 'Cập nhật hình ảnh thành công!',
                                })
                            })
                            .catch(() => {
                                notification.error({
                                    message: 'Cập nhật hình ảnh thất bại',
                                })
                            })
                            .finally(() => {
                                setLoading(false)
                            })
                    } catch (error) {}
                })
            })
            .catch(err =>
                notification.error({
                    message: err.message,
                })
            )
            .finally(() => {
                setIsLoadingUpload(false)
            })

        return false
    }

    const handleUpdateInfo = () => {
        form.validateFields().then(values => {
            setLoading(true)
            try {
                UserApi.userChangeInfo(values)
                    .then(() => {
                        notification.success({
                            message: 'Cập nhật thành công!',
                        })
                    })
                    .catch(() => {
                        notification.success({
                            message: 'Cập nhật thất bại! Vui lòng liên hệ Admin.',
                        })
                    })
                    .finally(() => {
                        setLoading(false)
                    })
            } catch (error) {}
        })
    }

    return (
        <div className="p-4">
            <div>
                <h3 className="mb-5 text-base">Cập nhật Avatar</h3>
                <div className="flex flex-col">
                    <Upload
                        accept={'image/*'}
                        name="file"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        maxCount={1}
                        // action="http://127.0.0.1:5000/api/upload"
                    >
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="avatar"
                                className="h-20 w-20"
                            />
                        ) : (
                            uploadButton
                        )}
                    </Upload>
                </div>
            </div>
            <div className="mt-5">
                <h3 className="mb-3 text-base">Thông tin cá nhân</h3>
                <Form
                    form={form}
                    layout="vertical"
                >
                    <Col
                        span={6}
                        className="mt-4 pr-3"
                    >
                        <Form.Item
                            name="code"
                            label={<span className="font-medium">Mã sinh viên</span>}
                        >
                            <Input
                                size="middle"
                                disabled
                            />
                        </Form.Item>
                    </Col>
                    <Row gutter={20}>
                        <Col span={6}>
                            <Form.Item
                                name="firstName"
                                className="mb-0"
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
                        </Col>
                        <Col span={6}>
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
                        </Col>
                    </Row>
                    <Col
                        span={6}
                        className="mt-4"
                    >
                        <Form.Item
                            name="userName"
                            label={<span className="font-medium">Tên tài khoản</span>}
                        >
                            <Input
                                size="middle"
                                disabled
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="email"
                            label={<span className="font-medium">Email</span>}
                        >
                            <Input
                                size="middle"
                                disabled
                            />
                        </Form.Item>
                    </Col>
                </Form>
                <Button
                    className="bg-primary"
                    type="primary"
                    loading={loading}
                    onClick={handleUpdateInfo}
                >
                    Lưu
                </Button>
            </div>
        </div>
    )
}

export default Info
