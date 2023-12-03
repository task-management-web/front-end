import React from "react";
import Card from "./Card";

const List = () => {
	return (
		<div className='bg-gray-100 rounded-lg p-2 w-[250px] min-w-[250px] h-fit gap-2 grid border border-gray-200'>
			<div className='font-semibold text-sm py-1 px-2'>Doing</div>
			<Card />
			<Card />
			<Card />
		</div>
	);
};

export default List;
