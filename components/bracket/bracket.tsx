import db from '../firebase/firebaseClient'
import { onSnapshot, doc} from 'firebase/firestore'
import Column from './column'
import { Matches } from '../../types/matches'
import { Match } from '../../types/match'
import { History } from '../../types/history'

import styles from '../styles/scrollbar.module.css'

const getFirstColumn = (players: string[]): Matches => {
	const matches: Matches = [];
	if(!players.length) return [];
	const branch = (parent,stage) => [parent, Math.pow(2,stage)-parent-1];
	const stage = (depth:number):number[] => {
		// console.log(depth);
		if(depth==0)return [0];
		var res = [];
		for(const i of stage(depth-1)){
			res = res.concat(branch(i,depth));
		}
		return res;
	}
	const apply = (ids:number[], players:string[]):string[] => {
		return ids.map((id)=>id<players.length ? players[id] : null );
	}
	const group = (players:string[]):Matches =>{
		var matches: Matches = [];
		for(var i=0; i < Math.floor(players.length/2); i++){
			var match: Match = [players[2*i],players[2*i+1]].filter((n) => {return n!==null});
			matches.push(match);
		}
		console.log(matches);
		return matches.reverse();//.sort((a,b)=>b.length-a.length);
	}
	const stg = Math.floor(Math.log2(players.length)%1 === 0 ? Math.log2(players.length) : Math.log2(players.length)+1);
	return group(apply(stage(stg),players));
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
	return <div className={"flex flex-col md:flex-row h-full w-full overflow-scroll"+styles.scrollbar}>
		<Column matches={firstMatches} history={history}/>
		{numberColumn < 0 ? "" : [...Array(numberColumn)].map(() => {
			previousMatches = getNextColumn(previousMatches,history);
			return <Column matches={previousMatches} history={history}/>;
		})}
	</div>
}

export default Bracket;