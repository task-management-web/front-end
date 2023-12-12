/** @format */

import { toast } from 'react-toastify';
import { API } from '../utils/api';

export const signUp = (data, navigate) => (dispatch) => {
	API.post('/users/', data)
		.then((data) => {
			toast.success(data.data?.message);
			navigate('/sign-in');
		})
		.catch((err) => {
			toast.error(err?.response?.data?.message);
		});
};

export const signIn = (data, navigate) => (dispatch) => {
	API.post('/auth/login', data)
		.then((res) => {
			toast.success('Đăng nhập thành công');
			navigate('/home');
			localStorage.setItem('token', res.data.token);
		})
		.catch((err) => {
			toast.error(err.response.data?.message || 'Đăng nhập thất bại');
			console.log(err);
		});
};

export const getUserInfo = (next) => (dispatch) => {
	API.get('/users')
		.then((data) => {
			dispatch({ type: 'GET_USER_INFO', payload: data?.data });
			// next();
		})
		.catch((err) => {
			toast.error('Tải thông tin người dùng thất bại');
		});
};

export const logOut = (navigate) => (dispatch) => {
	API.post('/auth/logout')
		.then((data) => {
			localStorage.removeItem('token');
			navigate('/sign-in');
		})
		.catch((err) => {
			localStorage.removeItem('token');
			navigate('/sign-in');
			// toast.error('Đăng xuất thất bại');
		});
};

export const deleteUser = (navigate) => (dispatch) => {
	API.delete('/users')
		.then((data) => {
			toast.success(data?.data?.message || 'Xoá tài khoản thành công');
			navigate('/sign-in');
		})
		.catch((err) =>
			toast.error(
				err?.response.data?.message || 'Tải thông tin người dùng thất bại'
			)
		);
};

export const changePassword = (data, next) => (dispatch) => {
	API.put('users/change-password', data)
		.then((res) => {
			toast.success(res?.data?.message);
			next();
		})
		.catch((err) => toast.error(err?.response.data?.message));
};

export const updateUser = (data, next) => (dispatch) => {
	API.put('/users', data)
		.then((res) => {
			toast.success(res?.data?.message);
			dispatch({ type: 'UPDATE_USER', payload: data });
			next();
		})
		.catch((err) => toast.error(err?.response.data?.message));
};
