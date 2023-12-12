/** @format */

import clsx from 'clsx';

const UserAvatar = ({ userName = '', className }) => {
	return (
		<div
			className={clsx(
				'w-8 h-8 rounded-full bg-blue-400 text-blue-800 text-center leading-8 font-bold my-auto min-w-8',
				className
			)}>
			{userName.charAt(0) || ''}
		</div>
	);
};
export default UserAvatar;
