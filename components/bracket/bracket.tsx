import db from '../firebase/firebaseClient'
import { onSnapshot, doc} from 'firebase/firestore'
import Column from './column'
import { Matches } from '../../types/matches'
import { History } from '../../types/history'


const getFirstColumn = (players: string[]): Matches => {
	const nearest: number = Math.pow(2,Math.ceil(Math.log2(players.length)))/2;
	const matches: Matches = [];
	for (var i = 0; i < nearest; i++){
		matches.push([players[i]]);
	}
	for (var i = nearest; i < players.length; i++){
		matches[2*nearest-i-1].push(players[i]);
	}
	return matches.reverse();
}

const getNextColumn = (previousMatches: Matches, history: History): Matches => {
	var nextMatches: Matches = []
	previousMatches.forEach((match, index) => {
		let next: string = "";
		if (match.length == 2){
			const defWin1: string = history[match[0]+"all"];
			const defWin2: string = history[match[1]+"all"];
			if (defWin1){
				next = match[1];
			}
			else if (defWin2){
				next = match[0]
			}
			else{
				const result: string = history[match[0]+match[1]];
				if( result ){
					next = result;
				}
				else{
					next = "TBD"
				}
			}
		}
		else if (match.length == 1){
			next = match[0];
		}
		else{
			alert("Empty match, there is an error somewhere");
		}
		if (index%2==0){
			nextMatches.push([next]);
		}
		else{
			nextMatches[nextMatches.length-1].push(next)
		}
	})
	return nextMatches;
}

interface Props {
	players: string[],
	history: History
}

const Bracket: React.FC<Props>= ({players, history}) => {
	const firstMatches: Matches = getFirstColumn(players);
	const numberColumn: number = Math.ceil(Math.log2(players.length))-1;
	var previousMatches: Matches = firstMatches;
	return <div className="flex flex-col md:flex-row h-full">
		<Column matches={firstMatches} history={history}/>
		{numberColumn < 0 ? "" : [...Array(numberColumn)].map(() => {
			previousMatches = getNextColumn(previousMatches,history);
			return <Column matches={previousMatches} history={history}/>;
		})}
	</div>
}

export default Bracket;