import { ChevronDownIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import React, { useState } from "react";

const ExpandPanel = ({ defaultOpen = true, title, element }) => {
	const [open, setOpen] = useState(defaultOpen);
	return (
		<div className={clsx("bg-white w-full rounded-lg px-8 py-6 grid")}>
			<div
				className='flex justify-between cursor-pointer'
				onClick={() => setOpen((o) => !o)}
			>
				<div className='items-center leading-8 text-[18px] font-semibold'>
					{title}
				</div>
				<ChevronDownIcon
					className={clsx(
						open
							? "-rotate-180 transform duration-300 "
							: "duration-300 transform",
						"h-5",
						"w-5"
					)}
				/>
			</div>
			<div
				className={clsx(
					"grid overflow-hidden transition-[max-height] duration-500",
					open ? "max-h-[1000px]" : "max-h-0"
				)}
			>
				{element}
			</div>
		</div>
	);
};

export default ExpandPanel;
