/** @format */

import { toast } from 'react-toastify';
import { API } from '../utils/api';

export const addList = (data, next) => (dispatch) =>
	new Promise((resolve, reject) => {
		API.post('/list/create', data)
			.then((res) => {
				toast.success('Tạo danh sách thành công');
				// next();
			})
			.catch((err) =>
				toast.error(err?.response?.data?.message || 'Tạo danh sách thất bại')
			);
		resolve();
	});
