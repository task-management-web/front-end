/** @format */

import { CalendarIcon, XIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import CardDetail from './CardDetail';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';

const Card = ({ cardInfo, listId, getListInfo }) => {
	const [openDetail, setOpenDetail] = useState(false);
	const dispatch = useDispatch();
	const [{ opacity }, dragRef] = useDrag(
		() => ({
			type: 'CARD',
			collect: (monitor) => ({
				opacity: monitor.isDragging() ? 0.5 : 1,
			}),
		}),
		[]
	);

	return (
		<div
			className='bg-white rounded-md text-gray-700 cursor-pointer border'
			style={{ opacity }}
			onClick={() => setOpenDetail(true)}
			ref={dragRef}
			onDragStart={() =>
				dispatch({
					type: 'START_DRAG',
					payload: { cardId: cardInfo.id, type: 'CARD', listId: listId },
				})
			}>
			<div
				className={clsx(
					'h-8 w-full rounded-t-md',
					!!cardInfo.coverUrl ? '' : 'hidden'
				)}
				style={{ backgroundColor: cardInfo.coverUrl }}></div>
			<div className='px-2 py-1'>
				{cardInfo?.title}
				{(cardInfo.startDate || cardInfo.dueDate) && (
					<div className='text-sm my-1 flex gap-2'>
						<CalendarIcon className='w-4 h-4 my-auto' />
						{cardInfo.startDate && !cardInfo.dueDate
							? 'Bắt đầu: ' +
							  new Date(cardInfo?.startDate).toLocaleDateString('vi') +
							  ' '
							: ''}
						{cardInfo.dueDate && !cardInfo.startDate
							? 'Kết thúc: ' +
							  new Date(cardInfo?.dueDate).toLocaleDateString('vi')
							: ''}
						{cardInfo.dueDate &&
							cardInfo.startDate &&
							new Date(cardInfo?.startDate).toLocaleDateString('vi') +
								' - ' +
								new Date(cardInfo?.dueDate).toLocaleDateString('vi')}
					</div>
				)}
			</div>
			<Popup
				open={openDetail}
				closeOnDocumentClick={false}
				onClose={() => setOpenDetail(false)}>
				<div
					style={{ backgroundColor: cardInfo.coverUrl }}
					className={clsx(
						'h-[100px] w-full rounded-t-md',
						!!cardInfo.coverUrl ? '' : 'hidden'
					)}></div>
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
