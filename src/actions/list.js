/** @format */

import { toast } from 'react-toastify';
import { API } from '../utils/api';

export const addList = (data, next) => (dispatch) =>
	new Promise((resolve, reject) => {
		API.post('/list/create', data)
			.then((res) => {
				toast.success('Tạo danh sách thành công');
				next();
			})
			.catch((err) =>
				toast.error(err?.response?.data?.message || 'Tạo danh sách thất bại')
			);
		resolve();
	});

export const updateList = (id, data, next) => (dispatch) =>
	new Promise((resolve, reject) => {
		API.put(`/list/update/${id}`, data)
			.then((res) => {
				toast.success(res?.data?.message);
				// next();
			})
			.catch((err) =>
				toast.error(
					err?.response?.data?.message || 'Cập nhật danh sách thất bại'
				)
			);
		resolve();
	});

export const deleteList = (id, data, next) => (dispatch) =>
	new Promise((resolve, reject) => {
		API.delete(`/list/delete?id=${id}`)
			.then((res) => {
				toast.success(res?.data?.message);
				// next();
			})
			.catch((err) =>
				toast.error(err?.response?.data?.message || 'Xoá danh sách thất bại')
			);
		resolve();
	});

export const getList = (id) => (dispatch) =>
	new Promise((resolve, reject) => {
		API.get(`/list/update${id}`)
			.then((res) => {
				// toast.success(res?.data?.message);
				// next();
				dispatch({ type: 'GET_LIST_INFO', payload: res?.data });
			})
			.catch((err) =>
				toast.error(
					err?.response?.data?.message || 'Tải thông tin danh sách thất bại'
				)
			);
		resolve();
	});
