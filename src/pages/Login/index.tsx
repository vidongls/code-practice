import { Form, Input } from "antd";
import React from "react";

const Login: React.FC = () => {
	const handleOk = (data: any) => {
		console.log("🚀 ~ data", data);
	};

	return (
		<div className="grid lg:grid-cols-3 h-screen login bg-white">
			<div className="lg:col-span-2 flex items-center justify-center">
				<div className="w-full p-14 lg:w-fit lg:p-0">
					<h1 className="text-4xl font-bold mb-10">Đăng nhập</h1>
					<Form name="basic" autoComplete="off" layout="vertical" onFinish={handleOk}>
						<Form.Item
							name="email"
							label={<span className="font-medium">Email</span>}
							rules={[{ required: true, message: "Email không được để trống!" }]}
							className="mb-8"
						>
							<Input
								placeholder="Nhập email..."
								className="p-4 bg-[#F2F2F2] rounded-2xl border-[#F2F2F2] lg:w-[450px]"
							/>
						</Form.Item>

						<Form.Item
							name="password"
							label={<span className="font-medium">Mật khẩu</span>}
							rules={[{ required: true, message: "Mật khẩu không được để trống!" }]}
						>
							<Input
								type="password"
								placeholder="Nhập mật khẩu..."
								className="p-4 bg-[#F2F2F2] rounded-2xl border-[#F2F2F2] lg:w-[450px]"
							/>
						</Form.Item>

						<button className="w-full rounded-2xl font-semibold bg-[#FFAE6D] p-4 hover:bg-[#F59D55] transition-all duration-200 hover:text-white">
							Đăng nhập
						</button>
					</Form>
					<span className="font-semibold mt-10 block text-center">
						Not registered yet? <span className="text-[#FF8A2D] cursor-pointer">Create an account</span>
					</span>
				</div>
			</div>
			<div className="lg:col-span-1 bg-[#FFFAE7] flex flex-col items-center justify-end p-12 pb-0">
				<div className="mb-28 text-4xl font-bold p-5">Everything you are. In one simple link.</div>
				<div className="w-full h-full bg-authen bg-contain bg-no-repeat">{/* <img src={imgLogin} alt="" /> */}</div>
			</div>
		</div>
	);
};

export default Login;
