import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import imgLogin from "../../resources/img/login.png";

interface ILoginProps {}

const Login: React.FC<ILoginProps> = () => {
	const [form] = Form.useForm();

	const handleOk = (data: any) => {
		console.log("🚀 ~ data", data);
	};

	return (
		<div className="grid lg:grid-cols-3 h-screen">
			<div className="lg:col-span-2 flex items-center justify-center">
				<div>dfds</div>
			</div>
			<div className="lg:col-span-1 bg-sand-50 flex flex-col items-center justify-end p-12 pb-0">
				<div className="mb-28 text-4xl font-bold p-5">Everything you are. In one simple link.</div>
				<div className="">
					<img src={imgLogin} alt="" />
				</div>
			</div>

			{/* {visibleLogin && (
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
			)} */}
		</div>
	);
};

export default Login;
