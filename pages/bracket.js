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

	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem("next-game-token");
		if (!token){
			router.push('/');
		}
		const claim = JSON.parse(atob(token.split('.')[1]))
		console.log(token)
		return onSnapshot(doc(db,"brackets",claim.id),(snapshot)=>{
			const data = snapshot.data();
			console.log(data);
			setPlayers(data.players);
			setHistory(data.history);
		});
	}, [])

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

	return <div className="flex w-screen h-screen md:justify-between md:flex-row flex-col">
		<div>
			<Bracket players={players} history={history}/>
		</div>
		
		<div>
			<button onClick={leaveBracket} className="md:mr-5 bg-red-500 hover:bg-red-400 
			text-white text-4xl py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded my-5">
				Leave
			</button>
		</div>
		
	</div>
}

export default bracket_page;