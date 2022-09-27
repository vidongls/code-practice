import React from "react";
import Box from "../Box";
import { FileFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

const NewExercise:React.FC = () => {
	return (
		<Box
			className="col-span-1 p-3"
			headerContent={
				<>
					<div className="text-lg font-medium flex items-center">
						<FileFilled className="mr-2" /> Bài tập mới
					</div>
					<div className="bg-secondary btn hover:bg-tertiary ">Tải lại</div>
				</>
			}
		>
			<ul className="list-disc">
				<li className="ml-8 mb-3">
					<Link to="#">TIMUOC - Tìm ước của 1 số</Link>
				</li>
				<li className="ml-8 mb-3">
					<Link to="#">TIMUOC - Tìm ước của 1 số</Link>
				</li>
				<li className="ml-8 mb-3">
					<Link to="#">TIMUOC - Tìm ước của 1 số</Link>
				</li>
				<li className="ml-8 mb-3">
					<Link to="#">TIMUOC - Tìm ước của 1 số</Link>
				</li>
				<li className="ml-8 mb-3">
					<Link to="#">TIMUOC - Tìm ước của 1 số</Link>
				</li>
				<li className="ml-8 mb-3">
					<Link to="#">TIMUOC - Tìm ước của 1 số</Link>
				</li>
				<li className="ml-8 mb-3">
					<Link to="#">TIMUOC - Tìm ước của 1 số</Link>
				</li>
				<li className="ml-8 mb-3">
					<Link to="#">TIMUOC - Tìm ước của 1 số</Link>
				</li>
			</ul>
		</Box>
	);
};

export default NewExercise;
