/** @format */

import { toast } from 'react-toastify';
import { API } from '../utils/api';

const changeBackground = (url) => {
	let body = document.querySelector('body');
	if (url.charAt(0) === '#') body.style.background = url;
	else body.style.background = `url(${url})`;
};

export const getBoard = (boardId) => (dispatch) => {
	API.get(`/boards/${boardId}`)
		.then((data) => {
			dispatch({ type: 'GET_BOARD_INFO', payload: data?.data });
			changeBackground(data?.data.backgroundUrl);
		})
		.catch((err) => {
			toast.error(err?.response?.data?.message);
			console.log(err);
		});
};

export const addBoard = (data, closeModal, next) => (dispatch) =>
	new Promise((resolve, reject) => {
		API.post('/boards/', data)
			.then((res) => {
				closeModal();
				toast.success(res.data?.message);
				next();
			})
			.catch((err) => toast.error(err?.response?.data?.message));
		resolve();
	});

export const updateBoard = (boardId, data, closeModal, next) => (dispatch) =>
	new Promise((resolve, reject) => {
		API.put(`/boards/${boardId}`, data)
			.then((res) => {
				closeModal();
				toast.success(res.data?.message);
				changeBackground(data.backgroundUrl);
				next();
				dispatch({ type: 'UPDATE_BOARD', payload: data });
			})
			.catch((err) => toast.error(err?.response?.data?.message));
		resolve();
	});

export const closeBoard = (boardId, navigate) => (dispatch) => {
	API.delete(`/boards/${boardId}`)
		.then((data) => {
			toast.success(data.data?.message);
			navigate('/');
			dispatch({ type: 'DELETE_BOARD', payload: {} });
			changeBackground('#f9c5d5');
		})
		.catch((err) => {
			toast.error(err?.response?.data?.message);
			// console.log(err);
		});
};
