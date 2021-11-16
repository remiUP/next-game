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

	const playersTest = [
		"test 1",
		"test 2",
		"test 3",
		"test 4",
		"test 5",
		"test 6",
		"test 7",
	]

	const historyTest = {
		"test 1test 5":"test 1",
		"test 2test 6":"test 6",
		"test 1test 6":"test 6",
		"test 3test 7":"test 3"
	}

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

	return <div className="flex w-screen h-screen justify-center">
		<Bracket players={players} history={history}/>
		<button onClick={leaveBracket} className="bg-red-500 hover:bg-red-400 text-white text-4xl py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded my-5">
			Leave
		</button>
	</div>
}

export default bracket_page;