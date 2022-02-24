import { useEffect, useState, useRef } from 'react'



const Sidebar = (props:{children:JSX.Element|JSX.Element[]}) => {
	const [open, setOpen] = useState(true);
	const bar = useRef(null);

	return (
		<div className='flex-none'>
			<div className={`flex flex-col bg-gray-600 fixed h-full w-${open ? '1/5' : '1/12'} box-border`} ref={bar}>
				<button onClick={() => setOpen(!open)} className="text-white p-4">{open ? 'X' : 'O'}</button>
				{open && props.children}
			</div>
			<div className={`flex flex-col h-full float-left w-${open ? '1/5' : '1/12'} invisible box-border`} >
				<button onClick={() => setOpen(!open)} className="text-white p-4">{open ? 'X' : 'O'}</button>
					{open && props.children}
			</div>
		</div>
	)
}

export default Sidebar;