
const Match = (props) => {
	return (
	<div className="font-semibold flex flex-col w-48 ">
		<div className={`text-lg p-2 flex flex-row justify-between ${props.topWon ? 'bg-green-500' : ( props.bottomWon ? 'bg-gray-500' : 'bg-gray-200')}`}>
			<h1>{props.topPlayer}</h1>
			<h1>{props.topScore}</h1>
		</div>
		<div className={`text-lg p-2 flex flex-row justify-between ${props.bottomWon ? 'bg-green-500' : ( props.topWon ? 'bg-gray-500' : 'bg-gray-200')}`}>
			<h1>{props.bottomPlayer}</h1>
			<h1>{props.bottomScore}</h1>
		</div>
	</div>
	);
}

export default Match;