import Link from 'next/link'
import db from '../components/firebase/firebaseClient'
import { useEffect, useState } from 'react'
import { onSnapshot, doc} from 'firebase/firestore'
import { useRouter } from 'next/router'



const Home = () => {
	
	const [username, setUsername] = useState("");
	const [id, setId] = useState("");
	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem("next-game-token");
		if (token){
			router.push('/bracket');
		}
	}, [])

	const newBracket = async () =>{
		if (! username){
			alert("Please enter a username");
			return
		}
		const res = await fetch("/api/newBracket",{
			method : 'POST',
			headers: {
				'Content-Type': 'application/json',
			  },
			body: JSON.stringify({
				username : username
			})
		});

		const data = await res.json();
		const token = data.token
		if(!token){
			alert("Unable to create a new bracket");
		}
		else{
			console.log(token);
			localStorage.setItem("next-game-token",token)
			router.push('/bracket');
		}

	}

	const joinBracket = async () =>{
		if (! username){
			alert("Please enter a username");
			return
		}
		if (! id){
			alert("Please enter a bracket id");
			return
		}
		const res = await fetch("/api/joinBracket",{
			method : 'POST',
			headers: {
				'Content-Type': 'application/json',
			  },
			body: JSON.stringify({
				username : username,
				id : id
			})
		});
		console.log(res.status);
		if (res.status == 404){
			alert("Incorrect bracket ID");
			return
		} 
		if (res.status == 403){
			alert("This username is already taken, please choose another one");
			return
		}
		const data = await res.json();
		const token = data.token
		if(!token){
			alert("Unable to create a new bracket");
		}
		else{
			console.log(token);
			localStorage.setItem("next-game-token",token)
			router.push('/bracket');
		}
	}

	const usernameChange = (event) => {
		setUsername(event.target.value)
	}

	const idChange = (event) => {
		setId(event.target.value)
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
						<input onChange={usernameChange} type="text" placeholder="Username" className="m-4 shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline my-5" />
					</div>
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
						<input onChange={idChange} type="text" placeholder="Room code" className="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline my-5" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home