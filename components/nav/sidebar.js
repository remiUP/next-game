import { useEffect, useState } from 'react'

export default function Sidebar(props) {
	const [open, setOpen] = useState(true);

	return (
		<div className="flex flex-col bg-gray-600 ">
			<button onClick={() => setOpen(!open)} className="text-white p-4">{open ? 'X' : 'O'}</button>
			{open && props.children}
		</div>
	)
}
