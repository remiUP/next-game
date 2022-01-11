import db from '../components/firebase/firebaseClient'
import { useEffect, useState } from 'react'
import { onSnapshot, doc} from 'firebase/firestore'
import Column from '../components/bracket/column'
import Bracket from '../components/bracket/bracket'
import jwt from "jsonwebtoken";
import { useRouter } from 'next/router'

const bracket_page = () => {
	const [players, setPlayers] = useState([]);
	const [history, setHistory] = useState({});
	const [roomId, setRoomId] = useState('');
	const [admin, setAdmin] = useState(false);

	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem("next-game-token");
		if (!token){
			router.push('/');
		}
		const claim = JSON.parse(atob(token.split('.')[1]))
		console.log(token)
		console.log(claim);
		return onSnapshot(doc(db,"brackets",claim.id),(snapshot)=>{
			const data = snapshot.data();
			console.log(data);
			setPlayers(data.players);
			setHistory(data.history);
			setRoomId(claim.id);
			setAdmin(claim.admin);
		});
	}, [])

	console.log(admin);

	const leaveBracket = async () =>{
		console.log("Leaving bracket");
		// TODO : clean leave with server
		const res = await fetch("/api/leaveBracket",{
			method : 'POST',
			headers: {
				'Content-Type': 'application/json',
			  },
			body: JSON.stringify({token : localStorage.getItem("next-game-token")})
		});
		localStorage.removeItem('next-game-token');
		router.push('/');
	}

	return <div className="flex w-screen min-h-screen md:justify-between md:flex-row flex-col">
		<div>
			<Bracket players={players} history={history}/>
		</div>
		<div className='flex flex-col align-bottom'>
			<h1 className='text-gray-800 font-bold text-lg p-2 m-5 bg-white'>{roomId}</h1>
			<h1 className={`${ admin ? '' : 'hidden' } font-bold text-white p-2 mx-5 text-center border-green-500 border-2`}>You are the admin</h1>
			<button onClick={leaveBracket} className="md:mr-5 bg-red-500 hover:bg-red-400 
			text-white text-4xl py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded my-5">
				Leave
			</button>
		</div>
	</div>
}

export default bracket_page;