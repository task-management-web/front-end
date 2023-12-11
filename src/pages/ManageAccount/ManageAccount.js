/** @format */

import React, { useEffect, useState } from 'react';
import ExpandPanel from '../../components/base/ExpandPanel';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import TextField from '../../components/base/TextField/TextField';
import { yupResolver } from '@hookform/resolvers/yup';
import ConfirmDialog from '../../components/base/ConfirmDialog';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	changePassword,
	deleteUser,
	getUserInfo,
	updateUser,
} from '../../actions/auth';

const InfoSchema = yup.object().shape({
	fullName: yup.string().required('Bạn chưa nhập họ tên'),
	userName: yup.string().required('Bạn chưa nhập tên đăng nhập'),
	email: yup.string().required('Bạn chưa nhập email'),
});

const ChangePasswordSchema = yup.object().shape({
	oldPassword: yup
		.string()
		.required('Bạn chưa nhập mật khẩu cũ')
		.min(8, 'Độ dài tối thiểu của mật khẩu là 8')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
			'Chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số'
		),
	newPassword: yup
		.string()
		.required('Bạn chưa nhập mật khẩu mới')
		.min(8, 'Độ dài tối thiểu của mật khẩu là 8')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
			'Chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số'
		),
	confirmPassword: yup
		.string()
		.required('Bạn chưa xác nhận mật khẩu mới')
		.min(8, 'Độ dài tối thiểu của mật khẩu là 8')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
			'Chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số'
		),
});

