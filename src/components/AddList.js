import React, { useState } from "react";
import TextField from "./base/TextField/TextField";
import { PlusIcon, XIcon } from "@heroicons/react/outline";
import clsx from "clsx";

const AddList = () => {
	const [isAdd, setIsAdd] = useState(false);

	return (
		<div
			className={clsx(
				"rounded-lg p-2 w-[250px] min-w-[250px] h-fit gap-2 grid border",
				isAdd
					? "bg-gray-100 border-gray-200"
					: "bg-white bg-opacity-50 hover:bg-gray-100 cursor-pointer"
			)}
		>
			{isAdd ? (
				<>
					<TextField placeholder={"Nhập tiêu đề danh sách"} hiddenHelperText />
					<div className='flex gap-2'>
						<button className='fill-button w-fit'>Thêm</button>
						<XIcon
							className='w-6 h-6 my-auto text-gray-700 cursor-pointer'
							onClick={() => setIsAdd(false)}
						/>
					</div>
				</>
			) : (
				<div className='flex gap-2 p-2' onClick={() => setIsAdd(true)}>
					<PlusIcon className='w-4 h-4 my-auto' />
					Thêm danh sách mới
				</div>
			)}
		</div>
	);
};

export default AddList;
