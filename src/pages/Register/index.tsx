/* eslint-disable no-useless-escape */
import { Form, Input } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import UserApi from '../../Api/User/UserApi'

import imgRegister from '../../resources/img/register.png'

const Register: React.FC = () => {
    const handleRegister = async (data: any) => {
        console.log('🚀 ~ data', data)
        // setVisible(false);
        try {
            const res = await UserApi.register(data)
            console.log('🚀 🐢 ~ res', res)
        } catch (error) {
            console.log('🚀 🐢 ~ error', error)
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
                        onFinish={handleRegister}
                    >
                        <Form.Item
                            name="userName"
                            label={<span className="font-medium">Tên tài khoản</span>}
                            rules={[
                                {
                                    required: true,
                                    message: 'Tên tài khoản không được bỏ trống',
                                    whitespace: false,
                                },
                                {
                                    pattern: /^[A-Za-z0-9._]+$/,
                                    message: 'Tên tài khoản không được chứa dấu cách và ký tự đặc biệt (~!@#$%^&*...)',
                                },
                                {
                                    min: 8,
                                    message: 'Tên tài khoản ít nhất 8 ký tự',
                                },
                                {
                                    max: 30,
                                    message: 'Tên tài khoản không quá 30 ký tự',
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
                            label={<span className="font-medium">Mật khẩu</span>}
                            rules={[
                                { required: true, message: 'Mật khẩu không được để trống!' },
                                {
                                    pattern: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,30}$/,
                                    message: 'Mật khẩu không đúng định dạng',
                                },
                            ]}
                        >
                            <Input
                                className="rounded-lg border-[#F2F2F2] bg-[#F2F2F2] p-4 lg:w-[450px]"
                                type="password"
                                placeholder="Nhập mật khẩu..."
                                size="middle"
                            />
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
                            <Input
                                className="rounded-lg border-[#F2F2F2] bg-[#F2F2F2] p-4 lg:w-[450px]"
                                type="password"
                                placeholder="Nhập lại mật khẩu..."
                                size="middle"
                            />
                        </Form.Item>

                        <button className="w-full rounded-lg bg-primary p-4 font-semibold text-white transition-all duration-200 hover:bg-tertiary">
                            Đăng ký
                        </button>
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
