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
}) => {
	return (
		<div className={clsx("text-field", className)} style={style}>
			{label && (
				<div className='label'>
					<span style={labelStyle}>{label}</span>
					{required && <span className='require-text'>*</span>}
				</div>
			)}
			<div>
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
				<div className='helper-text'>{helperText}</div>
			</div>
		</div>
	);
};

export default TextField;
