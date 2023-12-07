import Popup from "reactjs-popup";

const ConfirmDialog = ({
	open,
	onClickNo,
	onClickYes,
	title,
	clickNo = "Huỷ",
	clickYes = "Đồng ý",
}) => {
	return (
		<Popup open={open}>
			<div className='p-8 w-[500px]'>
				<p>{title}</p>
				<br />
				<div className='flex justify-end gap-2'>
					<button className='stroke-button w-[100px]' onClick={onClickNo}>
						{clickNo}
					</button>
					<button className='fill-button w-[100px]' onClick={onClickYes}>
						{clickYes}
					</button>
				</div>
			</div>
		</Popup>
	);
};

export default ConfirmDialog;
