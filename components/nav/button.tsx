import {ButtonColor, ButtonSize} from "../styles/nav/buttonStyle";

interface Props {
	callback: ()=>void,
	color: ButtonColor,
	size: ButtonSize,
	children: React.ReactNode
}

const Button: React.FC<Props> = (props) => {
	const cls:string = props.color + props.size + "mx-2 py-2 px-4 border-b-4 rounded my-5";
	return (
		<button onClick={props.callback} className={cls}>
				{props.children}
		</button>
	)
}

export default Button;