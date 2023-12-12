/** @format */

import React, { useState } from 'react';
import { BackgroundColorList } from './../utils/variable';
import clsx from 'clsx';
import { API } from '../utils/api';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const AddCover = ({ getCardInfo, cardId, cardInfo }) => {
	const [cover, setCover] = useState(
		cardInfo.coverUrl ? cardInfo.coverUrl : BackgroundColorList[0]
	);
	const onAddCover = (data) => {
		API.put(`/card/changecoverimage/${cardId}`, { coverUrl: cover })
			.then((res) => {
				toast.success('Thêm ảnh bìa thành công');
				getCardInfo();
			})
			.catch((err) => toast.error('Thêm ảnh bìa thất bại'));
	};

	return (
		<div className='p-2'>
			<div className='flex justify-between gap-2 px-8 pb-2'>
				<div className='font-semibold text-center w-full'>Thêm ảnh bìa</div>
			</div>
			<div className='flex gap-1 mt-2'>
				{BackgroundColorList.map((e, id) => (
					<div
						key={id}
						alt='background-board'
						style={{
							width: '100%',
							height: '40px',
							backgroundColor: e,
							// aspectRatio: '3 / 2',
						}}
						className={clsx(
							'rounded-md cursor-pointer',
							cover === e ? 'selected-img' : ''
						)}
						onClick={() => setCover(e)}
					/>
				))}
			</div>

			<button
				className='fill-button w-fit mt-2'
				onClick={() => onAddCover()}>
				Thêm
			</button>
		</div>
	);
};

export default AddCover;
