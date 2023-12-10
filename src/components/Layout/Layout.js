/** @format */

import React from 'react';
import Header from './Header';
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
	return (
		<>
			<Header />
			<div className='flex'>
				<SideBar />
				<Outlet />
			</div>
		</>
	);
};

export default Layout;
