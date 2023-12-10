/** @format */

import React from 'react';
import './TextField/TextField.css';
import clsx from 'clsx';
import Select from 'react-select';

const SelectBox = ({
	required,
	label,
	value,
	helperText,
	onChange,
	placeholder,
	disabled,
	style,
	labelStyle,
	className,
	hiddenHelperText,
	options,
	getOptionLabel,
	getOptionValue,
	isMulti,
}) => {
	return (
		<div
			className={clsx('text-field', className)}
			style={style}>
			{label && (
				<div className='label'>
					<span style={labelStyle}>{label}</span>
					{required && <span className='require-text'>*</span>}
				</div>
			)}
			<div className='min-width-fill-available'>
				<Select
					classNamePrefix={'select-box'}
					isMulti={isMulti}
					options={options}
					placeholder={placeholder}
					value={options.filter((e) => e.value === value)}
					onChange={onChange}
					getOptionLabel={getOptionLabel}
					getOptionValue={getOptionValue}
					isDisabled={disabled}
				/>

				<div className={clsx('helper-text', hiddenHelperText ? 'hidden' : '')}>
					{helperText}
				</div>
			</div>
		</div>
	);
};

export default SelectBox;
