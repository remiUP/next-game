import { useState } from "react";
import Button from "./button";
import { ButtonSize, ButtonColor } from "../styles/nav/buttonStyle";

interface Props {
	players:string[]
}

const AddNewPlayer:React.FC<Props> = ({players}) => {
	const [player, setPlayer] = useState<string>("");
	
	const addPlayer = async () =>{
		setPlayer('');
		console.log("Randomizing bracket");
		const res = await fetch("/api/changePlayers",{
			method : 'POST',
			headers: {
				'Content-Type': 'application/json',
			  },
			body: JSON.stringify({token : localStorage.getItem("next-game-token"), players : players.concat([player])})
		});
	}

	const playerChange = (event) => {setPlayer(event.target.value)}; 
	const playerEnter = (event) => {
		if (event.key === "Enter"){
			addPlayer();
		}
	}

	return(
		<div className="flex flex-col items-center border-b-2 border-gray-800 mx-2">
			<h1 className="text-2xl text-white font-semibold mt-2">Add player manually</h1>
			<input type="text" onChange={playerChange} onKeyDown={(e)=>void(0)} className="m-4 shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline my-5"/>
			<Button callback={addPlayer} color={ButtonColor.blue} size={ButtonSize.md}>Add</Button>
		</div>
	)
}

export default AddNewPlayer;