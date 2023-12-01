import React from "react";
import DropDown from "../base/DropDown";

const Header = () => {
	return (
		<div className='bg-white bg-opacity-70 px-4 py-2 text-gray-700 flex justify-between'>
			<div className='leading-8 font-bold'>CongheWeb</div>
			<DropDown
				buttonElement={
					<div className='w-8 h-8 rounded-full bg-blue-400 text-center leading-8 hover:scale-110 font-bold'>
						H
					</div>
				}
				classNameItems={"py-2 w-[250px]"}
				itemsElement={
					<>
						<div className='px-4 py-2'>
							<p className='font-semibold text-sm text-gray-600 mb-3'>
								Tài khoản
							</p>
							<div className='flex gap-4'>
								<div className='w-12 h-12 min-w-[48px] rounded-full text-lg bg-blue-400 text-center leading-[48px] font-bold'>
									H
								</div>
								<div className='text-sm'>
									<div className='block text-ellipsis overflow-hidden w-[154px]'>
										Hiền
									</div>
									<div className='block text-ellipsis overflow-hidden w-[154px]'>
										hienhienn1611@gmail.com
									</div>
								</div>
							</div>
						</div>
						<div className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
							Thông tin cá nhân
						</div>
						<div className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
							Đăng xuất
						</div>
					</>
				}
			/>
		</div>
	);
};

export default Header;
