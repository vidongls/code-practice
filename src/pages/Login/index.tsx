import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

interface ILoginProps {
	visibleLogin: boolean;
	handleHideLogin: () => void;
	handleShowLogin: () => void;
	handleChangeToRegister: () => void;
}

const Login: React.FC<ILoginProps> = ({ visibleLogin, handleHideLogin, handleShowLogin, handleChangeToRegister }) => {
	const [form] = Form.useForm();

	const handleOk = (data: any) => {
		console.log("🚀 ~ data", data);
	};

	return (
		<>
			<Button
				className="px-4 mr-2 py-1 border border-gray-200 rounded-3xl cursor-pointer text-sm hover:border-blue-100 hover:text-blue-100 transition-all duration-200"
				onClick={handleShowLogin}
			>
				Đăng nhập
			</Button>

			{visibleLogin && (
				<Modal title="Đăng nhập" open={true} onOk={handleOk} onCancel={handleHideLogin} footer={<></>}>
					<Form name="basic" autoComplete="off" layout="vertical" onFinish={handleOk}>
						<Form.Item
							name="email"
							rules={[{ required: true, message: "Email không được để trống!" }]}
							className="mb-8"
						>
							<Input
								prefix={<MailOutlined className="site-form-item-icon" />}
								placeholder="Nhập email..."
								size="middle"
							/>
						</Form.Item>

						<Form.Item name="password" rules={[{ required: true, message: "Mật khẩu không được để trống!" }]}>
							<Input
								prefix={<LockOutlined className="site-form-item-icon" />}
								type="password"
								placeholder="Nhập mật khẩu..."
								size="middle"
							/>
						</Form.Item>

						<Button type="primary" htmlType="submit" className="w-full rounded font-medium">
							Đăng nhập
						</Button>
                        <p className="text-blue-50 mt-2" onClick={handleChangeToRegister}>Chưa có tài khoản? Đăng ký</p>
					</Form>
				</Modal>
			)}
		</>
	);
};

export default Login;
