import { useEffect, useState, useRef } from 'react'



const Sidebar = (props:{children:JSX.Element|JSX.Element[]}) => {
	const [open, setOpen] = useState(true);
	const bar = useRef(null);

	return (
		<div className='flex-none'>
			<div className={`flex flex-col bg-gray-600 h-full overflow-y-scroll w-${open ? '1/5' : '1/12'} box-border items-center border-l-2 border-gray-900`} ref={bar}>
				<button onClick={() => setOpen(!open)} className="text-white p-4">
					{
						!open ?
						<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M8.34923 4.24075C7.9299 4.60017 7.88134 5.23147 8.24076 5.65079L13.6829 12L8.24076 18.3492C7.88134 18.7685 7.9299 19.3998 8.34923 19.7593C8.76855 20.1187 9.39985 20.0701 9.75927 19.6508L15.7593 12.6508C16.0803 12.2763 16.0803 11.7237 15.7593 11.3492L9.75927 4.34921C9.39985 3.92989 8.76855 3.88132 8.34923 4.24075Z" fill="#000000"/>
						</svg>
						:
						<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M15.6508 4.24075C16.0701 4.60017 16.1187 5.23147 15.7593 5.65079L10.3171 12L15.7593 18.3492C16.1187 18.7685 16.0701 19.3998 15.6508 19.7593C15.2315 20.1187 14.6002 20.0701 14.2407 19.6508L8.24074 12.6508C7.91975 12.2763 7.91975 11.7237 8.24074 11.3492L14.2407 4.34921C14.6002 3.92989 15.2315 3.88132 15.6508 4.24075Z" fill="#000000"/>
						</svg>
					}
				</button>
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