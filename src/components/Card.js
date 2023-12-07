import { XIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import Popup from "reactjs-popup";
import CardDetail from "./CardDetail";

const Card = () => {
	const [openDetail, setOpenDetail] = useState(false);
	return (
		<div
			className='bg-white px-2 py-1 rounded-md text-gray-700 cursor-pointer'
			onClick={() => setOpenDetail(true)}
		>
			Card
			<Popup
				open={openDetail}
				closeOnDocumentClick={true}
				onClose={() => setOpenDetail(false)}
			>
				<div className='flex justify-between gap-2 px-8 pt-6 pb-4'>
					<span className='font-semibold'>Chi tiết thẻ</span>
					<XIcon
						className='cursor-pointer w-6 h-6 p-[2px]'
						onClick={() => setOpenDetail(false)}
					/>
				</div>
				<CardDetail closeModal={() => setOpenDetail(false)} />
			</Popup>
		</div>
	);
};

export default Card;
