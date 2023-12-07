import React, { useState } from "react";
import Card from "./Card";
import TextField from "./base/TextField/TextField";
import { PlusIcon, XIcon } from "@heroicons/react/outline";

const List = () => {
	const [isAdd, setIsAdd] = useState(false);

	return (
		<div className='bg-gray-100 rounded-lg p-2 w-[250px] min-w-[250px] h-fit gap-2 grid border border-gray-200'>
			<div className='font-semibold text-sm py-1 px-2'>Doing</div>
			<Card />
			<Card />
			<Card />
			{isAdd ? (
				<>
					<TextField placeholder={"Nhập tiêu đề thẻ"} hiddenHelperText />
					<div className='flex gap-2'>
						<button className='fill-button w-fit'>Thêm</button>
						<XIcon
							className='w-6 h-6 my-auto text-gray-700 cursor-pointer'
							onClick={() => setIsAdd(false)}
						/>
					</div>
				</>
			) : (
				<div
					className='flex gap-2 p-2 cursor-pointer hover:bg-gray-200 rounded-lg'
					onClick={() => setIsAdd(true)}
				>
					<PlusIcon className='w-4 h-4 my-auto' />
					Thêm thẻ mới
				</div>
			)}
		</div>
	);
};

export default List;
