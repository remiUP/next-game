import { useState } from "react"

const Popup = (props) => {
	const [state, setState] = useState(false);

	return (props.trigger) ? (
		<div className="fixed ">
			<div className="">
				{props.children}
				<button className="">close</button>
			</div>
		</div>
	) : "";
}

export default Popup;