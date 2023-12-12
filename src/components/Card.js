/** @format */

import { XIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import CardDetail from './CardDetail';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

const Card = ({ cardInfo, listId, getListInfo }) => {
	const [openDetail, setOpenDetail] = useState(false);
	const dispatch = useDispatch();
	const moving = useSelector((state) => state.moving);
	const [{ opacity }, dragRef] = useDrag(
		() => ({
			type: 'CARD',
			collect: (monitor) => ({
				opacity: monitor.isDragging() ? 0.5 : 1,
			}),
		}),
		[]
	);

	useEffect(() => {
		// console.log(moving);
	}, [moving]);

	return (
		<div
			className='bg-white px-2 py-1 rounded-md text-gray-700 cursor-pointer'
			style={{ opacity }}
			onClick={() => setOpenDetail(true)}
			ref={dragRef}
			onDragStart={() =>
				dispatch({
					type: 'START_DRAG',
					payload: { cardId: cardInfo.id, type: 'CARD', listId: listId },
				})
			}>
			{cardInfo?.title}
			<Popup
				open={openDetail}
				closeOnDocumentClick={false}
				onClose={() => setOpenDetail(false)}>
				<div className='flex justify-between gap-2 px-8 pt-6 pb-4'>
					<span className='font-semibold'>Chi tiết thẻ</span>
					<XIcon
						className='cursor-pointer w-6 h-6 p-[2px]'
						onClick={() => setOpenDetail(false)}
					/>
				</div>
				<CardDetail
					closeModal={() => setOpenDetail(false)}
					cardId={cardInfo.id}
					listId={listId}
					getListInfo={getListInfo}
				/>
			</Popup>
		</div>
	);
};

export default Card;
