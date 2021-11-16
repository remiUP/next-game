import db from '../components/firebase/firebaseClient'
import { useEffect, useState } from 'react'
import { onSnapshot, doc} from 'firebase/firestore'
import Column from '../components/bracket/column'

const getFirstColumn = (players) => {
	const nearest = Math.pow(2,Math.ceil(Math.log2(players.length)));
	const gaps = nearest - players.length;
	const matches = [];
	const stop = players.length == nearest ? nearest : nearest - 1;
	for (var i = 0; i < stop; i++){
		if (i<(players.length-gaps+2)){
			if (i%2==0){
				matches.push([players[i]]);
			}
			else{
				matches[Math.floor(i/2)].push(players[i]);
			}
		}
		else{
			matches.push([players[i]]);
		}
	}
	return matches
}

const getNextColumn = (previousMatches, history) => {

}

const Bracket = () => {
	const players = [
		"test 1",
		"test 2",
		"test 3",
		"test 4",
		"test 5",
		"test 6",
		"test 7",
	]

	const firstMatches = getFirstColumn(players);
	console.log(firstMatches)
	return <div className="flex w-full">
		<Column matches={firstMatches} />
		<Column matches={firstMatches.slice(0,2)} />
		<Column matches={firstMatches.slice(0,1)} />
	</div>
}

export default Bracket;