import React from "react";
import { classNames } from "../../../../helper/helper";

interface IBoxProps {
	headerContent?: React.ReactNode;
	children?: React.ReactNode;
	className?: string;
}

const Box: React.FC<IBoxProps> = ({ headerContent, children, className }) => {
	return (
		<div
			className={classNames("box", {
				[className ? className : ""]: className,
			})}
		>
			<div
				className={classNames("flex items-center justify-between p-3", {
					hidden: !headerContent,
				})}
			>
				{headerContent}
			</div>
			{children}
		</div>
	);
};

export default Box;
