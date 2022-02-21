import Match from './match'
import { useState, useRef, useEffect } from 'react';
import BracketLine from './bracketLine';
import { Matches } from '../../types/matches'
import { History } from '../../types/history'
 
interface Props {
	matches: Matches,
	history: History
}

const Column: React.FC<Props> = ({matches, history}) => {
	const listRef = useRef(null);
	const [columnHeight, setColumnHeight] = useState(0);

	useEffect(() => {
		const updateHeight = () =>{
			setColumnHeight(listRef.current.offsetHeight);
		}
		window.addEventListener('resize', updateHeight);
		updateHeight();
		return () => window.removeEventListener('resize', updateHeight);
	},[])


	return (
		<div className='flex flex-row' ref={listRef}>
			<div className="flex flex-col w-60 h-full justify-around items-center">
				{matches.map((match, index)=> {
					let win :number = 0;
					if (match.length == 2){
						const defWin1 :string = history[match[0]+"all"];
						const defWin2 :string =  history[match[1]+"all"];
						const res :string = history[match[0]+match[1]];
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
			<div className='hidden md:flex flex-col w-4 h-full justify-around'>
				{Array.apply(null, Array(Math.floor(matches.length/2))).map((match,index) =>{
					const height: string = (columnHeight/(2*matches.length)).toString()
					return <div>
						<div className={`w-6`} style={{height: height + 'px'}}>
							<BracketLine reversed={false} hidden={matches[index*2].length<2}></BracketLine>
						</div>
						<div className={`w-6`} style={{height: height + 'px'}}>
							<BracketLine reversed={true} hidden={matches[index*2+1].length<2}></BracketLine>
						</div>
					</div> 
					
				})}
			</div>
		</div>
		
	);
}

export default Column;

