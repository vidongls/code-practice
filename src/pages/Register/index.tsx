import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
interface IRegisterProps {
	
}

const Register: React.FC<IRegisterProps> = () => {
	const [form] = Form.useForm();



	const handleOk = (data: any) => {
		console.log("🚀 ~ data", data);
		// setVisible(false);
	};



	return (
		<>
			
			{/* {visibleRegister && (
				<Modal title="Đăng ký" open={true} onOk={handleOk} onCancel={handleHideRegister} footer={<></>}>
					<Form name="basic" autoComplete="off" layout="vertical" onFinish={handleOk}>
						<Form.Item
							name="userName"
							rules={[{ required: true, message: "Tên tài khoản không được để trống!" }]}
							className="mb-8"
						>
							<Input
								prefix={<UserOutlined className="site-form-item-icon" />}
								placeholder="Nhập tên tài khoản..."
								size="middle"
							/>
						</Form.Item>

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

						<Form.Item name="re-password" rules={[{ required: true, message: "Không được để trống!" }]}>
							<Input
								prefix={<LockOutlined className="site-form-item-icon" />}
								type="password"
								placeholder="Nhập lại mật khẩu..."
								size="middle"
							/>
						</Form.Item>

						<Button type="primary" htmlType="submit" className="w-full rounded font-medium">
							Đăng ký
						</Button>
						<p className="text-blue-50 mt-2" onClick={handleChangeToLogin}>Đã có tài khoản? Đăng nhập</p>
					</Form>
				</Modal>
			)} */}
		</>
	);
};

export default Register;
