/** @format */

import { useEffect } from 'react';

const Home = () => {
	const changeBackground = (url) => {
		let body = document.querySelector('body');
		if (url.charAt(0) === '#') body.style.background = url;
		else body.style.background = `url(${url})`;
	};
	useEffect(() => {
		changeBackground('#f9c5d5');
	}, []);
	return <div className='p-4'>Hãy chọn một bảng hoặc tạo một bảng mới</div>;
};
export default Home;
