import { Form, Input } from 'antd';
import React from 'react';

import imgRegister from '../../resources/img/register.png';

const Register: React.FC = () => {
	const handleOk = (data: any) => {
		console.log("🚀 ~ data", data);
		// setVisible(false);
	};

	return (
		<div className="grid lg:grid-cols-3 h-screen login bg-white">
			<div className="lg:col-span-2 flex items-center justify-center">
				<div className="w-full p-14 lg:w-fit lg:p-0">
					<h1 className="text-4xl font-bold mb-10">Đăng ký</h1>
					<Form name="basic" autoComplete="off" layout="vertical" onFinish={handleOk}>
						<Form.Item
							name="userName"
							label={<span className="font-medium">Tên tài khoản</span>}
							rules={[{ required: true, message: "Tên tài khoản không được để trống!" }]}
						>
							<Input
								className="p-4 bg-[#F2F2F2] rounded-2xl border-[#F2F2F2] lg:w-[450px]"
								placeholder="Nhập tên tài khoản..."
								size="middle"
							/>
						</Form.Item>

						<Form.Item
							name="email"
							label={<span className="font-medium">Email</span>}
							rules={[{ required: true, message: "Email không được để trống!" }]}
						>
							<Input
								className="p-4 bg-[#F2F2F2] rounded-2xl border-[#F2F2F2] lg:w-[450px]"
								placeholder="Nhập email..."
								size="middle"
							/>
						</Form.Item>

						<Form.Item
							name="password"
							label={<span className="font-medium">Mật khẩu</span>}
							rules={[{ required: true, message: "Mật khẩu không được để trống!" }]}
						>
							<Input
								className="p-4 bg-[#F2F2F2] rounded-2xl border-[#F2F2F2] lg:w-[450px]"
								type="password"
								placeholder="Nhập mật khẩu..."
								size="middle"
							/>
						</Form.Item>

						<Form.Item
							name="re-password"
							label={<span className="font-medium">Nhập lại mật khẩu</span>}
							rules={[{ required: true, message: "Không được để trống!" }]}
						>
							<Input
								className="p-4 bg-[#F2F2F2] rounded-2xl border-[#F2F2F2] lg:w-[450px]"
								type="password"
								placeholder="Nhập lại mật khẩu..."
								size="middle"
							/>
						</Form.Item>

						<button className="w-full rounded-2xl font-semibold bg-[#FFAE6D] hover:bg-[#F59D55] p-4 transition-all duration-200">
							Đăng ký
						</button>
					</Form>
					<span className="font-semibold mt-10 block text-center">
						Already have an account?<span className="text-[#FF8A2D] cursor-pointer"> Sign In</span>
					</span>
				</div>
			</div>
			<div className="lg:col-span-1 bg-[#FFFAE7] flex-col items-center justify-end p-12 pb-0 hidden lg:flex">
				<div className="mb-28 text-4xl font-bold p-5">
					Welcome to <span className="text-[#FF8A2D]">DongViProCode.</span>
				</div>
				<div className="">
					<img src={imgRegister} alt="" />
				</div>
			</div>
		</div>
	);
};

export default Register;
