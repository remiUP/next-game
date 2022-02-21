import db from '../components/firebase/firebaseClient'
import { useEffect, useState } from 'react'
import { onSnapshot, doc} from 'firebase/firestore'
import Column from '../components/bracket/column'
import Bracket from '../components/bracket/bracket'
import jwt from "jsonwebtoken";
import { useRouter } from 'next/router'
import Navbar from '../components/nav/navbar'
import Button from '../components/nav/button'
import Sidebar from '../components/nav/sidebar'

import { History } from '../types/history'


const bracket_page = () => {
	const [players, setPlayers] = useState<string[]>([]);
	const [history, setHistory] = useState<History>({});
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
			if (data){
				setPlayers(data.players);
				setHistory(data.history);
				setRoomId(claim.id);
				setAdmin(claim.admin);
			}
		});
	}, [])

	console.log(admin);

	const leaveBracket = async () =>{
		console.log("Leaving bracket");
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

	return (
	<div>
		<Navbar>
			<h1 className='text-white text-4xl px-6'>Next game !</h1>
			<div className='flex flex-row items-center'>
				<h1 className='text-gray-800 font-bold text-lg p-2 m-5 bg-white'>{roomId}</h1>
				<Button callback={leaveBracket} color='red' text='Leave'/>
			</div>
		</Navbar>
		<div className='flex flex-row pt-24'>
			<Sidebar className={`${admin ? '' : 'hidden'} fixed`}>
				<h1 className={`${ admin ? '' : 'hidden' } font-bold text-white p-2 mx-5 text-center border-green-500 border-2`}>You are the admin</h1>
			</Sidebar>
			<div className="flex w-screen min-h-screen md:justify-between md:flex-row flex-col mt-4">
				<div>
					<Bracket players={players} history={history}/>
				</div>
			</div>
		</div>
		
	</div>
	)
}

export default bracket_page;