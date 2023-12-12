/** @format */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Loader = () => {
	const navigate = useNavigate();
	useEffect(() => {
		if (localStorage.getItem('token')) return navigate('/home');
		return navigate('/sign-in');
	});
	return <div>Loader</div>;
};
export default Loader;
