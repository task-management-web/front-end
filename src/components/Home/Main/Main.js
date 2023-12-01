import React from "react";
import List from "./List";

const Main = () => {
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

export default Main;
