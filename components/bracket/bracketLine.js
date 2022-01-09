const BracketLine = ({ reversed , hidden }) => {
	return (
	<div className="flex flex-row h-full w-full">
		<div className={`w-full h-full border-solid border-r-2 border-white 
						${hidden  ? 'hidden md:invisible md:block' : 'visible'}
						${reversed ? 'border-b-2' : 'border-t-2'}`}>
		</div>
		<div className={`w-full h-full border-solid border-white 
						${hidden ? 'hidden md:invisible md:block' : 'visible'}
						${reversed ? 'border-t-2' : 'border-b-2'}`}>
		</div>
	</div>
	)
}

export default BracketLine;