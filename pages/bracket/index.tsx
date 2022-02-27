import db from '../../components/firebase/firebaseClient'
import { useEffect, useState } from 'react'
import { onSnapshot, doc} from 'firebase/firestore'
import Bracket from '../../components/bracket/bracket'
import { useRouter } from 'next/router'
import Navbar from '../../components/nav/navbar'
import Button from '../../components/nav/button'
import { ButtonSize, ButtonColor } from '../../components/styles/nav/buttonStyle'
import Sidebar from '../../components/nav/sidebar'
import PlayerSeedingTable from '../../components/nav/playerSeedingTable'
import AddNewPlayer from '../../components/nav/addNewPlayer'

import { History } from '../../types/history'
import localToken from '../../types/tokens/localToken'
import tokenType from '../../types/tokens/tokenType'


const Bracket_page = () => {
	const [players, setPlayers] = useState<string[]>([]);
	const [history, setHistory] = useState<History>({});
	const [roomId, setRoomId] = useState('');
	const [admin, setAdmin] = useState(false);
	const [localTokenType, setLocalTokenType] = useState<tokenType>(undefined);

	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem("next-game-token");
		if (!token){
			router.push('/');
		}
		const claim:localToken = JSON.parse(atob(token.split('.')[1]))
		console.log(token)
		console.log(claim);
		setRoomId(claim.id);
		setAdmin(claim.admin);
		setLocalTokenType(claim.type);
		return onSnapshot(doc(db,"brackets",claim.id),(snapshot)=>{
			const data = snapshot.data();
			console.log(data);
			if (data){
				setPlayers(data.players);
				setHistory(data.history);
			}
		});
	}, [])

	// console.log(admin);

	const leaveBracket = async () =>{
		console.log("Leaving bracket");
		if(localTokenType==tokenType.Player || admin){
			const res = await fetch("/api/leaveBracket",{
				method : 'POST',
				headers: {
					'Content-Type': 'application/json',
				  },
				body: JSON.stringify({token : localStorage.getItem("next-game-token")})
			});
		}
		localStorage.removeItem('next-game-token');
		router.push('/');
	}

	const resetBracket = async () => {
		console.log("Reseting bracket");
		const res = await fetch("/api/resetBracket",{
			method : 'POST',
			headers: {
				'Content-Type': 'application/json',
			  },
			body: JSON.stringify({token : localStorage.getItem("next-game-token")})
		});
	}

	const randomizeBracket = async () => {
		console.log("Randomizing bracket");
		const res = await fetch("/api/randomizeBracket",{
			method : 'POST',
			headers: {
				'Content-Type': 'application/json',
			  },
			body: JSON.stringify({token : localStorage.getItem("next-game-token")})
		});
	}



	return (
	<div className='bg-gray-800'>
		<Navbar>
			<h1 className='text-white text-4xl px-6'>Next game !</h1>
			<div className='flex flex-row items-center mr-5'>
				<Button callback={()=>navigator.clipboard.writeText(`${window.location.href}/${roomId}`)} color={ButtonColor.purple} size={ButtonSize.sm}>copy link</Button>
				<h1 className='text-gray-800 font-bold text-lg p-2 m-5 bg-white'>{roomId}</h1>
				<Button callback={leaveBracket}  color={ButtonColor.red} size={ButtonSize.lg}>Leave</Button>
			</div>
		</Navbar>
		<div className='flex flex-row pt-24 bg-gray-800'>
			{(admin||localTokenType==tokenType.Player)&&
			<Sidebar>
				{ admin &&
				<>
				<h1 className={"font-bold text-white p-2 mx-5 mb-5 text-center border-green-500 border-2"}>You are the admin</h1>
				<PlayerSeedingTable players={players}/>
				<AddNewPlayer players={players}/>
				<Button callback={randomizeBracket} color={ButtonColor.blue} size={ButtonSize.md}>Randomize</Button>
				<Button callback={resetBracket} color={ButtonColor.red} size={ButtonSize.md} >Reset Bracket</Button>
				</>
				}
			</Sidebar>}
			<div className="flex w-screen min-h-screen md:justify-between md:flex-row flex-col mt-4">
				<div>
					<Bracket players={players} history={history}/>
				</div>
			</div>
		</div>
		
	</div>
	)
}

export default Bracket_page;