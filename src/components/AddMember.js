/** @format */

import React from 'react';
import { useSelector } from 'react-redux';
import UserAvatar from './UserAvatar';
import clsx from 'clsx';
import { API } from '../utils/api';
import { toast } from 'react-toastify';

const AddMember = ({ members, cardId }) => {
	const onAddMember = (userId) => {
		API.post('/card/addmembertocard/', {
			cardId: cardId,
			userId: userId,
		})
			.then((res) => {
				toast.success(res?.data?.message);
			})
			.catch((err) => toast.error(err?.response?.data?.error));
	};
	const boardInfo = useSelector((state) => state.board);
	return (
		<div className='p-2'>
			<div className='flex justify-between gap-2 px-8 pb-2'>
				<div className='font-semibold text-center w-full'>Thêm thành viên</div>
			</div>
			<div>
				{boardInfo.users?.map((e) => (
					<div
						key={e.id}
						className={clsx(
							'flex gap-4 mb-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg'
						)}
						onClick={() => onAddMember(e.id)}>
						<UserAvatar userName={e.userName} />
						<div className='leading-8'>
							{e.fullName} ({e.userName})
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default AddMember;
