import Match from './match'

const Column = ({matches}) => {
	return (
		<div className="flex flex-col w-60 h-screen justify-around items-center">
			{matches.map(match => {
				return <Match players={match} />
			})}
		</div>
	);
}

export default Column;

