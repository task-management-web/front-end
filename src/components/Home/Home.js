import React from "react";
import Header from "../Layout/Header";
import SideBar from "../Layout/SideBar";
import Main from "./Main/Main";

const Home = () => {
	return (
		<div className='bg-pink-100'>
			<Header />
			<div className='flex'>
				<SideBar />
				<Main />
			</div>
		</div>
	);
};

export default Home;
