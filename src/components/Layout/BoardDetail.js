/** @format */

import React, { useState } from 'react';
import {
	PencilAltIcon,
	PlusIcon,
	TrashIcon,
	XIcon,
} from '@heroicons/react/outline';

import clsx from 'clsx';
import ExpandPanel from '../base/ExpandPanel';
import { useDispatch, useSelector } from 'react-redux';
import Popup from 'reactjs-popup';
import AddBoard from '../AddBoard';
import ConfirmDialog from '../base/ConfirmDialog';
import { changeRoleMember, closeBoard, getBoard } from '../../actions/board';
import { useNavigate } from 'react-router-dom';
import AddBoardMember from '../AddBoardMember';
import { ListMemberRoles } from '../../utils/variable';
import UserAvatar from '../UserAvatar';
import DropDown from '../base/DropDown';
// import TextField from '../base/TextField/TextField';
import SelectBox from '../base/SelectBox';
import { deleteMember } from './../../actions/board';
import { getAllBoards } from '../../actions/boards';

const BoardDetail = ({ open, setOpen }) => {
	const detail = useSelector((state) => state.board);
	const selfInfo = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [openUpdate, setOpenUpdate] = useState(false);
	const [openConfirm, setOpenConfirm] = useState(false);
	const [openAddMember, setOpenAddMember] = useState(false);
	const [selectedRole, setSelectedRole] = useState(1);
	const [openConfirmMember, setOpenConfirmMember] = useState(-1);

	const onCloseBoard = () => {
		dispatch(closeBoard(detail.id, navigate, () => dispatch(getAllBoards())));
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
					'flex justify-between overflow-hidden',
					open ? 'w-[400px] p-4 ' : 'w-0 hidden'
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
					'transition-all duration-300 overflow-hidden ',
					open ? 'w-[400px] px-4' : 'w-0'
				)}>
				<ExpandPanel
					defaultOpen={false}
					className={'!px-4 !py-2'}
					title='Mô tả'
					element={
						detail.description || <span className='italic'>Không có mô tả</span>
					}
					titleClassName={'text-base'}
				/>
				<ExpandPanel
					defaultOpen={false}
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
					element={detail.users?.map((e) => (
						<div
							key={e.id}
							className='flex mb-2 justify-between'>
							<div className='flex gap-4'>
								<UserAvatar userName={e.userName} />
								<div>
									<div
										className={clsx(
											'mb-1',
											selfInfo.id === e.id ? 'font-semibold' : ''
										)}>
										{e.fullName} ({e.email})
									</div>
									<span
										className={clsx(
											'text-sm py-1 px-2 rounded-lg  text-white',
											e.BoardMember?.role === 0
												? 'bg-red-600'
												: e.BoardMember?.role === 1
												? 'bg-green-500'
												: 'bg-gray-500'
										)}>
										{ListMemberRoles[e.BoardMember?.role]?.label}
									</span>
								</div>
							</div>
							<div
								className={clsx(
									'flex my-auto',
									e.id === selfInfo?.id || !detail.isAdmin ? 'hidden' : ''
								)}>
								<DropDown
									classNameButton={'!p-0'}
									buttonElement={
										<PencilAltIcon className='w-6 h-6 p-1 hover:bg-gray-200 cursor-pointer rounded-md' />
									}
									itemsElement={
										<div className='p-4'>
											<div className='flex justify-between gap-2 px-8 pb-2'>
												<div className='font-semibold text-center w-full'>
													Cập nhật quyền
												</div>
											</div>
											<SelectBox
												options={ListMemberRoles}
												label='Quyền'
												required={true}
												hiddenHelperText
												labelStyle={{ fontSize: 'small' }}
												placeholder={''}
												value={selectedRole}
												onChange={(e) => {
													setSelectedRole(e.value);
												}}
											/>
											<button
												className='fill-button w-fit mt-2'
												onClick={() => {
													dispatch(
														changeRoleMember(
															detail.id,
															e.id,
															selectedRole,
															() => {
																dispatch(getBoard(detail.id));
															}
														)
													);
												}}>
												Cập nhật
											</button>
										</div>
									}
									classNameItems={'!fixed w-[280px] -translate-x-[100%]'}
								/>
								<TrashIcon
									className='w-6 h-6 p-1 hover:bg-gray-200 cursor-pointer rounded-md text-red-500'
									onClick={() => setOpenConfirmMember(e.id)}
								/>
							</div>
						</div>
					))}
					titleClassName={'text-base'}
				/>
			</div>
			<div
				className={clsx(
					open && detail.isAdmin ? 'p-4 flex gap-2' : 'p-0 hidden'
				)}>
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
			<ConfirmDialog
				open={openConfirmMember > -1}
				onClickNo={() => setOpenConfirmMember(-1)}
				onClickYes={() => {
					dispatch(
						deleteMember(detail.id, openConfirmMember, () =>
							dispatch(getBoard(detail.id))
						)
					);
					setOpenConfirmMember(-1);
				}}
				title={'Bạn chắc chắn muốn xoá thành viên này'}
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
