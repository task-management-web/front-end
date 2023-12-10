/** @format */

import React, { useState } from 'react';
import TextField from './base/TextField/TextField';
import { PlusIcon, XIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';
import { API } from '../utils/api';

const AddList = ({ position }) => {
	const [isAdd, setIsAdd] = useState(false);
	const location = useLocation();
	const [listTitle, setListTitle] = useState('');
	const boardId = location.pathname.split('/')[2];

	const onAddList = (data) => {
		API.post('/list/create', {
			title: listTitle,
			boardId: boardId,
			position: position,
		});
	};

	return (
		<div
			className={clsx(
				'rounded-lg p-2 w-[250px] min-w-[250px] h-fit gap-2 grid border',
				isAdd
					? 'bg-gray-100 border-gray-200'
					: 'bg-white bg-opacity-50 hover:bg-gray-100 cursor-pointer'
			)}>
			{isAdd ? (
				<>
					<TextField
						value={listTitle}
						onChange={(e) => {
							console.log(e);
							setListTitle(e.target.value);
						}}
						onKeyDown={(e) => {
							if (e.key === 'Enter') onAddList();
						}}
						placeholder={'Nhập tiêu đề danh sách'}
						hiddenHelperText
					/>
					<div className='flex gap-2'>
						<button
							className='fill-button w-fit'
							onClick={() => onAddList()}>
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
					className='flex gap-2 p-2'
					onClick={() => setIsAdd(true)}>
					<PlusIcon className='w-4 h-4 my-auto' />
					Thêm danh sách mới
				</div>
			)}
		</div>
	);
};

export default AddList;
