import React from "react";
import { ChevronRightIcon, PlusIcon } from "@heroicons/react/outline";
import { useState } from "react";
import clsx from "clsx";

const ListBoard = [
	{
		id: "1",
		title: "abc",
	},
	{
		id: "2",

		title: "abc",
	},
	{
		id: "3",
		title: "abshhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhc",
	},
];

const SideBar = () => {
	const [isOpen, setIsOpen] = useState(true);
	return (
		<div
			className={clsx(
				"bg-white bg-opacity-70 transition-all duration-300 relative",
				isOpen ? "w-[300px]" : "w-4 hover:bg-gray-100"
			)}
			style={{ minHeight: "calc(100vh - 56px)" }}
		>
			<button
				onClick={() => setIsOpen((o) => !o)}
				className={clsx(
					"absolute right-0 mt-3 z-10 translate-x-3 bg-white w-6 h-6 border border-gray-200 p-1 text-gray-700 hover:bg-gray-100 rounded-full transition-all",
					isOpen ? "" : "rotate-180 "
				)}
			>
				<ChevronRightIcon />
			</button>
			<div
				className={clsx(
					"transition-all duration-300 overflow-hidden",
					isOpen ? "w-[300px]" : "w-4"
				)}
			>
				<div className='px-4 py-2 text-sm font-semibold flex justify-between'>
					Bảng
					<button className='w-6 h-6 rounded-md hover:bg-gray-100 p-1 font-normal'>
						<PlusIcon />
					</button>
				</div>
				{ListBoard.map((e) => (
					<div
						key={e.id}
						className='hover:bg-gray-100 px-4 py-2 text-ellipsis block whitespace-nowrap w-[300px] overflow-hidden cursor-pointer'
					>
						{e.title}
					</div>
				))}
			</div>
		</div>
	);
};

export default SideBar;
