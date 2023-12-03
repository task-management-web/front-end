import React from "react";
import "./TextField.css";
import clsx from "clsx";

const TextField = ({
	required,
	label,
	value,
	helperText,
	onChange,
	placeholder,
	disabled,
	readOnly,
	style,
	labelStyle,
	inputStyle,
	type = "text",
	className,
	isMultiLine,
	hiddenHelperText,
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
				{!isMultiLine ? (
					<input
						placeholder={placeholder}
						value={value}
						onChange={onChange}
						disabled={disabled}
						readOnly={readOnly}
						style={inputStyle}
						className={helperText ? "error-input" : ""}
						type={type}
					/>
				) : (
					<textarea
						placeholder={placeholder}
						value={value}
						onChange={onChange}
						disabled={disabled}
						readOnly={readOnly}
						style={inputStyle}
						className={helperText ? "error-input" : ""}
					/>
				)}
				<div className={clsx("helper-text", hiddenHelperText ? "hidden" : "")}>
					{helperText}
				</div>
			</div>
		</div>
	);
};

export default TextField;
