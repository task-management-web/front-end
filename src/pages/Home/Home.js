import React from "react";
import List from "../../components/List";
// import Header from "../../components/Layout/Header";
// import SideBar from "../../components/Layout/SideBar";
// import Main from "./Main/Main";

const Home = () => {
	return (
		<div className='overflow-auto'>
			<div className='bg-white bg-opacity-40 p-4 fixed fill-available'>
				<div className='text-lg font-bold text-gray-700 '>ABC board</div>
			</div>
			<div className='flex  w-fit p-4 gap-4 mt-[60px]'>
				<List />
				<List />
				<List />
				<List />
				<List />
				<List />
				<List />
				<List />
				<List />
				<List />
				<List />
			</div>
		</div>
	);
};

export default Home;
