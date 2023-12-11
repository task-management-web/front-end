/** @format */

import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import { useDispatch } from 'react-redux';
import SelectBox from './base/SelectBox';
import { ListMemberRoles } from '../utils/variable';
import { API } from '../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { addMember, getBoard } from '../actions/board';

const Schema = yup.object().shape({
	userId: yup.string().required('Bạn chưa chọn thành viên'),
	role: yup.number().required('Bạn chưa chọn quyền'),
});

const AddBoardMember = ({ closeModal, type = 'ADD' }) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(Schema),
		defaultValues: {
			userId: '',
			role: 1,
		},
	});

	const [listUser, setListUser] = useState([]);
	const dispatch = useDispatch();
	const boardInfo = useSelector((state) => state.board);

	useEffect(() => {
		API.get('/users/search?keyword=').then((res) => {
			setListUser(
				res?.data.map((e) => ({
					value: e.id,
					label: `${e.fullName} (${e.userName} - ${e.email})`,
				}))
			);
		});
	}, []);

	const onSubmit = (data) => {
		dispatch(
			addMember(boardInfo.id, data.userId, data.role, () => {
				closeModal();
				dispatch(getBoard(boardInfo.id));
			})
		);
	};

	return (
		<div className='w-[50vw] px-8 pb-4 pt-0 max-h-[80vh] min-h-[310px] overflow-auto'>
			<div className='grid gap-3'>
				<Controller
					control={control}
					name='userId'
					render={({ field }) => (
						<SelectBox
							options={listUser}
							label='Thành viên'
							required={true}
							helperText={errors.userId?.message}
							labelStyle={{ fontSize: 'small' }}
							placeholder={''}
							value={field.value}
							onChange={(e) => {
								field.onChange(e.value);
							}}
						/>
					)}
				/>
				<Controller
					control={control}
					name='role'
					render={({ field }) => (
						<SelectBox
							options={ListMemberRoles}
							label='Quyền '
							required={true}
							helperText={errors.role?.message}
							labelStyle={{ fontSize: 'small' }}
							placeholder={''}
							value={field.value}
							onChange={(e) => {
								field.onChange(e.value);
							}}
						/>
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

export default AddBoardMember;
