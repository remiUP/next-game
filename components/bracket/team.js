
const Team = (props) => {
	
	return (
		<div className={`text-lg p-2 flex flex-row justify-between ${props.bottom ? '' :'mb-2'}
						${props.state == "won" ? 'bg-green-500' : ( props.state == "lost" ? 'bg-gray-500' : 'bg-gray-200')}
						${props.clickable ? 'hover:bg-green-500 hover:scale-110 transition duration-100 ease-in-out hover:text-white' : ""}
						${props.player=='TBD' ? 'text-gray-400' : ''}`}
			onClick={props.clickable ? props.callback : void(0)}>
			<h1>{props.player || "⠀"}</h1>
		</div>
	);
}
export default Team;
