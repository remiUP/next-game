import Team from './team'
import db from '../firebase/firebaseClient'
import { onSnapshot, doc} from 'firebase/firestore'
import router from 'next/router';


interface Props {
	players: string[],
	win: number
}

const Match: React.FC<Props> = (props) => {
	const token = localStorage.getItem("next-game-token");
	const admin = JSON.parse(atob(token.split('.')[1])).admin
	const clickable = props.win == 0 && !props.players.includes('TBD') && !props.players.includes(undefined) && admin;
	// console.log(props.players);
	const registerResult = async (winnerID) => {
		let data = {};
		data[`history.${props.players[0]+props.players[1]}`] = props.players[winnerID];
		console.log(data)
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
		<div className={"font-bold flex flex-col w-48 border-l-4 border-blue-700 " + ` ${props.players.length == 1 ? 'hidden md:invisible md:block' : 'visible'} mb-3 md:mb-0`}>
			<Team state={props.win == 1 ? "won" : (props.win == 2 ? "lost" : "")} clickable={clickable} callback={() => registerResult(0)} player={props.players[0] || "⠀"}/>
			<Team state={props.win == 2 ? "won" : (props.win == 1 ? "lost" : "")} clickable={clickable} callback={() => registerResult(1)} player={props.players[1] || "⠀"} bottom={true}/>
		</div>
	);
}

export default Match;