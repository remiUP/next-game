import { ReactChild } from "react";
import Button from "./button";

const Navbar = (props:{children:JSX.Element|JSX.Element[]}) => {
	return(
		<div className={`flex flex-row justify-between items-center bg-gray-600 border-b-2 border-gray-900 fixed top-0 inset-x-0 h-24`}>
			{props.children}
		</div>
	)
}

export default Navbar;