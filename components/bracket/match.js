import Team from './team'
import db from '../firebase/firebaseClient'
import { onSnapshot, doc} from 'firebase/firestore'



const Match = (props) => {
	const clickable = props.win == 0 && !props.players.includes('TBD') && !props.players.includes(undefined);
	console.log(props.players);
	const registerResult = async (winnerID) => {
		let data = {};
		data[`history.${props.players[0]+props.players[1]}`] = props.players[winnerID];
		console.log(data)
		const token = localStorage.getItem("next-game-token");
		if (!token){
			router.push('/');
		}
		const res = await fetch("/api/registerResult",{
			method : 'POST',
			headers: {
				'Content-Type': 'application/json',
			  },
			body: JSON.stringify({
				result : data,
				token : token
			})
		});
	
	}
	
	return (
	<div className={"font-bold flex flex-col w-48" + ` ${props.players.length == 1 ? 'hidden md:invisible md:block' : 'visible'} mb-3 md:mb-0`}>
		<Team state={props.win == 1 ? "won" : (props.win == 2 ? "lost" : "")} clickable={clickable} callback={() => registerResult(0)} player={props.players[0] || "empty"}/>
		<Team state={props.win == 2 ? "won" : (props.win == 1 ? "lost" : "")} clickable={clickable} callback={() => registerResult(1)} player={props.players[1] || "empty"}/>
	</div>
	);
}

export default Match;