import React from "react";
import clsx from "clsx";

function Checkbox({ checked, className, onChange, disabled }) {
	return (
		<input
			className={clsx(
				"w-4 h-4 rounded-xl accent-[#f2789f] text-white",
				className
			)}
			type='checkbox'
			checked={checked}
			onChange={onChange}
			disabled={disabled}
			style={{ outline: "none" }}
		/>
	);
}

export default Checkbox;
