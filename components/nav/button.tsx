interface Props {
	callback: ()=>void,
	color: string,
	text: string,
	size?: string,
	px?: string,
	py?: string
}

const Button: React.FC<Props> = ({callback, color, text, size, px, py}) => {
	return (
		<button onClick={callback} className={`mx-2 bg-${color}-500 hover:bg-${color}-400 
			text-white text-${size || '4xl'} py-${py || '2'} px-${px || '4'} border-b-4 border-${color}-700 hover:border-${color}-500 rounded my-5 z-50`}>
				{text}
		</button>
	)
}

export default Button;