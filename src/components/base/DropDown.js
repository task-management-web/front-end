import React, { Fragment } from "react";
import clsx from "clsx";
import { Menu, Transition } from "@headlessui/react";

function DropDown({
	buttonElement,
	itemsElement,
	classNameButton,
	classNameItems,
}) {
	return (
		<div className='relative w-fit h-fit'>
			<Menu>
				<Menu.Button className={clsx("py-1 px-2 rounded-md", classNameButton)}>
					{buttonElement}
				</Menu.Button>
				<Transition
					as={Fragment}
					enter='transition ease-out duration-100'
					enterFrom='transform opacity-0 scale-95'
					enterTo='transform opacity-100 scale-100'
					leave='transition ease-in duration-75'
					leaveTo='transform opacity-0 scale-95'
				>
					<Menu.Items
						className={clsx(
							"z-10 bg-white absolute right-0 w-56 mt-2 origin-top-right rounded-md shadow-sm ring-2 ring-black ring-opacity-5 focus:outline-none",
							classNameItems
						)}
					>
						{itemsElement}
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	);
}

export default DropDown;
