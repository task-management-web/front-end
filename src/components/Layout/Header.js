import React, { useEffect, useState } from "react";
import DropDown from "../base/DropDown";
import { Link, useNavigate } from "react-router-dom";
import { API } from "./../../utils/api";
import { toast } from "react-toastify";

const Header = () => {
	const navigate = useNavigate();
	const [userInfo, setUserInfo] = useState({
		userName: "",
		email: "",
	});

	useEffect(() => {
		API.get("/users")
			.then((data) => {
				setUserInfo(data.data);
			})
			.catch((err) => {
				console.log(err);
				toast.error("Tải thông tin người dùng thất bại");
			});
	}, []);

	const onLogout = () => {
		API.post("/users/logout")
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
		localStorage.removeItem("token");
		navigate("/sign-in");
	};

	return (
		<div className='bg-white bg-opacity-70 px-4 py-2 text-gray-700 flex justify-between'>
			<div className='leading-8 font-bold'>CongheWeb</div>
			<DropDown
				buttonElement={
					<div className='w-8 h-8 rounded-full bg-blue-400 text-blue-800 text-center leading-8 hover:scale-110 font-bold'>
						{userInfo.userName?.split("")[0] || ""}
					</div>
				}
				classNameItems={"py-2 w-[250px] right-0"}
				itemsElement={
					<>
						<div className='px-4 py-2'>
							<p className='font-semibold text-sm text-gray-600 mb-3'>
								Tài khoản
							</p>
							<div className='flex gap-4'>
								<div className='w-12 h-12 min-w-[48px] rounded-full text-lg text-blue-800 bg-blue-400 text-center leading-[48px] font-bold'>
									{userInfo.userName?.split("")[0] || ""}
								</div>
								<div className='text-sm'>
									<div className='block text-ellipsis overflow-hidden w-[154px]'>
										{userInfo.userName}
									</div>
									<div className='block text-ellipsis overflow-hidden w-[154px]'>
										{userInfo.email}
									</div>
								</div>
							</div>
						</div>

						<Link to='/manage-account'>
							<div className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
								Quản lý tài khoản
							</div>
						</Link>

						<div
							className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
							onClick={onLogout}
						>
							Đăng xuất
						</div>
					</>
				}
			/>
		</div>
	);
};

export default Header;
