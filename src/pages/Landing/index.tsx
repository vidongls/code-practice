import { Button, Pagination } from "antd";
import React from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import DefaultLayout from "../../layouts/DefaultLayout";
import Notification from "./components/Notification";
import CodeEditor from "../../components/CodeEditor";
import Box from "./components/Box";

interface ILandingProps {}

const Landing: React.FC<ILandingProps> = (props) => {

    
	return (
		<DefaultLayout>
			<div className="p-24 pt-10">
				<div className="grid grid-cols-4 gap-4">
					<div className="col-span-3">
						<Notification />
						<div className="grid grid-cols-2 gap-4 mt-4">
							<Box className="col-span-1">hello</Box>
							<Box className="col-span-1">asas</Box>
						</div>
					</div>
					{/* <div className="box text-center flex flex-col justify-between"> */}
					<div>
						<Box className="text-center flex flex-col justify-between">
							<span className="mt-6 block">Rủ bạn bè vào cày rank thôi nào!</span>
							<div className="text-3xl font-semibold mt-5">
								Thứ 5 <br /> 22/09/2022
							</div>
							<div className="text-start my-4">
								Trí tuệ của con người trưởng thành trong tĩnh lặng, còn tính cách trưởng thành trong bão táp.
							</div>
							<Button type="primary" className="bg-blue-200 rounded font-medium">
								<ClockCircleOutlined className="anticon-custom" /> Ghi Danh
							</Button>
						</Box>
					</div>

					{/* <button className="btn  w-full"></button> */}
					{/* </div> */}

					{/* <CodeEditor /> */}
				</div>
			</div>
		</DefaultLayout>
	);
};

export default Landing;
