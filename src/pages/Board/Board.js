/** @format */

import React, { useEffect, useState } from 'react';
import List from '../../components/List';
import AddList from '../../components/AddList';
import { useLocation } from 'react-router-dom';
import { API } from '../../utils/api';
import { InformationCircleIcon } from '@heroicons/react/outline';
import BoardDetail from '../../components/Layout/BoardDetail';

const Board = () => {
	const location = useLocation();
	const boardId = location.pathname.split('/')[2];
	const [boardInfo, setBoardInfo] = useState({});
	const [lists, setList] = useState([]);
	const [openDetail, setOpenDetail] = useState(false);

	useEffect(() => {
		API.get(`/boards/${boardId}`)
			.then((data) => {
				setBoardInfo(data.data);
			})
			.catch((err) => console.log(err));

		API.post('/list/getListsByBoardId/', { boardId: Number(boardId) })
			.then((res) => {
				setList(res.data);
			})
			.catch((err) => {});
	}, [boardId]);

	return (
		<div className='flex w-full'>
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
					{lists.map((e) => (
						<List listInfo={e} />
					))}
					<AddList position={lists.length + 1} />
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
