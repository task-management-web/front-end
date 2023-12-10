/** @format */

import React from 'react';
import TextField from './base/TextField/TextField';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { addBoard, updateBoard } from '../actions/board';
import { getAllBoards } from '../actions/boards';

const Schema = yup.object().shape({
	title: yup.string().required('Bạn chưa nhập tiêu đề'),
	description: yup.string(),
	backgroundUrl: yup.string(),
});

const BackgroundImgList = [
	'https://images.unsplash.com/photo-1646005172204-db9e7905a864?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixid=MnwxfDB8MXxyYW5kb218MHwzMDY5NzI4OHx8fHx8fHwxNzAxNjEwMjk4&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1920',
	'https://images.unsplash.com/photo-1608897250563-6b236de9d205?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixid=MnwxfDB8MXxyYW5kb218MHwzMDY5NzI4OHx8fHx8fHwxNzAxNjEwODM4&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1920',
	'https://images.unsplash.com/photo-1678886763409-a7e7b395af43?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixid=MnwxfDB8MXxyYW5kb218MHwzMDY5NzI4OHx8fHx8fHwxNzAxNjExMDM3&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1920',
	'https://images.unsplash.com/photo-1677746792119-d8f8ee8e77f5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixid=MnwxfDB8MXxyYW5kb218MHwzMDY5NzI4OHx8fHx8fHwxNzAxNjExMDk4&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1920',
];

const BackgroundColorList = [
	'#f43f5e',
	'#d946ef',
	'#2563eb',
	'#fbbf24',
	'#16a34a',
];

const AddBoard = ({ closeModal, type = 'ADD' }) => {
	const board = useSelector((state) => state.board);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(Schema),
		defaultValues: {
			title: type === 'UPDATE' ? board.title : '',
			description: type === 'UPDATE' ? board.description || '' : '',
			backgroundUrl: type === 'UPDATE' ? board.backgroundUrl : '#f43f5e',
		},
	});

	const dispatch = useDispatch();

	const onSubmit = (data) => {
		if (type === 'ADD')
			dispatch(addBoard(data, closeModal, () => dispatch(getAllBoards())));
		else
			dispatch(
				updateBoard(board.id, data, closeModal, () => dispatch(getAllBoards()))
			);
	};
	return (
		<div className='w-[50vw] px-8 pb-4 pt-0 max-h-[80vh] overflow-auto'>
			<div className='grid gap-3'>
				<Controller
					control={control}
					name='title'
					render={({ field }) => (
						<TextField
							label='Tiêu đề'
							required={true}
							helperText={errors.title?.message}
							value={field.value}
							onChange={(e) => field.onChange(e.target.value)}
							labelStyle={{ fontSize: 'small' }}
						/>
					)}
				/>
				<Controller
					control={control}
					name='description'
					render={({ field }) => (
						<TextField
							label='Mô tả'
							helperText={errors.title?.message}
							value={field.value}
							onChange={(e) => field.onChange(e.target.value)}
							labelStyle={{ fontSize: 'small' }}
							isMultiLine
						/>
					)}
				/>
				<Controller
					control={control}
					name='backgroundUrl'
					render={({ field }) => (
						<div className='grid gap-2'>
							<span className='text-[13px]'>Ảnh nền</span>
							<div className='flex w-full gap-2'>
								{BackgroundImgList.map((e, id) => (
									<div
										key={id}
										alt='background-board'
										style={{
											width: 'calc((100% - 24px)*0.25)',
											backgroundImage: `url(${e})`,
											backgroundSize: 'cover',
											height: '100px',
										}}
										className={clsx(
											'rounded-lg cursor-pointer',
											field.value === e ? 'selected-img' : ''
										)}
										onClick={() => field.onChange(e)}
									/>
								))}
							</div>
							<div className='flex gap-2'>
								{BackgroundColorList.map((e, id) => (
									<div
										key={id}
										alt='background-board'
										style={{
											width: 'calc((100% - 32px)*0.2)',
											backgroundColor: e,
											height: '100px',
										}}
										className={clsx(
											'rounded-lg cursor-pointer',
											field.value === e ? 'selected-img' : ''
										)}
										onClick={() => field.onChange(e)}
									/>
								))}
							</div>
						</div>
					)}
				/>
				<div className='flex justify-end gap-2 my-2'>
					<button
						className='stroke-button w-[100px]'
						onClick={closeModal}>
						Huỷ
					</button>
					<button
						className='fill-button w-[100px]'
						onClick={handleSubmit(onSubmit)}>
						Đồng ý
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddBoard;
