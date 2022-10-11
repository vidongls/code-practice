import { Form, Input } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const Login: React.FC = () => {
    const handleOk = (data: any) => {
        console.log('🚀 ~ data', data)
    }

    return (
        <div className="login grid h-screen bg-white lg:grid-cols-3">
            <div className="flex items-center justify-center lg:col-span-2">
                <div className="w-full p-14 lg:w-fit lg:p-0">
                    <h1 className="mb-10 text-4xl font-bold">Đăng nhập</h1>
                    <Form
                        name="basic"
                        autoComplete="off"
                        layout="vertical"
                        onFinish={handleOk}>
                        <Form.Item
                            name="email"
                            label={<span className="font-medium">Email</span>}
                            rules={[{ required: true, message: 'Email không được để trống!' }]}
                            className="mb-8">
                            <Input
                                placeholder="Nhập email..."
                                className="rounded-2xl border-[#F2F2F2] bg-[#F2F2F2] p-4 lg:w-[450px]"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label={<span className="font-medium">Mật khẩu</span>}
                            rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}>
                            <Input
                                type="password"
                                placeholder="Nhập mật khẩu..."
                                className="rounded-2xl border-[#F2F2F2] bg-[#F2F2F2] p-4 lg:w-[450px]"
                            />
                        </Form.Item>

                        <button className="w-full rounded-2xl bg-primary p-4 font-semibold text-white  transition-all duration-200 hover:bg-tertiary">
                            Đăng nhập
                        </button>
                    </Form>
                    <span className="mt-10 block text-center font-semibold">
                        Bạn chưa có tài khoản?
                        <Link
                            className="cursor-pointer text-primary ml-1"
                            to="/register">
                            Đăng ký
                        </Link>
                    </span>
                </div>
            </div>
            <div className="flex flex-col items-center justify-end bg-[#FFFAE7] p-12 pb-0 lg:col-span-1">
                <div className="mb-28 p-5 text-4xl font-bold">Everything you are. In one simple link.</div>
                <div className="h-full w-full bg-authen bg-contain bg-no-repeat">
                    {/* <img src={imgLogin} alt="" /> */}
                </div>
            </div>
        </div>
    )
}

export default Login
