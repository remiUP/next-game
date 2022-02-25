import Bracket_page from "./index";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { onSnapshot, doc, getDoc} from 'firebase/firestore'
import db from '../../components/firebase/firebaseClient'
import jwt from "jsonwebtoken";
import tokenType from "../../types/tokens/tokenType";
import localToken from "../../types/tokens/localToken";

interface Props {

}

const join_url = ({}: Props) => {
	const router = useRouter();

	const [is404, setIs404] = useState<boolean>(false);

	const spectateBracket = async (id:string) => {
		const docRef = doc(db, "brackets", id);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()){
			const token:localToken = {
				id : id,
				type: tokenType.Spectator,
				admin : false,
			};
			localStorage.setItem("next-game-token",jwt.sign(token,"spectate"));
			router.push('/bracket');
		}
		else{
			setIs404(true);
		}
	}
	
	useEffect(() => {
		if(!router.isReady) return;
		const run = async () => await spectateBracket(router.query.id as string);
		run();
	}, [router.isReady]);
	


	return (
		<div>
			{
				is404 &&
				<div className="w-screen h-screen flex items-center justify-center">
					<h1 className="text-white text-4xl">URL invalid</h1>
				</div>
			}
		</div>
	)
}

export default join_url;