const ManageAccount = () => {
	const infoForm = useForm({
		resolver: yupResolver(InfoSchema),
		defaultValues: {
			fullName: '',
			userName: '',
			email: '',
		},
	});

	const changePasswordForm = useForm({
		resolver: yupResolver(ChangePasswordSchema),
		defaultValues: {
			oldPassword: '',
			newPassword: '',
			confirmPassword: '',
		},
	});
	const [isEditting, setIsEditting] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	// const [userInfo, setUserInfo] = useState();
	const navigate = useNavigate();
	const userInfo = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUserInfo());
	}, [dispatch]);

	const onCancelUpdate = () => {
		infoForm.setValue('fullName', userInfo?.fullName);
		infoForm.setValue('userName', userInfo?.userName);
		infoForm.setValue('email', userInfo?.email);
	};

	useEffect(() => {
		infoForm.setValue('fullName', userInfo?.fullName);
		infoForm.setValue('userName', userInfo?.userName);
		infoForm.setValue('email', userInfo?.email);
	}, [userInfo, infoForm]);

	const onDeleteAccount = () => {
		dispatch(deleteUser(navigate));
	};

	const onUpdateAccount = (data) => {
		dispatch(
			updateUser({ fullName: data.fullName }, () => setIsEditting(false))
		);
	};

	const onChangePassword = (data) => {
		if (data.newPassword !== data.confirmPassword) {
			changePasswordForm.setError('confirmPassword', {
				message: 'Xác nhận mật khẩu không đúng',
			});
			return;
		}
		dispatch(changePassword(data, clearChangePasswordForm));
	};

	const clearChangePasswordForm = () => {
		changePasswordForm.setValue('oldPassword', '');
		changePasswordForm.setValue('newPassword', '');
		changePasswordForm.setValue('confirmPassword', '');
	};

	return (
		<div className='p-4 w-full grid h-fit gap-4'>
			<ExpandPanel
				title='Thông tin cá nhân'
				element={
					<>
						<div className='flex gap-10 mt-4'>
							<div
								className='w-[270px] h-[270px] min-w-[270px] text-[90px] text-blue-800 rounded-full bg-blue-400 text-center leading-[270px] font-bold'
								style={{ userSelect: 'none' }}>
								H
							</div>
							<div className='grid gap-2 w-full'>
								<Controller
									control={infoForm.control}
									name='fullName'
									render={({ field }) => (
										<TextField
											label='Họ tên'
											required={true}
											helperText={infoForm.formState.errors.fullName?.message}
											value={field.value}
											onChange={(e) => field.onChange(e.target.value)}
											labelStyle={{ fontSize: 'small' }}
											disabled={!isEditting}
										/>
									)}
								/>
								<Controller
									control={infoForm.control}
									name='userName'
									render={({ field }) => (
										<TextField
											label='Tên đăng nhập'
											required={true}
											helperText={infoForm.formState.errors.userName?.message}
											value={field.value}
											onChange={(e) => field.onChange(e.target.value)}
											labelStyle={{ fontSize: 'small' }}
											disabled={true}
										/>
									)}
								/>
								<Controller
									control={infoForm.control}
									name='email'
									render={({ field }) => (
										<TextField
											label='Email'
											required={true}
											helperText={infoForm.formState.errors.email?.message}
											value={field.value}
											onChange={(e) => field.onChange(e.target.value)}
											labelStyle={{ fontSize: 'small' }}
											disabled={true}
										/>
									)}
								/>
							</div>
						</div>
						<div className='flex gap-2 justify-end'>
							{isEditting ? (
								<>
									<button
										className='stroke-button w-[150px]'
										onClick={() => {
											setIsEditting(false);
											onCancelUpdate();
										}}>
										Huỷ
									</button>
									<button
										className='fill-button w-[150px]'
										onClick={infoForm.handleSubmit(onUpdateAccount)}>
										Lưu
									</button>
								</>
							) : (
								<>
									<button
										className='delete-button w-[150px]'
										onClick={() => setOpenDelete(true)}>
										Xoá tài khoản
									</button>
									<button
										className='fill-button w-[150px]'
										onClick={() => setIsEditting(true)}>
										Cập nhật
									</button>
								</>
							)}
						</div>
					</>
				}
			/>
			<ExpandPanel
				title='Đổi mật khẩu'
				element={
					<>
						<div className='flex gap-10 mt-4'>
							<div className='grid gap-2 w-full'>
								<Controller
									control={changePasswordForm.control}
									name='oldPassword'
									render={({ field }) => (
										<TextField
											label='Mật khẩu cũ'
											required={true}
											helperText={
												changePasswordForm.formState.errors.oldPassword?.message
											}
											value={field.value}
											onChange={(e) => field.onChange(e.target.value)}
											labelStyle={{ fontSize: 'small' }}
											type='password'
										/>
									)}
								/>
								<Controller
									control={changePasswordForm.control}
									name='newPassword'
									render={({ field }) => (
										<TextField
											label='Mật khẩu mới'
											required={true}
											helperText={
												changePasswordForm.formState.errors.newPassword?.message
											}
											value={field.value}
											onChange={(e) => field.onChange(e.target.value)}
											labelStyle={{ fontSize: 'small' }}
											type='password'
										/>
									)}
								/>
								<Controller
									control={changePasswordForm.control}
									name='confirmPassword'
									render={({ field }) => (
										<TextField
											label='Xác nhận mật khẩu'
											required={true}
											helperText={
												changePasswordForm.formState.errors.confirmPassword
													?.message
											}
											value={field.value}
											onChange={(e) => field.onChange(e.target.value)}
											labelStyle={{ fontSize: 'small' }}
											type='password'
										/>
									)}
								/>
							</div>
						</div>
						<div className='flex gap-2 justify-end'>
							<button
								className='stroke-button w-[150px]'
								onClick={() => clearChangePasswordForm()}>
								Huỷ
							</button>
							<button
								className='fill-button w-[150px]'
								onClick={changePasswordForm.handleSubmit(onChangePassword)}>
								Lưu
							</button>
						</div>
					</>
				}
			/>
			<ConfirmDialog
				open={openDelete}
				onClickNo={() => setOpenDelete(false)}
				onClickYes={() => {
					setOpenDelete(false);
					onDeleteAccount();
				}}
				title={'Bạn chắc chắn muốn xoá tài khoản này'}
			/>
		</div>
	);
};

export default ManageAccount;
