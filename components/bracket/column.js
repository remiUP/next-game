import Match from './match'

const Column = ({matches, history}) => {
	return (
		<div className="flex flex-col w-60 h-full justify-around items-center">
			{matches.map(match => {
				let win = 0;
				if (match.length == 2){
					const defWin1 = history[match[0]+"all"];
					const defWin2 =  history[match[1]+"all"];
					const res = history[match[0]+match[1]];
					if (defWin1){
						win = 2;
					}
					else if (defWin2){
						win = 1;
					}
					else if (res){
						if (match[0] == res){
							win = 1;
						}
						else{
							win = 2;
						}
					}
				}
				return <Match players={match} win={win}/>
			})}
		</div>
	);
}

export default Column;

