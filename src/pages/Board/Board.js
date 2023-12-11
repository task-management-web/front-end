/** @format */

import React, { useEffect, useState } from 'react';
import List from '../../components/List';
import AddList from '../../components/AddList';
import { useLocation } from 'react-router-dom';
import { InformationCircleIcon } from '@heroicons/react/outline';
import BoardDetail from '../../components/Layout/BoardDetail';
import { useDispatch, useSelector } from 'react-redux';
import { getBoard } from './../../actions/board';

const Board = () => {
	const location = useLocation();
	const boardId = location.pathname.split('/')[2];
	const dispatch = useDispatch();
	const boardInfo = useSelector((state) => state.board);
	const [openDetail, setOpenDetail] = useState(false);
	const [cardMoving, setCardMoving] = useState({});
	const [listMoving, setListMoving] = useState({});

	useEffect(() => {
		dispatch(getBoard(boardId));
	}, [boardId, dispatch]);

	return (
		<div className='flex w-full overflow-auto'>
			<div className='overflow-auto w-full'>
				<div className='bg-white bg-opacity-40 p-4 w-full'>
					<div className='text-lg font-bold text-gray-700 flex justify-between'>
						{boardInfo.title}
						{!openDetail && (
							<InformationCircleIcon
								className='w-8 h-8 rounded-full p-1 cursor-pointer  my-auto'
								onClick={() => setOpenDetail(true)}
							/>
						)}
					</div>
				</div>
				<div className='flex w-fit p-4 gap-4'>
					{boardInfo?.lists?.map((e) => (
						<List
							key={e.id}
							listId={e.id}
						/>
					))}
					<AddList position={boardInfo?.lists?.length + 1} />
				</div>
			</div>
			<BoardDetail
				open={openDetail}
				setOpen={setOpenDetail}
			/>
		</div>
	);
};

export default Board;
