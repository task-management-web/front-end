import React from "react";
import TextField from "./base/TextField/TextField";
import * as yup from "yup";

const Schema = yup.object().shape({
	title: yup.string().required("Bạn chưa nhập tiêu đề"),
	description: yup.string(),
});

const AddBoard = () => {
	return (
		<div className='w-[60vw] px-8 pb-4 pt-0'>
			<div className='grid gap-3'>
				<TextField label={"Tiêu đề"} required />
				<TextField label={"Mô tả"} isMultiLine />
				<TextField />
			</div>
		</div>
	);
};

export default AddBoard;
