import Link from 'next/link'
import Popup from '../components/popup'
import db from '../components/firebase/firebaseClient'
import { useEffect } from 'react'
import { onSnapshot, doc} from 'firebase/firestore'




const Home = () => {

	const newBracket = async () =>{
		const res = await fetch("/api/new");
		const data = await res.json();
		if(!data){
			alert("Unable to create a new bracket");
		}
		console.log(data)
	}

	const joinBracket = async () =>{
		
	}

	// useEffect(()=>{
	// 	onSnapshot(doc(db,"brackets","test"),(snapshot)=>{
	// 		console.log(snapshot.data());
	// 	});
	// })

	return (
		<div className="px-8 mt-10">
			<head>
				<title>Simple bracket creation tool</title>
			</head>

			<h1 className="md:text-9xl text-gray-100 mt-5 text-center text-6xl">Next Game !</h1>
			<div className="flex h-96 flex-col justify-center mt-5 items-center">
				<div className="w-full max-w-xs">
					<div className="flex justify-center">
						<button onClick={newBracket} className="bg-green-500 hover:bg-green-400 text-white text-4xl py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded my-5">
							New Bracket
						</button>
					</div>
					<div className="flex justify-center">
						<button onClick = {joinBracket} className="bg-blue-500 hover:bg-blue-400 text-white text-4xl py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded my-5">
							Join Bracket
						</button>
					</div>
					<div className="flex justify-center">
						<input type="text" placeholder="Room code" className="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline my-5" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home