import React from "react";
import DefaultLayout from "../../layouts/DefaultLayout";

interface ILandingProps {}

const Landing: React.FC<ILandingProps> = (props) => {
	return (
		<DefaultLayout>
			<div className="container mt-5">
				<div className="grid grid-cols-3 gap-4">
					<div className="col-span-2 box">
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
					<div></div>
				</div>
			</div>
		</DefaultLayout>
	);
};

export default Landing;
