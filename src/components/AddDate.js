import React, { useState } from "react";
import DateField from "./base/DatePicker/DateField";
import DatePicker, { registerLocale } from "react-datepicker";
import vi from "date-fns/locale/vi";
import "react-datepicker/dist/react-datepicker.css";
import Checkbox from "./base/Checkbox";

registerLocale("vi", vi);

const AddDate = ({ date }) => {
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	const [hasStartDate, setHasStartDate] = useState(false);
	const [hasEndDate, setHasEndDate] = useState(false);
	const onChange = (dates) => {
		console.log(dates);
		const [start, end] = dates;
		setStartDate(start);
		setEndDate(end);
	};

	return (
		<>
			<div className='flex justify-between gap-2 px-8 p-2'>
				<div className='font-semibold text-center w-full'>Ngày</div>
			</div>
			<div className='px-5'>
				{hasStartDate && hasEndDate && (
					<DatePicker
						selected={startDate}
						onChange={onChange}
						startDate={startDate}
						endDate={endDate}
						selectsRange
						inline
					/>
				)}
				{hasStartDate && !hasEndDate && (
					<DatePicker
						selected={startDate}
						onChange={(date) => setStartDate(date)}
						inline
					/>
				)}
				{!hasStartDate && hasEndDate && (
					<DatePicker
						selected={endDate}
						onChange={(date) => setEndDate(date)}
						inline
					/>
				)}
				{!hasStartDate && !hasEndDate && <DatePicker readOnly inline />}
				<div className='flex gap-3'>
					<Checkbox
						className={"h-[84px]"}
						checked={hasStartDate}
						onChange={(e) => {
							setHasStartDate(e.target.checked);
							if (!e.target.checked) setStartDate(undefined);
						}}
					/>
					<DateField
						label={"Ngày bắt đầu"}
						selected={startDate}
						onChange={(date) => {
							setStartDate(date);
							if (!date && hasEndDate && hasStartDate) setEndDate(null);
						}}
						selectsStart
						startDate={startDate}
						endDate={endDate}
						open={false}
						isClearable
						labelStyle={{ fontSize: "small" }}
						placeholder={"dd/mm/yyyy"}
						readOnly={!hasStartDate}
					/>
				</div>
				<div className='flex gap-3'>
					<Checkbox
						className={"h-[84px]"}
						checked={hasEndDate}
						onChange={(e) => {
							setHasEndDate(e.target.checked);
							if (!e.target.checked) setEndDate(null);
						}}
					/>
					<DateField
						label={"Ngày tới hạn"}
						selected={endDate}
						onChange={(date) => setEndDate(date)}
						selectsEnd
						startDate={startDate}
						endDate={endDate}
						minDate={startDate}
						open={false}
						isClearable
						placeholder={"dd/mm/yyyy"}
					/>
				</div>
			</div>
		</>
	);
};

export default AddDate;
