/* eslint-disable no-useless-escape */
import { Button, Col, Form, Input, notification, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserApi from '../../Api/User/UserApi'
import { RegisterCommand } from '../../Command/RegisterCommand'

import imgRegister from '../../resources/img/register.png'
import { useAuthStore } from '../../store/useAuthStore'

const Register: React.FC = () => {
    const { isLogin } = useAuthStore()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (isLogin()) {
            navigate('/')
        }
    }, [])

    const handleRegister = async () => {
        setLoading(true)
        try {
            const data: RegisterCommand = { ...form.getFieldsValue() }

            await UserApi.register(data)
            notification.success({ message: 'Đăng ký thành công' })
            navigate('/login')
        } catch (error: any) {
            const { data } = error.response
            if (data?.code === 'USER_EXISTED') {
                notification.error({ message: 'Tài khoản đã tồn tại' })
            } else {
                notification.error({ message: 'Đăng ký thất bại' })
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="login grid h-screen bg-white lg:grid-cols-3">
            <div className="flex items-center justify-center lg:col-span-2">
                <div className="w-full p-14 lg:w-fit lg:p-0">
                    <h1 className="mb-10 text-4xl font-bold">Đăng ký</h1>
                    <Form
                        name="basic"
                        autoComplete="off"
                        layout="vertical"
                        form={form}
                    >
                        <Row gutter={10}>
                            <Col span={12}>
                                <Form.Item
                                    name="firstName"
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
                                        className="rounded-lg border-[#F2F2F2] bg-[#F2F2F2] p-4 "
                                        placeholder="Nhập họ và tên đệm..."
                                        size="middle"
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item
                                    name="lastName"
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
                                        className="rounded-lg border-[#F2F2F2] bg-[#F2F2F2] p-4"
                                        placeholder="Nhập tên..."
                                        size="middle"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item
                            name="userName"
                            label={<span className="font-medium">Tên tài khoản</span>}
                            rules={[
                                {
                                    required: true,
                                    message: 'Tên tài khoản không được bỏ trống',
                                    whitespace: false,
                                },
                            ]}
                        >
                            <Input
                                className="rounded-lg border-[#F2F2F2] bg-[#F2F2F2] p-4 lg:w-[450px]"
                                placeholder="Nhập tên tài khoản..."
                                size="middle"
                            />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label={<span className="font-medium">Email</span>}
                            rules={[
                                {
                                    required: true,
                                    message: 'Email không được bỏ trống',
                                },
                                {
                                    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                    message: 'Email không đúng định dạng',
                                },
                            ]}
                        >
                            <Input
                                className="rounded-lg border-[#F2F2F2] bg-[#F2F2F2] p-4 lg:w-[450px]"
                                placeholder="Nhập email..."
                                size="middle"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            className="mb-2"
                            label={<span className="font-medium">Mật khẩu</span>}
                            rules={[
                                { required: true, message: 'Mật khẩu không được để trống!' },
                                {
                                    pattern: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,30}$/,
                                    message: 'Mật khẩu không đúng định dạng',
                                },
                            ]}
                        >
                            <Input.Password
                                className="rounded-lg border-[#F2F2F2] bg-[#F2F2F2] p-4 lg:w-[450px]"
                                placeholder="Nhập mật khẩu..."
                                size="middle"
                            />
                        </Form.Item>
                        <Form.Item>
                            <div>
                                <span className="text-red-500">*</span> Định dạng mật khẩu 8-36 ký tự.
                                <br />
                                <span className="text-red-500">*</span> Chứa ít nhất 1 chữ hoa, chữ thường và ký tự đặc
                                biệt
                            </div>
                        </Form.Item>
                        <Form.Item
                            name="re-password"
                            label={<span className="font-medium">Nhập lại mật khẩu</span>}
                            rules={[
                                { required: true, message: 'Không được để trống!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve()
                                        }
                                        return Promise.reject('Mật khẩu không khớp!')
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                className="rounded-lg border-[#F2F2F2] bg-[#F2F2F2] p-4 lg:w-[450px]"
                                placeholder="Nhập lại mật khẩu..."
                                size="middle"
                            />
                        </Form.Item>

                        <Button
                            className="h-full w-full rounded-lg bg-primary p-4 font-semibold text-white transition-all duration-200 hover:bg-tertiary hover:text-white focus:bg-primary"
                            loading={loading}
                            onClick={handleRegister}
                        >
                            Đăng ký
                        </Button>
                    </Form>
                    <span className="mt-10 block text-center font-semibold">
                        Bạn đã có tài khoản?
                        <Link
                            className="ml-1 cursor-pointer text-primary"
                            to="/login"
                        >
                            Đăng nhập
                        </Link>
                    </span>
                </div>
            </div>
            <div className="hidden flex-col items-center justify-end bg-[#FFFAE7] p-12 pb-0 lg:col-span-1 lg:flex">
                <div className="mb-28 p-5 text-4xl font-bold">
                    Chào mừng tới với
                    <span className="inline-block text-[#FF8A2D]">Code Practice.</span>
                </div>
                <div className="">
                    <img
                        src={imgRegister}
                        alt=""
                    />
                </div>
            </div>
        </div>
    )
}

export default Register
