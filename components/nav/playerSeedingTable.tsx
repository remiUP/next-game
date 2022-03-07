import { FC, useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import Button from './button';
import { ButtonColor, ButtonSize } from '../styles/nav/buttonStyle'

interface ItemType {
  id: number;
  player: string;
}

interface Props {
	players: string[];
}

const PlayerSeedingTable: FC<Props> = ({players}) => {
	const [playerItems, setPlayerItems] = useState<ItemType[]>([]);
	
	useEffect(() => {
		const newList: ItemType[] = players.map((item:string,index:number) => ({id:index, player:item}));
		setPlayerItems(newList);
	}, [players]);

	const changePlayers = async ()=>{
		console.log("Randomizing bracket");
		const res = await fetch("/api/changePlayers",{
			method : 'POST',
			headers: {
				'Content-Type': 'application/json',
			  },
			body: JSON.stringify({token : localStorage.getItem("next-game-token"), players : playerItems.map(item=>item.player)})
		});
	}

	const deletePlayerUtil = (player:string) =>{
		return ()=>deletePlayer(player);
	}

	const deletePlayer = async (player:string) =>{
		console.log("Deleting "+ player);
		const res = await fetch("/api/changePlayers",{
			method : 'POST',
			headers: {
				'Content-Type': 'application/json',
			  },
			body: JSON.stringify({token : localStorage.getItem("next-game-token"), players : playerItems.map(item=>item.player).filter((e)=>e!==player)})
		});
	}

	return (
		<div className="flex flex-col items-center border-t-2 border-b-2 border-gray-800">
			<h1 className="text-3xl text-white font-semibold mt-2">Seeding</h1>
			<ReactSortable list={playerItems} setList={setPlayerItems} animation={150} ghostClass='blue-background-class' className="flex flex-col w-52 mx-2 my-4">
				{playerItems.map((item) => (
					<div key={item.id} className="text-white text-2xl font-semibold bg-gray-700 px-2 py-1 border-2 border-gray-900 m-1 flex flex-row justify-between">
						<h1>{item.player}</h1>
						<button onClick={()=>deletePlayer(item.player)}>X</button>
					</div>
				))}
			</ReactSortable>
			<Button callback={changePlayers} color={ButtonColor.blue} size={ButtonSize.md}>Apply</Button>
		</div>
	);
};


export default PlayerSeedingTable;