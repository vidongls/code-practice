import { ClockCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

import CodeEditor from "../../components/CodeEditor";
import Box from "./components/Box";
import Notification from "./components/Notification";
import { Link } from "react-router-dom";
import NewExercise from "./components/NewExercise";
import Classify from "./components/Classify";

interface IHomeProps {}

const Home: React.FC<IHomeProps> = (props) => {
	return (
		<div className="p-24 pt-10">
			<div className="grid grid-cols-4 gap-4">
				<div className="col-span-3">
					<Notification />
					<div className="grid grid-cols-2 gap-4 mt-4">
						<NewExercise />
						<Classify />
					</div>
				</div>
				{/* <div className="box text-center flex flex-col justify-between"> */}
				<div>
					<Box className="text-center flex flex-col justify-between p-10">
						<span className="mt-6 block">Rủ bạn bè vào cày rank thôi nào!</span>
						<div className="text-3xl font-semibold mt-5">
							Thứ 5 <br /> 22/09/2022
						</div>
						<div className="text-start my-4">
							Trí tuệ của con người trưởng thành trong tĩnh lặng, còn tính cách trưởng thành trong bão táp.
						</div>
						<Button type="primary" className="bg-primary rounded font-medium">
							<ClockCircleOutlined className="anticon-custom" /> Ghi Danh
						</Button>
					</Box>
				</div>

				{/* <button className="btn  w-full"></button> */}
				{/* </div> */}

				{/* <CodeEditor /> */}
			</div>
		</div>
	);
};

export default Home;
