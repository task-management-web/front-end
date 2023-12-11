/** @format */

import {
	CheckIcon,
	PencilAltIcon,
	TrashIcon,
	XIcon,
} from '@heroicons/react/outline';
import { useState } from 'react';
import TextField from './base/TextField/TextField';
import { API } from '../utils/api';
import { toast } from 'react-toastify';
import CheckListItem from './CheckListItem';

const CheckList = ({ getCardInfo, cardId, checkListInfo }) => {
	const [isEdit, setIsEdit] = useState(false);
	const [isAdd, setIsAdd] = useState(false);
	const [title, setTitle] = useState(checkListInfo.title || '');
	const [itemTitle, setItemTitle] = useState('');

	const onUpdateCheckList = () => {
		API.put(`/checklist/update/`, {
			checklistId: checkListInfo.id,
			newTitle: title,
		})
			.then((res) => {
				toast.success('Cập nhật công việc thành công');
				getCardInfo();
				setIsEdit(false);
			})
			.catch((err) => toast.error('Cập nhật công việc thất bại'));
	};

	const onDeleteCheckList = () => {
		API.delete(`/checklist/delete/${checkListInfo.id}`)
			.then((res) => {
				toast.success('Xoá công việc thành công');
				getCardInfo();
			})
			.catch((err) => toast.error('Xoá công việc thất bại'));
	};

	const onAddItems = () => {
		API.post('/checklistitem/create', {
			title: itemTitle,
			checklistId: checkListInfo.id,
		})
			.then((res) => {
				toast.success('Thêm công việc con thành công');
				getCardInfo();
				setIsAdd(false);
			})
			.catch((err) => toast.error('Thêm công việc con thất bại'));
	};
	return (
		<div className='mb-2 px-4 py-2 border rounded-md'>
			<div className='flex gap-2 w-full justify-between '>
				{!isEdit ? (
					checkListInfo.title
				) : (
					<TextField
						hiddenHelperText
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') onUpdateCheckList();
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
								onClick={() => onDeleteCheckList()}
							/>
						</>
					) : (
						<>
							<CheckIcon
								className='w-6 min-w-8 h-6 p-1 cursor-pointer hover:bg-gray-200 rounded-md my-auto text-green-500'
								onClick={() => onUpdateCheckList()}
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
			{checkListInfo?.checklistItems?.map((e) => (
				<CheckListItem
					key={e.id}
					itemInfo={e}
					getCardInfo={getCardInfo}
				/>
			))}
			{!isAdd ? (
				<button
					className='fill-button !px-2 !py-1 !text-sm mt-2'
					onClick={() => setIsAdd(true)}>
					Thêm công việc con
				</button>
			) : (
				<div className='mt-2'>
					<TextField
						hiddenHelperText
						value={itemTitle}
						onChange={(e) => setItemTitle(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') onAddItems();
						}}
					/>
					<div className='flex gap-2 mt-2'>
						<button
							className='fill-button !px-2 !py-1 !text-sm'
							onClick={() => onAddItems()}>
							Thêm
						</button>
						<XIcon
							className='w-6 h-6 my-auto text-gray-700 cursor-pointer'
							onClick={() => setIsAdd(false)}
						/>
					</div>
				</div>
			)}
		</div>
	);
};
export default CheckList;
