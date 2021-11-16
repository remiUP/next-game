
const Match = (props) => {
	if (props.players.length == 1){
		var visibility = " invisible";
	}
	else{
		var visibility = " visible"
	}
	

	return (
	<div className={"font-semibold flex flex-col w-48" + visibility}>
		<div className={`text-lg mb-2 p-2 flex flex-row justify-between ${props.win == 1 ? 'bg-green-500' : ( props.win == 2 ? 'bg-gray-500' : 'bg-gray-200')}`}>
			<h1>{props.players[0] || "empty"}</h1>
		</div>
		<div className={`text-lg p-2 flex flex-row justify-between ${props.win == 2 ? 'bg-green-500' : ( props.win == 1 ? 'bg-gray-500' : 'bg-gray-200')}`}>
			<h1>{props.players[1] || "empty"}</h1>
		</div>
	</div>
	);
}

export default Match;