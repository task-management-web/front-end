/** @format */

import React, { useEffect, useState } from 'react';
import { API } from '../utils/api';
import { toast } from 'react-toastify';
import Checkbox from './base/Checkbox';
import { PencilAltIcon, TrashIcon, XIcon } from '@heroicons/react/outline';
import TextField from './base/TextField/TextField';
import { LabelColorList } from './../utils/variable';
import clsx from 'clsx';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { getBoard } from './../actions/board';

const LabelSchema = yup.object().shape({
	title: yup.string().required('Bạn chưa nhập tiêu đề nhãn'),
	color: yup.string(),
});
const AddLabel = ({ getCardInfo, cardId, cardInfo }) => {
	// const [listLabel, setListLabel] = useState([]);
	const board = useSelector((state) => state.board);
	const dispatch = useDispatch();
	const [isAdd, setIsAdd] = useState('');
	const [labelIdUpdate, setLabelIdUpdate] = useState('');
	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(LabelSchema),
		defaultValues: {
			title: '',
			color: LabelColorList[0],
		},
	});

	const getAllLabels = () => {
		dispatch(getBoard(board.id));
	};

	// useEffect(() => {
	// 	getAllLabels();
	// }, []);

	const onAddLabel = (data) => {
		API.post('/label/create', { ...data, boardId: board.id })
			.then((res) => {
				toast.success('Tạo nhãn mới thành công');
				setIsAdd('');
				getAllLabels();
				setValue('title', '');
				setValue('color', '');
			})
			.catch((err) => toast.error('Tạo nhãn mới thất bại'));
	};

	const onUpdateLabel = (data) => {
		API.put('/label/update', {
			labelId: labelIdUpdate,
			newTitle: data.title,
			newColor: data.color,
		})
			.then((res) => {
				toast.success('Cập nhật nhãn thành công');
				setIsAdd('');
				getAllLabels();
				setValue('title', '');
				setValue('color', '');
				setLabelIdUpdate('');
			})
			.catch((err) => toast.error('Cập nhật nhãn thất bại'));
	};

	const onDeleteLabel = (id) => {
		API.delete(`/label/delete/${id}`)
			.then((res) => {
				toast.success('Xoá nhãn thành công');
				getAllLabels();
			})
			.catch((err) => toast.error('Xoá nhãn thất bại'));
	};

	const onAddLabelToCard = (labelId) => {
		API.post(`/card/${cardId}/labels/${labelId}`)
			.then((res) => {
				toast.success('Thêm nhãn vào thẻ thành công');
				getCardInfo();
			})
			.catch((err) => toast.error('Thêm nhãn vào thẻ thất bại'));
	};

	const onRemoveLabelToCard = (labelId) => {
		API.delete(`/card/${cardId}/labels/${labelId}`)
			.then((res) => {
				toast.success('Xoá nhãn khỏi thẻ thành công');
				getCardInfo();
			})
			.catch((err) => toast.error('Xoá nhãn khỏi thẻ thất bại'));
	};

	return (
		<div className='p-2'>
			<div className='flex justify-between gap-2 px-8 pb-2'>
				<div className='font-semibold text-center w-full'>Thêm nhãn</div>
			</div>

			{board?.labels?.map((e) => (
				<div
					className='flex mb-2'
					key={e.id}>
					<Checkbox
						className={'my-auto mr-2'}
						checked={cardInfo?.labels?.map((el) => el.id).includes(e.id)}
						onChange={(ev) => {
							if (ev.target.checked) onAddLabelToCard(e.id);
							else onRemoveLabelToCard(e.id);
						}}
					/>
					<div
						className='mr-2 w-[184px] leading-8 px-3 h-8 rounded-md text-white'
						style={{ backgroundColor: e.color }}>
						{e.title}
					</div>
					<PencilAltIcon
						className='w-6 min-w-8 h-6 p-1 hover:bg-gray-200 cursor-pointer rounded-md my-auto'
						onClick={() => {
							setIsAdd('UPDATE');
							setValue('title', e.title);
							setValue('color', e.color);
							setLabelIdUpdate(e.id);
						}}
					/>
					<TrashIcon
						className='w-6 min-w-8 h-6 p-1 hover:bg-gray-200 cursor-pointer rounded-md text-red-500 my-auto'
						onClick={() => onDeleteLabel(e.id)}
					/>
				</div>
			))}
			{board?.labels && board?.labels.length === 0 && (
				<span className={clsx('italic', !!isAdd ? 'hidden' : '')}>
					Không có dữ liệu để hiển thị
				</span>
			)}
			{!isAdd ? (
				<button
					className='stroke-button w-full'
					onClick={() => setIsAdd('ADD')}>
					Tạo nhãn mới
				</button>
			) : (
				<div className='gap-2'>
					<Controller
						control={control}
						name='title'
						render={({ field }) => (
							<TextField
								label='Tiêu đề nhãn'
								required={true}
								helperText={errors.title?.message}
								value={field.value}
								onChange={(e) => {
									field.onChange(e.target.value);
								}}
								onKeyDown={(e) => {
									if (e.keyCode === 32) {
										e.preventDefault();
										field.onChange(field.value + ' ');
									}
									if (e.key === 'Enter') {
										e.preventDefault();
									}
								}}
								labelStyle={{ fontSize: 'small' }}
							/>
						)}
					/>
					<Controller
						control={control}
						name='color'
						render={({ field }) => (
							<div className='grid grid-cols-5 gap-1'>
								{LabelColorList.map((e, id) => (
									<div
										key={id}
										alt='background-board'
										style={{
											width: '100%',
											height: '30px',
											backgroundColor: e,
											// aspectRatio: '3 / 2',
										}}
										className={clsx(
											'rounded-md cursor-pointer',
											field.value === e ? 'selected-img' : ''
										)}
										onClick={() => field.onChange(e)}
									/>
								))}
							</div>
						)}
					/>
					<div className='flex gap-2 mt-2'>
						{isAdd === 'ADD' ? (
							<button
								className='fill-button w-fit'
								onClick={handleSubmit(onAddLabel)}>
								Thêm
							</button>
						) : (
							<button
								className='fill-button w-fit'
								onClick={handleSubmit(onUpdateLabel)}>
								Cập nhật
							</button>
						)}
						<XIcon
							className='w-6 h-6 my-auto text-gray-700 cursor-pointer'
							onClick={() => setIsAdd('')}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default AddLabel;
