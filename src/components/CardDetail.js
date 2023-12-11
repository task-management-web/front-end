/** @format */

import React, { useCallback, useEffect, useState } from 'react';
import SelectBox from './base/SelectBox';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from './base/TextField/TextField';
import DropDown from './base/DropDown';
import AddMember from './AddMember';
import AddLabel from './AddLabel';
import AddCheckList from './AddCheckList';
import AddDate from './AddDate';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { API } from '../utils/api';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import CheckList from './CheckList';

const Schema = yup.object().shape({
	title: yup.string().required('Bạn chưa nhập tiêu đề'),
	description: yup.string().nullable(),
});

const CardDetail = ({ cardId, listId, closeModal, getListInfo }) => {
	const board = useSelector((state) => state.board);
	const [cardDetail, setCardDetail] = useState({});
	const [isEdit, setIsEdit] = useState('');
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
			</div>
		</div>
	);
};

export default CardDetail;
