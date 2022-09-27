import { Pagination } from "antd";
import { BellFilled, BookFilled } from "@ant-design/icons";
import React from "react";
import Box from "../Box";

interface INotificationProps {}

const Notification: React.FC<INotificationProps> = (props) => {
	return (
		<>
			<Box
				headerContent={
					<>
						<div className="text-lg font-medium flex items-center">
							<BellFilled /> Thông báo
						</div>
						<div className="bg-primary btn hover:bg-tertiary ">Tải lại</div>
					</>
				}
                className={"p-3"}
			>
				<ul className="pr-4">
					<li className="flex items-center justify-between py-4 border-b border-gray-200 ml-5">
						<span className="flex items-center">
							<BookFilled className="mr-2" /> Lộ trình "Cơ bản" cho người mới học
						</span>
						<span>2020-11-13 23:44:36</span> <span>Bởi admin</span>
					</li>
					<li className="flex items-center justify-between py-4 border-b border-gray-200 ml-5">
						<span className="flex items-center">
							<BookFilled className="mr-2" /> Lộ trình "Cơ bản" cho người mới học
						</span>
						<span>2020-11-13 23:44:36</span> <span>Bởi admin</span>
					</li>
					<li className="flex items-center justify-between py-4 border-b border-gray-200 ml-5">
						<span className="flex items-center">
							<BookFilled className="mr-2" /> Lộ trình "Cơ bản" cho người mới học
						</span>
						<span>2020-11-13 23:44:36</span> <span>Bởi admin</span>
					</li>
				</ul>
			</Box>
			<Pagination defaultCurrent={1} total={10} className="mt-3 flex justify-end pagination" />
		</>
	);
};

export default Notification;
