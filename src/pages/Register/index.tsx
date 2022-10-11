import { Form, Input } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

import imgRegister from '../../resources/img/register.png'

const Register: React.FC = () => {
    const handleOk = (data: any) => {
        console.log('🚀 ~ data', data)
        // setVisible(false);
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
                        onFinish={handleOk}>
                        <Form.Item
                            name="userName"
                            label={<span className="font-medium">Tên tài khoản</span>}
                            rules={[{ required: true, message: 'Tên tài khoản không được để trống!' }]}>
                            <Input
                                className="rounded-2xl border-[#F2F2F2] bg-[#F2F2F2] p-4 lg:w-[450px]"
                                placeholder="Nhập tên tài khoản..."
                                size="middle"
                            />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label={<span className="font-medium">Email</span>}
                            rules={[{ required: true, message: 'Email không được để trống!' }]}>
                            <Input
                                className="rounded-2xl border-[#F2F2F2] bg-[#F2F2F2] p-4 lg:w-[450px]"
                                placeholder="Nhập email..."
                                size="middle"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label={<span className="font-medium">Mật khẩu</span>}
                            rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}>
                            <Input
                                className="rounded-2xl border-[#F2F2F2] bg-[#F2F2F2] p-4 lg:w-[450px]"
                                type="password"
                                placeholder="Nhập mật khẩu..."
                                size="middle"
                            />
                        </Form.Item>

                        <Form.Item
                            name="re-password"
                            label={<span className="font-medium">Nhập lại mật khẩu</span>}
                            rules={[{ required: true, message: 'Không được để trống!' }]}>
                            <Input
                                className="rounded-2xl border-[#F2F2F2] bg-[#F2F2F2] p-4 lg:w-[450px]"
                                type="password"
                                placeholder="Nhập lại mật khẩu..."
                                size="middle"
                            />
                        </Form.Item>

                        <button className="w-full rounded-2xl bg-primary p-4 font-semibold text-white transition-all duration-200 hover:bg-tertiary">
                            Đăng ký
                        </button>
                    </Form>
                    <span className="mt-10 block text-center font-semibold">
                        Bạn đã có tài khoản?
                        <Link
                            className="cursor-pointer text-primary ml-1"
                            to="/login">
                            Đăng nhập
                        </Link>
                    </span>
                </div>
            </div>
            <div className="hidden flex-col items-center justify-end bg-[#FFFAE7] p-12 pb-0 lg:col-span-1 lg:flex">
                <div className="mb-28 p-5 text-4xl font-bold">
                    Welcome to <span className="text-[#FF8A2D]">DongViProCode.</span>
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
