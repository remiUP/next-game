import Match from './match'

const Column = ({players}) => {
	const matches = [];
	for (var i = 0; i < players.length; i+= 2){
		matches.push(players.slice(i,i+2));
	}
	return (
		<div className="flex flex-col w-60 h-screen justify-around items-center">
			{matches.map(match => {
				return <Match topPlayer={match[0]} bottomPlayer={match[1]} />
			})}
		</div>
	);
}

export default Column;

