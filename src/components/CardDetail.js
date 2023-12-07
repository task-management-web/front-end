import React from "react";
import SelectBox from "./base/SelectBox";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "./base/TextField/TextField";
import DropDown from "./base/DropDown";
import AddMember from "./AddMember";
import AddLabel from "./AddLabel";
import AddCheckList from "./AddCheckList";
import AddDate from "./AddDate";

const Schema = yup.object().shape({
	title: yup.string().required("Bạn chưa nhập tiêu đề"),
	description: yup.string(),
	coverUrl: yup.string(),
	listId: yup.string(),
	startDate: yup.date(),
	dueDate: yup.date(),
});

const CardDetail = () => {
	const {
		control,
		formState: { errors },
	} = useForm({ resolver: yupResolver(Schema) });
	return (
		<div className='w-[65vw] h-[500px] px-8 pb-4 pt-0 max-h-[80vh] overflow-auto grid-cols-5 grid gap-6'>
			<div className='grid h-fit gap-2 col-span-4'>
				<div className='lg:flex gap-x-4 gap-y-2'>
					<Controller
						control={control}
						name='title'
						render={({ field }) => (
							<TextField
								label='Tên thẻ'
								required={true}
								helperText={errors.title?.message}
								value={field.value}
								onChange={(e) => field.onChange(e.target.value)}
								labelStyle={{ fontSize: "small" }}
								ca
							/>
						)}
					/>
					<Controller
						control={control}
						name='listId'
						render={({ field }) => (
							<SelectBox
								label='Trong danh sách'
								required={true}
								helperText={errors.listId?.message}
								value={field.value}
								onChange={(e) => field.onChange(e.target.value)}
								labelStyle={{ fontSize: "small" }}
								placeholder={""}
							/>
						)}
					/>
				</div>
				<div>
					<span className='text-[13px]'>Thành viên</span>
				</div>
				<Controller
					control={control}
					name='description'
					render={({ field }) => (
						<TextField
							label='Mô tả'
							helperText={errors.description?.message}
							value={field.value}
							onChange={(e) => field.onChange(e.target.value)}
							labelStyle={{ fontSize: "small" }}
							isMultiLine
						/>
					)}
				/>
			</div>
			<div className='grid gap-2 col-span-1 h-fit'>
				<DropDown
					className={"w-full"}
					classNameButton={"p-0 stroke-button w-full "}
					buttonElement={<div>Thành viên</div>}
					itemsElement={<AddMember />}
					classNameItems={"!fixed w-[280px]"}
				/>
				<DropDown
					className={"w-full"}
					classNameButton={"p-0 stroke-button w-full"}
					buttonElement={<div>Nhãn</div>}
					itemsElement={<AddLabel />}
					classNameItems={"!fixed w-[280px]"}
				/>
				<DropDown
					className={"w-full"}
					classNameButton={"p-0 stroke-button w-full"}
					buttonElement={<div>Công việc</div>}
					itemsElement={<AddCheckList />}
					classNameItems={"!fixed w-[280px]"}
				/>
				<DropDown
					className={"w-full"}
					classNameButton={"p-0 stroke-button w-full"}
					buttonElement={<div>Ngày</div>}
					itemsElement={<AddDate />}
					classNameItems={"!fixed top-[10%] w-[280px]"}
				/>
			</div>
		</div>
	);
};

export default CardDetail;
