import React from "react";
import SelectBox from "./base/SelectBox";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "./base/TextField/TextField";

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
		<div className='w-[50vw] h-[500px] px-8 pb-4 pt-0 max-h-[80vh] overflow-auto'>
			<div className='grid gap-3'></div>
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
					/>
				)}
			/>
			<Controller
				control={control}
				name='description'
				render={({ field }) => (
					<TextField
						label='Mô tả'
						helperText={errors.title?.message}
						value={field.value}
						onChange={(e) => field.onChange(e.target.value)}
						labelStyle={{ fontSize: "small" }}
						isMultiLine
					/>
				)}
			/>
			<Controller
				control={control}
				name='title'
				render={({ field }) => (
					<SelectBox
						label='Tiêu đề'
						required={true}
						helperText={errors.title?.message}
						value={field.value}
						onChange={(e) => field.onChange(e.target.value)}
						labelStyle={{ fontSize: "small" }}
						placeholder={""}
					/>
				)}
			/>
		</div>
	);
};

export default CardDetail;
