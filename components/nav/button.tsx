interface Props {
	callback: ()=>void,
	color: string,
	text: string,
	size?: string,
	px?: string,
	py?: string
}

const Button: React.FC<Props> = ({callback, color, text, size, px, py}) => {
	console.log(size);
	return (
		<button onClick={callback} className={`md:mr-5 bg-${color}-500 hover:bg-${color}-400 
			text-white text-${size || '4xl'} py-${py || '2'} px-${px || '4'} border-b-4 border-${color}-700 hover:border-${color}-500 rounded my-5`}>
				{text}
			</button>
	)
}

export default Button;