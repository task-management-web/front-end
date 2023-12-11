/** @format */

import React, { useState } from 'react';
import TextField from './base/TextField/TextField';
import { API } from '../utils/api';
import { toast } from 'react-toastify';

const AddCheckList = ({ getCardInfo, cardId }) => {
	const [title, setTitle] = useState('Công việc');

	const onAddCheckList = () => {
		API.post(`/checklist/create/`, {
			title: title,
			cardId: cardId,
		})
			.then((res) => {
				toast.success('Thêm công việc thành công');
				getCardInfo();
			})
			.catch((err) => toast.error('Thêm công việc thất bại'));
	};
	return (
		<div className='p-2'>
			<div className='flex justify-between gap-2 px-8 pb-2'>
				<div className='font-semibold text-center w-full'>Thêm công việc</div>
			</div>
			<TextField
				className={'mb-2'}
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === 'Enter') onAddCheckList();
				}}
				hiddenHelperText
				placeholder={'Nhập tiêu đề'}
			/>
			<button
				className='fill-button w-fit'
				onClick={() => onAddCheckList()}>
				Thêm
			</button>
		</div>
	);
};

export default AddCheckList;
