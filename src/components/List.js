/** @format */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Card from './Card';
import TextField from './base/TextField/TextField';
import {
	PencilAltIcon,
	PlusIcon,
	TrashIcon,
	XIcon,
} from '@heroicons/react/outline';
import DropDown from './base/DropDown';
import { useDispatch } from 'react-redux';
import { updateList } from '../actions/list';
import { API } from '../utils/api';
import { toast } from 'react-toastify';
import { useDrag, useDrop } from 'react-dnd';
import { clsx } from 'clsx';

const List = ({ listId }) => {
	const ref = useRef(null);
	const [{ opacity }, drag] = useDrag(() => ({
		type: 'LIST',
		collect: (monitor) => ({
			opacity: monitor.isDragging() ? 0.5 : 1,
		}),
	}));
	const [{ isOver }, drop] = useDrop(
		() => ({
			accept: 'CARD',
			collect: (monitor) => ({
				isOver: !!monitor.isOver(),
			}),
		}),
		[]
	);
	drag(drop(ref));

	const [isAdd, setIsAdd] = useState(false);
	const [cardTitle, setCardTitle] = useState('');
	const [listInfo, setListInfo] = useState({});
	const [listTitle, setListTitle] = useState(listInfo?.title);

	const dispatch = useDispatch();

	const updateTitleList = () => {
		dispatch(updateList(listInfo.id, { title: listTitle }));
	};

	const getListInfo = useCallback(() => {
		API.get(`/list/${listId}`)
			.then((res) => setListInfo(res?.data))
			.catch((err) => console.log(err));
	}, [listId]);

	const onAddCard = () => {
		API.post('/card/createcard', {
			title: cardTitle,
			listId: listId,
			coverUrl: '',
		})
			.then((res) => {
				toast.success('Tạo thẻ thành công');
				getListInfo();
				setIsAdd(false);
				setCardTitle('');
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		getListInfo();
	}, [listId, getListInfo]);

	return (
		<div
			className={clsx(
				'bg-gray-100 rounded-lg p-2 w-[250px] min-w-[250px] h-fit gap-2 grid border border-gray-200 transition-all duration-300',
				isOver ? 'scale-105' : ''
			)}
			style={{ opacity }}
			ref={ref}>
			<div className='font-semibold text-sm py-1 px-2 flex justify-between'>
				{listInfo?.title}
				<div className='flex '>
					<DropDown
						classNameButton={'!p-0'}
						buttonElement={
							<PencilAltIcon className='w-6 h-6 p-1 hover:bg-gray-200 cursor-pointer rounded-md' />
						}
						itemsElement={
							<div className='p-4'>
								<div className='flex justify-between gap-2 px-8 pb-2'>
									<div className='font-semibold text-center w-full'>
										Cập nhật tiêu đề danh sách
									</div>
								</div>
								<TextField
									hiddenHelperText
									className={'font-normal'}
									value={listTitle}
									onChange={(e) => setListTitle(e.target.value)}
									onKeyDown={(e) => {
										if (e.key === 'Enter') updateTitleList();
									}}
								/>
								<button
									className='fill-button w-fit mt-2'
									onClick={() => updateTitleList()}>
									Cập nhật
								</button>
							</div>
						}
						classNameItems={'!fixed w-[280px]'}
					/>

					<TrashIcon className='w-6 h-6 p-1 hover:bg-gray-200 cursor-pointer rounded-md text-red-500' />
				</div>
			</div>
			{listInfo?.cards?.map((e) => (
				<Card
					key={e.id}
					cardInfo={e}
					listId={listInfo.id}
					getListInfo={getListInfo}
				/>
			))}

			{isAdd ? (
				<>
					<TextField
						value={cardTitle}
						onChange={(e) => setCardTitle(e.target.value)}
						placeholder={'Nhập tiêu đề thẻ'}
						hiddenHelperText
						onKeyDown={(e) => {
							if (e.key === 'Enter') onAddCard();
						}}
					/>
					<div className='flex gap-2'>
						<button
							className='fill-button w-fit'
							onClick={() => onAddCard()}>
							Thêm
						</button>
						<XIcon
							className='w-6 h-6 my-auto text-gray-700 cursor-pointer'
							onClick={() => setIsAdd(false)}
						/>
					</div>
				</>
			) : (
				<div
					className='flex gap-2 p-2 cursor-pointer hover:bg-gray-200 rounded-lg'
					onClick={() => setIsAdd(true)}>
					<PlusIcon className='w-4 h-4 my-auto' />
					Thêm thẻ mới
				</div>
			)}
		</div>
	);
};

export default List;
