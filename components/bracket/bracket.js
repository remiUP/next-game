import db from '../firebase/firebaseClient'
import { onSnapshot, doc} from 'firebase/firestore'
import Column from './column'

const getFirstColumn = (players) => {
	const nearest = Math.pow(2,Math.ceil(Math.log2(players.length)))/2;
	const matches = [];
	for (var i = 0; i < nearest; i++){
		matches.push([players[i]]);
	}
	for (var i = nearest; i < players.length; i++){
		matches[i-nearest].push(players[i]);
	}
	return matches
}

const getNextColumn = (previousMatches, history) => {
	var nextMatches = []
	previousMatches.forEach((match, index) => {
		let next = "";
		if (match.length == 2){
			const result = history[match[0]+match[1]];
			if( result ){
				next = result;
			}
			else{
				next = "TBD"
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

const Bracket = ({players, history}) => {
	const firstMatches = getFirstColumn(players);
	console.log(firstMatches)
	const numberColumn = Math.ceil(Math.log2(players.length))-1;
	var previousMatches = firstMatches;
	return <div className="flex">
		<Column matches={firstMatches} history={history}/>
		{[...Array(numberColumn)].map(() => {
			previousMatches = getNextColumn(previousMatches,history);
			return <Column matches={previousMatches} history={history} />;
		})}
	</div>
}

export default Bracket;