/** @format */

import React from 'react';
import { XIcon } from '@heroicons/react/outline';

import clsx from 'clsx';

const BoardDetail = ({ open, setOpen, detail }) => {
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
					'transition-all duration-300 overflow-hidden',
					open ? 'w-[400px]' : 'w-0'
				)}></div>
		</div>
	);
};

export default BoardDetail;
