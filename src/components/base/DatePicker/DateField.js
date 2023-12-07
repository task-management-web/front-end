import React from "react";
import "../TextField/TextField";
import clsx from "clsx";
import DatePicker, { registerLocale } from "react-datepicker";
import "./DateField.css";
import vi from "date-fns/locale/vi";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("vi", vi);

const DateField = ({
	required,
	label,
	selected,
	helperText,
	onChange,
	placeholder,
	disabled,
	style,
	labelStyle,
	className,
	hiddenHelperText,
	hasTimeInput,
	minDate,
	maxDate,
	selectsEnd,
	selectsStart,
	inline,
	isClearable,
	open,
	readOnly,
	selectsRange,
}) => {
	return (
		<div className={clsx("text-field", className)} style={style}>
			{label && (
				<div className='label'>
					<span style={labelStyle}>{label}</span>
					{required && <span className='require-text'>*</span>}
				</div>
			)}
			<div className='min-width-fill-available'>
				<DatePicker
					placeholderText={placeholder}
					onChange={onChange}
					selected={selected}
					timeInputLabel='Thời gian:'
					dateFormat={hasTimeInput ? "dd/MM/yyyy h:mm aa" : "dd/MM/yyyy"}
					showTimeInput={hasTimeInput}
					locale='vi'
					minDate={minDate}
					maxDate={maxDate}
					disabled={disabled}
					selectsStart={selectsStart}
					selectsEnd={selectsEnd}
					inline={inline}
					isClearable={isClearable}
					open={open}
					readOnly={readOnly}
					selectsRange={selectsRange}
				/>
				<div className={clsx("helper-text", hiddenHelperText ? "hidden" : "")}>
					{helperText}
				</div>
			</div>
		</div>
	);
};

export default DateField;
