import Team from './team'

const Match = (props) => {
	const clickable = props.win == 0 && !props.players.includes('TBD');
	return (
	<div className={"font-semibold flex flex-col w-48" + ` ${props.players.length == 1 ? 'hidden md:invisible md:block' : 'visible'}`}>
		<Team state={props.win == 1 ? "won" : (props.win == 2 ? "lost" : "")} clickable={clickable} callback={props.upperCallback} player={props.players[0] || "empty"}/>
		<Team state={props.win == 2 ? "won" : (props.win == 1 ? "lost" : "")} clickable={clickable} callback={props.lowerCallback} player={props.players[1] || "empty"}/>
	</div>
	);
}

export default Match;