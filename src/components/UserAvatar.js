/** @format */

const UserAvatar = ({ userName = '' }) => {
	return (
		<div className='w-8 h-8 rounded-full bg-blue-400 text-blue-800 text-center leading-8 font-bold my-auto'>
			{userName.charAt(0) || ''}
		</div>
	);
};
export default UserAvatar;
