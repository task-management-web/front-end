/** @format */

import { toast } from 'react-toastify';
import { API } from '../utils/api';

export const getAllBoards = () => (dispatch) => {
	API.get('/boards/')
		.then((res) => {
			dispatch({ type: 'GET_ALL_BOARDS', payload: res?.data });
		})
		.catch((err) => {
			toast.error(err?.response?.data?.message);
			console.log(err);
		});
};
