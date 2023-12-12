/** @format */

import { useState } from 'react';
import Checkbox from './base/Checkbox';
import TextField from './base/TextField/TextField';
import {
	CheckIcon,
	PencilAltIcon,
	TrashIcon,
	XIcon,
} from '@heroicons/react/outline';
import { API } from '../utils/api';
import { toast } from 'react-toastify';

const CheckListItem = ({ itemInfo, getCardInfo }) => {
	const [isEdit, setIsEdit] = useState(false);
	const [title, setTitle] = useState(itemInfo.title || '');

	const onUpdateItem = () => {
		API.put(`/checklistitem/update/`, {
			checklistItemId: itemInfo.id,
			newTitle: title,
		})
			.then((res) => {
				toast.success('Cập nhật công việc con thành công');
				getCardInfo();
				setIsEdit(false);
			})
			.catch((err) => toast.error('Cập nhật công việc con thất bại'));
	};

	const onDeleteItem = () => {
		API.delete(`/checklistitem/delete/${itemInfo.id}`)
			.then((res) => {
				toast.success('Xoá công việc con thành công');
				getCardInfo();
			})
			.catch((err) => toast.error('Xoá công việc con thất bại'));
	};

	return (
		<div className='pl-6 flex gap-2 w-full justify-between my-3'>
			{!isEdit ? (
				<div>
					<Checkbox
						className={'my-auto mr-2'}
						checked={itemInfo.checked}
						onChange={(ev) => {
							API.put(`/checklistitem/getstatus/${itemInfo.id}`, {
								checklistItemId: itemInfo.id,
								newCheckedStatus: ev.target.checked,
							})
								.then(() => {
									getCardInfo();
								})
								.catch((err) => console.log(err));
						}}
					/>
					{itemInfo.title}
				</div>
			) : (
				<TextField
					hiddenHelperText
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter') onUpdateItem();
					}}
				/>
			)}
			<div className='flex gap-2 my-auto'>
				{!isEdit ? (
					<>
						<PencilAltIcon
							className='w-6 min-w-8 h-6 p-1 hover:bg-gray-200 cursor-pointer rounded-md my-auto'
							onClick={() => setIsEdit(true)}
						/>
						<TrashIcon
							className='w-6 min-w-8 h-6 p-1 hover:bg-gray-200 cursor-pointer rounded-md text-red-500 my-auto'
							onClick={() => onDeleteItem()}
						/>
					</>
				) : (
					<>
						<CheckIcon
							className='w-6 min-w-8 h-6 p-1 cursor-pointer hover:bg-gray-200 rounded-md my-auto text-green-500'
							onClick={() => onUpdateItem()}
						/>
						<XIcon
							className='w-6 min-w-8 h-6 p-1 cursor-pointer hover:bg-gray-200 rounded-md my-auto text-red-500'
							onClick={() => {
								setIsEdit(false);
							}}
						/>
					</>
				)}
			</div>
		</div>
	);
};
export default CheckListItem;
