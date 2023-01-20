import { Button, Form, Input, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserApi from '../../Api/User/UserApi'
import { useAuthStore } from '../../store/useAuthStore'

const Login: React.FC = () => {
    const { login, isLogin } = useAuthStore()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (isLogin()) {
            navigate('/')
        }
    }, [])

    const handleLogin = async (data: any) => {
        setLoading(true)
        try {
            const res = await UserApi.login(data)
            login(res.data)
            // notification.success({ message: 'Đăng nhập thành công' })
            navigate('/')
        } catch (error) {
            notification.error({ message: 'Tài khoản hoặc mật khẩu không chính xác' })
        } finally {
            setLoading(false)
        }
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
                        onFinish={handleLogin}
                    >
                        <Form.Item
                            name="email"
                            label={<span className="font-medium">Email</span>}
                            rules={[{ required: true, message: 'Email không được để trống!' }]}
                            className="mb-8"
                        >
                            <Input
                                placeholder="Nhập email..."
                                className="rounded-lg border-[#F2F2F2] bg-[#F2F2F2] p-4 lg:w-[450px]"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label={<span className="font-medium">Mật khẩu</span>}
                            rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
                        >
                            <Input.Password
                                placeholder="Nhập mật khẩu..."
                                className="rounded-lg border-[#F2F2F2] bg-[#F2F2F2] p-4 lg:w-[450px]"
                            />
                        </Form.Item>

                        <Button
                            className="h-full w-full rounded-lg bg-primary p-4 font-semibold text-white transition-all duration-200 hover:bg-tertiary hover:text-white focus:bg-primary"
                            // onClick={handleLogin}
                            htmlType="submit"
                            loading={loading}
                        >
                            Đăng nhập
                        </Button>
                    </Form>
                    <span className="mt-10 block text-center font-semibold">
                        Bạn chưa có tài khoản?
                        <Link
                            className="ml-1 cursor-pointer text-primary"
                            to="/register"
                        >
                            Đăng ký
                        </Link>
                    </span>
                </div>
            </div>
            <div className="flex flex-col items-center justify-end bg-[#FFFAE7] p-12 pb-0 lg:col-span-1">
                <div className="mb-28 p-5 text-4xl font-bold">
                    Chào mừng bạn tới với trang web luyện tập và thực hành lập trình.
                </div>
                <div className="h-full w-full bg-authen bg-contain bg-no-repeat">
                    {/* <img src={imgLogin} alt="" /> */}
                </div>
            </div>
        </div>
    )
}

export default Login
