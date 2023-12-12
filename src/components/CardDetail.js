/** @format */

import React, { useCallback, useEffect, useState } from 'react';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from './base/TextField/TextField';
import DropDown from './base/DropDown';
import AddLabel from './AddLabel';
import AddCheckList from './AddCheckList';
import AddDate from './AddDate';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { API } from '../utils/api';
import { PencilAltIcon, TrashIcon, XIcon } from '@heroicons/react/outline';
import CheckList from './CheckList';
import UserAvatar from './UserAvatar';
import AddCover from './AddCover';

const Schema = yup.object().shape({
	title: yup.string().required('Bạn chưa nhập tiêu đề'),
	description: yup.string().nullable(),
});

const CardDetail = ({ cardId, closeModal, getListInfo }) => {
	const user = useSelector((state) => state.auth);
	const board = useSelector((state) => state.board);
	const [cardDetail, setCardDetail] = useState({});
	const [isEdit, setIsEdit] = useState('');
	const [comment, setComment] = useState('');

	const {
		control,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(Schema),
		defaultValues: {
			title: '',
			description: '',
		},
	});

	const getCardInfo = useCallback(() => {
		API.get(`/card/${cardId}`)
			.then((res) => {
				setCardDetail(res?.data);
				setValue('title', res?.data?.title);
				setValue('description', res?.data?.description);
			})
			.catch((err) => toast.error('Tải thông tin thẻ thất bại'));
	}, [cardId, setValue]);

	useEffect(() => {
		getCardInfo();
	}, [cardId, getCardInfo]);

	const onUpdateCard = (data) => {
		API.put(`/card/updatecard/${cardId}`, data)
			.then((res) => {
				toast.success('Cập nhật thông tin thẻ thành công');
				getCardInfo();
			})
			.catch((err) => toast.error('Cập nhật thông tin thẻ thất bại'));
	};

	const onDeleteCard = (data) => {
		API.delete(`/card/delete/${cardId}`, data)
			.then((res) => {
				toast.success('Xoá thông tin thẻ thành công');
				getListInfo();
				closeModal();
			})
			.catch((err) => toast.error('Xoá thông tin thẻ thất bại'));
	};

	const onAddComment = () => {
		API.post('/comment/create', {
			userId: user.id,
			cardId: cardId,
			content: comment,
		})
			.then((res) => {
				toast.success('Thêm bình luận thành công');
				getCardInfo();
				setIsEdit('');
			})
			.catch((err) => toast.error('Thêm bình luận thất bại'));
	};

	const onUpdateComment = (id) => {
		API.put('/comment/update', {
			commentId: id,
			newContent: comment,
		})
			.then((res) => {
				toast.success('Cập nhật bình luận thành công');
				getCardInfo();
				setIsEdit('');
			})
			.catch((err) => toast.error('Cập nhật bình luận thất bại'));
	};

	const onDeleteComment = (id) => {
		API.delete(`/comment/delete/${id}`)
			.then((res) => {
				toast.success('Xoá bình luận thành công');
				getCardInfo();
				setIsEdit('');
			})
			.catch((err) => toast.error('Xoá bình luận thất bại'));
	};

	// console.log(board?.users?.find((el) => el.id === 1).fullName);

	return (
		<div className='w-[65vw] h-[500px] px-8 pb-4 pt-0 max-h-[80vh] overflow-auto grid-cols-5 grid gap-6'>
			<div className='grid h-fit gap-1 col-span-4'>
				<div className='w-full flex justify-between'>
					<span className='text-lg font-semibold'>Thẻ</span>

					<div className='flex gap-2'>
						{isEdit !== 'CARD_INFO' && (
							<PencilAltIcon
								className='w-6 min-w-8 h-6 p-1 hover:bg-gray-200 cursor-pointer rounded-md my-auto'
								onClick={() => setIsEdit('CARD_INFO')}
							/>
						)}
						<TrashIcon
							className='w-6 min-w-8 h-6 p-1 hover:bg-gray-200 cursor-pointer rounded-md text-red-500 my-auto'
							onClick={() => onDeleteCard()}
						/>
					</div>
				</div>
				{isEdit !== 'CARD_INFO' ? (
					<>
						<div>
							Tên thẻ: <span className='font-semibold'>{cardDetail.title}</span>
						</div>
						<div>
							Mô tả:{' '}
							{cardDetail.description || (
								<span className='italic'>Không có mô tả</span>
							)}
						</div>
					</>
				) : (
					<div className='grid h-fit gap-1'>
						<Controller
							control={control}
							name='title'
							render={({ field }) => (
								<TextField
									label='Tên thẻ'
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
									helperText={errors.description?.message}
									value={field.value}
									onChange={(e) => field.onChange(e.target.value)}
									labelStyle={{ fontSize: 'small' }}
									isMultiLine
								/>
							)}
						/>
						<div className='flex justify-end gap-2 my-2'>
							<button
								className='stroke-button w-[100px]'
								onClick={() => {
									setValue('title', cardDetail.title);
									setValue('description', cardDetail.description);
									setValue('listId', cardDetail.ListId);
									setIsEdit('');
								}}>
								Huỷ
							</button>
							<button
								className='fill-button w-[100px]'
								onClick={handleSubmit(onUpdateCard)}>
								Lưu
							</button>
						</div>
					</div>
				)}
				<span className='text-lg font-semibold mt-2'>Công việc</span>
				{cardDetail?.checklists?.map((e) => (
					<CheckList
						key={e.id}
						cardId={cardId}
						getCardInfo={getCardInfo}
						checkListInfo={e}
					/>
				))}
				<span className='text-lg font-semibold mt-2'>Bình luận</span>
				<div className='flex gap-4 mt-2'>
					<UserAvatar
						userName={user.userName}
						className={'!m-0'}
					/>
					{isEdit === 'WRITE_COMMENT' ? (
						<div style={{ width: 'calc(100% - 48px)' }}>
							<TextField
								className='w-full'
								hiddenHelperText
								isMultiLine
								value={comment}
								onChange={(e) => setComment(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === 'Enter') onAddComment();
								}}
							/>
							<button
								className='fill-button'
								onClick={() => onAddComment()}>
								Thêm
							</button>
						</div>
					) : (
						<div
							style={{ width: 'calc(100% - 48px)' }}
							className='h-8 rounded-xl border px-4 leading-8 text-gray-700 cursor-pointer'
							onClick={() => {
								setIsEdit('WRITE_COMMENT');
								setComment('');
							}}>
							Viết bình luận...
						</div>
					)}
				</div>
				{cardDetail?.comments?.map((e) => (
					<div className='flex gap-4 mt-2'>
						<UserAvatar
							userName={user.userName}
							className={'!m-0'}
						/>
						{isEdit === `UPDATE_COMMENT_${e.id}` ? (
							<div style={{ width: 'calc(100% - 48px)' }}>
								<div className='mb-1 text-sm text-gray-700 flex'>
									<span className='font-semibold'>
										{board?.users?.find((el) => el.id === e.UserId).fullName}
									</span>
									<div className='w-1 h-1 rounded-full bg-gray-700 my-auto mx-2'></div>
									{e.updatedAt !== e.createdAt && 'Đã chỉnh sửa '}
									{new Date(e.updatedAt).toLocaleString('vi')}
								</div>
								<TextField
									className='w-full'
									hiddenHelperText
									isMultiLine
									value={comment}
									onChange={(e) => setComment(e.target.value)}
									onKeyDown={(e) => {
										if (e.key === 'Enter') onUpdateComment();
									}}
								/>
								<div className='flex gap-2'>
									<button
										className='fill-button'
										onClick={() => onUpdateComment(e.id)}>
										Lưu
									</button>
									<XIcon
										className='w-6 h-6 my-auto text-gray-700 cursor-pointer'
										onClick={() => setIsEdit('')}
									/>
								</div>
							</div>
						) : (
							<div
								className='w-full'
								style={{ width: 'calc(100% - 48px)' }}>
								<div className='mb-1 text-sm text-gray-700 flex'>
									<span className='font-semibold'>
										{board?.users?.find((el) => el.id === e.UserId).fullName}
									</span>
									<div className='w-1 h-1 rounded-full bg-gray-700 my-auto mx-2'></div>
									{e.updatedAt !== e.createdAt && 'Đã chỉnh sửa '}
									{new Date(e.updatedAt).toLocaleString('vi')}
								</div>
								<div className='h-8 rounded-xl border px-4 leading-8 text-gray-700 cursor-pointer w-full flex flex-1'>
									{e.content}
								</div>
								<div className='flex ml-3 mt-1 gap-2'>
									<span
										className='text-sm underline text-gray-700 cursor-pointer'
										onClick={() => {
											setIsEdit(`UPDATE_COMMENT_${e.id}`);
											setComment(e.content);
										}}>
										Cập nhật
									</span>
									<span
										className='text-sm underline text-gray-700 cursor-pointer'
										onClick={() => onDeleteComment(e.id)}>
										Xoá
									</span>
								</div>
							</div>
						)}
					</div>
				))}
			</div>

			<div className='grid gap-2 col-span-1 h-fit'>
				<div className='text-sm font-semibold'>Thêm vào thẻ</div>
				{/* <DropDown
					className={'w-full'}
					classNameButton={'p-0 stroke-button w-full '}
					buttonElement={<div>Thành viên</div>}
					itemsElement={<AddMember cardId={cardDetail.id} />}
					classNameItems={'!fixed w-[280px]'}
				/> */}
				<DropDown
					className={'w-full'}
					classNameButton={'p-0 stroke-button w-full'}
					buttonElement={<div>Nhãn</div>}
					itemsElement={
						<AddLabel
							getCardInfo={getCardInfo}
							cardId={cardId}
							cardInfo={cardDetail}
						/>
					}
					classNameItems={'!fixed w-[280px]'}
				/>
				<DropDown
					className={'w-full'}
					classNameButton={'p-0 stroke-button w-full'}
					buttonElement={<div>Ảnh bìa</div>}
					itemsElement={
						<AddCover
							getCardInfo={getCardInfo}
							cardId={cardId}
							cardInfo={cardDetail}
						/>
					}
					classNameItems={'!fixed w-[280px]'}
				/>
				<DropDown
					className={'w-full'}
					classNameButton={'p-0 stroke-button w-full'}
					buttonElement={<div>Công việc</div>}
					itemsElement={
						<AddCheckList
							getCardInfo={getCardInfo}
							cardId={cardId}
						/>
					}
					classNameItems={'!fixed w-[280px]'}
				/>
				<DropDown
					className={'w-full'}
					classNameButton={'p-0 stroke-button w-full'}
					buttonElement={<div>Ngày</div>}
					itemsElement={
						<AddDate
							getCardInfo={getCardInfo}
							cardId={cardId}
							cardInfo={cardDetail}
						/>
					}
					classNameItems={'!fixed top-[10%] w-[280px]'}
				/>

				{/* <DropDown
					className={'w-full'}
					classNameButton={'p-0 stroke-button w-full'}
					buttonElement={<div>Ngày</div>}
					itemsElement={
						<AddAttachment
							getCardInfo={getCardInfo}
							cardId={cardId}
							cardInfo={cardDetail}
						/>
					}
					classNameItems={'!fixed top-[10%] w-[280px]'}
				/> */}
			</div>
		</div>
	);
};

export default CardDetail;
