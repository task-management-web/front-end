/** @format */

import React, { useState } from 'react';
import { PlusIcon, XIcon } from '@heroicons/react/outline';

import clsx from 'clsx';
import ExpandPanel from '../base/ExpandPanel';
import { useDispatch, useSelector } from 'react-redux';
import Popup from 'reactjs-popup';
import AddBoard from '../AddBoard';
import ConfirmDialog from '../base/ConfirmDialog';
import { closeBoard } from '../../actions/board';
import { useNavigate } from 'react-router-dom';
import AddBoardMember from '../AddBoardMember';

const BoardDetail = ({ open, setOpen }) => {
	const detail = useSelector((state) => state.board);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [openUpdate, setOpenUpdate] = useState(false);
	const [openConfirm, setOpenConfirm] = useState(false);
	const [openAddMember, setOpenAddMember] = useState(false);

	const onCloseBoard = () => {
		dispatch(closeBoard(detail.id, navigate));
	};
	return (
		<div
			className={clsx(
				'bg-white bg-opacity-70 transition-all duration-300 relative',
				open ? 'w-[400px]' : 'w-0'
			)}
			style={{ minHeight: 'calc(100vh - 56px)' }}>
			<div
				className={clsx(
					'flex justify-between p-4 overflow-hidden',
					open ? 'w-[400px]' : 'hidden'
				)}>
				<span className='font-semibold text-lg overflow-hidden'>Chi tiết</span>
				<button
					onClick={() => setOpen((o) => !o)}
					className={clsx(
						'w-8 h-8 p-1 text-gray-700 hover:bg-gray-100 rounded-full'
					)}>
					<XIcon />
				</button>
			</div>
			<div
				className={clsx(
					'transition-all duration-300 overflow-hidden px-4',
					open ? 'w-[400px]' : 'w-0'
				)}>
				<ExpandPanel
					className={'!px-4 !py-2'}
					title='Mô tả'
					element={
						detail.description || <span className='italic'>Không có mô tả</span>
					}
					titleClassName={'text-base'}
				/>
				<ExpandPanel
					className={'!px-4 !py-2 mt-4'}
					title={
						<div className='flex gap-2'>
							Thành viên
							<PlusIcon
								className='w-4 h-4 my-auto text-[#f2789f]'
								onClick={() => setOpenAddMember(true)}
							/>
						</div>
					}
					element={
						detail.description || <span className='italic'>Không có mô tả</span>
					}
					titleClassName={'text-base'}
				/>
			</div>
			<div className='p-4 flex gap-2'>
				<button
					className='delete-button w-full'
					onClick={() => setOpenConfirm(true)}>
					Đóng bảng
				</button>
				<button
					className='fill-button w-full'
					onClick={() => setOpenUpdate(true)}>
					Cập nhật bảng
				</button>
			</div>
			<Popup
				open={openUpdate}
				closeOnDocumentClick={false}>
				<div className='flex justify-between gap-2 px-8 pt-6 pb-4'>
					<span className='font-semibold'>Cập nhật bảng</span>
					<XIcon
						className='cursor-pointer w-6 h-6 p-[2px]'
						onClick={() => setOpenUpdate(false)}
					/>
				</div>
				<AddBoard
					closeModal={() => setOpenUpdate(false)}
					type='UPDATE'
				/>
			</Popup>
			<ConfirmDialog
				open={openConfirm}
				onClickNo={() => setOpenConfirm(false)}
				onClickYes={() => {
					setOpenConfirm(false);
					onCloseBoard();
				}}
				title={'Bạn chắc chắn muốn đóng bảng này'}
			/>
			<Popup
				open={openAddMember}
				closeOnDocumentClick={false}>
				<div className='flex justify-between gap-2 px-8 pt-6 pb-4'>
					<span className='font-semibold'>Thêm thành viên vào bảng</span>
					<XIcon
						className='cursor-pointer w-6 h-6 p-[2px]'
						onClick={() => setOpenAddMember(false)}
					/>
				</div>
				<AddBoardMember closeModal={() => setOpenAddMember(false)} />
			</Popup>
		</div>
	);
};

export default BoardDetail;
