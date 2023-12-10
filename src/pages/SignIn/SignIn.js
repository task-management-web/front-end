/** @format */

import React from 'react';
import styles from './SignIn.module.css';
import TextField from '../../components/base/TextField/TextField';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signIn } from '../../actions/auth';

const SignInSchema = yup.object().shape({
	userName: yup.string().required('Bạn chưa nhập tên đăng nhập'),
	password: yup
		.string()
		.required('Bạn chưa nhập mật khẩu')
		.min(8, 'Độ dài tối thiểu của mật khẩu là 8')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
			'Chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số'
		),
});

export const SignIn = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(SignInSchema),
		defaultValues: {
			userName: '',
			password: '',
		},
	});

	const onSubmit = (data) => {
		dispatch(signIn(data, navigate));
	};
	return (
		<div className={styles.background}>
			<div className={styles.signInContainer}>
				<div className='sign-up-text'>
					<h2>Đăng nhập</h2>
					<span>Hãy đăng nhập để tiếp tục sử dụng</span>
				</div>
				<form className={styles.formContainer}>
					<Controller
						control={control}
						name='userName'
						render={({ field }) => (
							<TextField
								label='Tên đăng nhập'
								required={true}
								helperText={errors.userName?.message}
								value={field.value}
								onChange={(e) => field.onChange(e.target.value)}
								labelStyle={{ fontSize: 'small' }}
							/>
						)}
					/>
					<Controller
						control={control}
						name='password'
						render={({ field }) => (
							<TextField
								label='Mật khẩu'
								required={true}
								helperText={errors.password?.message}
								value={field.value}
								onChange={(e) => field.onChange(e.target.value)}
								labelStyle={{ fontSize: 'small' }}
								type='password'
							/>
						)}
					/>
					<div style={{ display: 'flex', justifyContent: 'right' }}>
						<Link
							className='link-text'
							style={{ fontStyle: 'italic' }}>
							Quên mật khẩu
						</Link>
					</div>
					<button
						className='fill-button w-full'
						style={{ marginTop: '16px' }}
						onClick={handleSubmit(onSubmit)}>
						ĐĂNG NHẬP
					</button>
					<div className={styles.signinText}>
						Chưa có tài khoản?{' '}
						<Link
							to={'/sign-up'}
							className='link-text'>
							Đăng ký
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};
