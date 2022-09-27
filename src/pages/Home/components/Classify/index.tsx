import React from "react";
import Box from "../Box";
import { TagsFilled } from "@ant-design/icons";

interface IClassifyProps {}

const Classify: React.FC<IClassifyProps> = (props) => {
	return (
		<Box
			className="col-span-1 p-3"
			headerContent={
				<div className="text-lg font-medium flex items-center">
					<TagsFilled className="mr-2" /> Phân loại bài tập
				</div>
			}
		>
			<ul>
                <li></li>
            </ul>
		</Box>
	);
};

export default Classify;
