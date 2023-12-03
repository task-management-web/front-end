import React from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
	return (
		<div className='Home bg-pink-100'>
			<Header />
			<div className='flex'>
				<SideBar />
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
