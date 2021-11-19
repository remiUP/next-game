import Match from './match'

const Column = ({matches, history}) => {
	return (
		<div className="flex flex-col w-60 h-full justify-around items-center">
			{matches.map(match => {
				if (match.length == 2){
					const res = history[match[0]+match[1]];
					if (res){
						if (match[0] == res){
							return <Match players={match} win={1}/>
						}
						else{
							return <Match players={match} win={2}/>
						}
					}
				}
				return <Match players={match} win={0}/>
			})}
		</div>
	);
}

export default Column;

