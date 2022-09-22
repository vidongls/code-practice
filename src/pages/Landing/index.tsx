import { Button, Pagination } from "antd";
import React from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import DefaultLayout from "../../layouts/DefaultLayout";

interface ILandingProps {}

const Landing: React.FC<ILandingProps> = (props) => {
	return (
		<DefaultLayout>
			<div className="container mt-5 p-4">
				<div className="grid grid-cols-4 gap-4">
					<div className="col-span-3">
						<div className="box">
							<div className="flex items-center justify-between p-3">
								<h3>Thông báo</h3>
								<div className="bg-blue-50 btn hover:bg-blue-100 ">Tải lại</div>
							</div>
							<ul>
								<li className="flex items-center justify-between py-4 border-b border-gray-200 ml-5">
									<span> Lộ trình "Cơ bản" cho người mới học</span> <span>2020-11-13 23:44:36</span>{" "}
									<span>Bởi admin</span>
								</li>
								<li className="flex items-center justify-between py-4 border-b border-gray-200 ml-5">
									<span> Lộ trình "Cơ bản" cho người mới học</span> <span>2020-11-13 23:44:36</span>{" "}
									<span>Bởi admin</span>
								</li>
								<li className="flex items-center justify-between py-4 border-b border-gray-200 ml-5">
									<span> Lộ trình "Cơ bản" cho người mới học</span> <span>2020-11-13 23:44:36</span>{" "}
									<span>Bởi admin</span>
								</li>
							</ul>
						</div>
						<Pagination defaultCurrent={1} total={10} className="mt-3 flex justify-end pagination" />
					</div>
					<div className="box text-center flex flex-col justify-between">
						<span className="mt-6 block">Rủ bạn bè vào cày rank thôi nào!</span>
						<div className="text-3xl font-semibold">
							Thứ 5 <br /> 22/09/2022
						</div>
						<div className="text-start">
							Trí tuệ của con người trưởng thành trong tĩnh lặng, còn tính cách trưởng thành trong bão táp.
						</div>
						<Button type="primary" className="bg-blue-200 rounded font-medium">
							<ClockCircleOutlined className="anticon-custom"/> Ghi Danh
						</Button>
						{/* <button className="btn  w-full"></button> */}
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
};

export default Landing;
