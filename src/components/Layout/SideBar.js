/** @format */

import React, { useEffect } from 'react';
import { ChevronRightIcon, PlusIcon, XIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import clsx from 'clsx';
import Popup from 'reactjs-popup';
import AddBoard from '../AddBoard';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBoards } from '../../actions/boards';

const SideBar = () => {
	const [isOpen, setIsOpen] = useState(true);
	const [openAddBoard, setOpenAddBoard] = useState(false);
	const boards = useSelector((state) => state.boards);
	// const [boardsList, setBoardsList] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllBoards());
	}, [dispatch]);

	return (
		<div
			className={clsx(
				'bg-white bg-opacity-70 transition-all duration-300 relative',
				isOpen ? 'w-[300px]' : 'w-4 hover:bg-gray-100'
			)}
			style={{ minHeight: 'calc(100vh - 56px)' }}>
			<button
				onClick={() => setIsOpen((o) => !o)}
				className={clsx(
					'absolute right-0 mt-3 z-10 translate-x-3 bg-white w-6 h-6 border border-gray-200 p-1 text-gray-700 hover:bg-gray-100 rounded-full transition-all',
					isOpen ? '' : 'rotate-180 '
				)}>
				<ChevronRightIcon />
			</button>
			<div
				className={clsx(
					'transition-all duration-300 overflow-hidden',
					isOpen ? 'w-[300px]' : 'w-4'
				)}>
				<div className='px-4 py-2 text-sm font-semibold flex justify-between'>
					Bảng
					<button
						className='w-6 h-6 rounded-md hover:bg-gray-100 p-1 font-normal'
						onClick={() => setOpenAddBoard(true)}>
						<PlusIcon />
					</button>
				</div>
				{boards.map((e) => (
					<Link
						to={`/board/${e.id}`}
						key={e.id}
						className='hover:bg-gray-100 px-4 py-2 w-[300px]cursor-pointer flex gap-2'>
						<div
							className='h-6 w-6 min-w-6 rounded-md border-2 border-grap-400'
							style={{
								background:
									e.backgroundUrl.charAt(0) === '#'
										? e.backgroundUrl
										: `url(${e.backgroundUrl})`,
							}}></div>
						<div className='block text-ellipsis whitespace-nowrap  overflow-hidden w-[228px]'>
							{e.title}
						</div>
					</Link>
				))}
			</div>
			<Popup
				open={openAddBoard}
				closeOnDocumentClick={false}>
				<div className='flex justify-between gap-2 px-8 pt-6 pb-4'>
					<span className='font-semibold'>Thêm bảng mới</span>
					<XIcon
						className='cursor-pointer w-6 h-6 p-[2px]'
						onClick={() => setOpenAddBoard(false)}
					/>
				</div>
				<AddBoard closeModal={() => setOpenAddBoard(false)} />
			</Popup>
		</div>
	);
};

export default SideBar;
