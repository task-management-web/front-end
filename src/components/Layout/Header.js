/** @format */

import React, { useEffect } from 'react';
import DropDown from '../base/DropDown';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, logOut } from '../../actions/auth';

const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth);

	useEffect(() => {
		dispatch(getUserInfo());
	}, [dispatch]);

	const onLogout = () => {
		dispatch(logOut(navigate));
	};

	return (
		<div className='bg-white bg-opacity-70 px-4 py-2 text-gray-700 flex justify-between'>
			<div className='leading-8 font-bold'>CongheWeb</div>
			<DropDown
				buttonElement={
					<div className='w-8 h-8 rounded-full bg-blue-400 text-blue-800 text-center leading-8 hover:scale-110 font-bold'>
						{user?.userName?.split('')[0] || ''}
					</div>
				}
				classNameItems={'py-2 w-[250px] right-0'}
				itemsElement={
					<>
						<div className='px-4 py-2'>
							<p className='font-semibold text-sm text-gray-600 mb-3'>
								Tài khoản
							</p>
							<div className='flex gap-4'>
								<div className='w-12 h-12 min-w-[48px] rounded-full text-lg text-blue-800 bg-blue-400 text-center leading-[48px] font-bold'>
									{user?.userName?.split('')[0] || ''}
								</div>
								<div className='text-sm'>
									<div className='block text-ellipsis overflow-hidden w-[154px]'>
										{user?.userName}
									</div>
									<div className='block text-ellipsis overflow-hidden w-[154px]'>
										{user?.email}
									</div>
								</div>
							</div>
						</div>

						<Link to='/manage-account'>
							<div className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
								Quản lý tài khoản
							</div>
						</Link>

						<div
							className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
							onClick={onLogout}>
							Đăng xuất
						</div>
					</>
				}
			/>
		</div>
	);
};

export default Header;
