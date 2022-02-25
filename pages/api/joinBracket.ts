import jwt from "jsonwebtoken";
import { db , admin }  from "../../components/firebase/firebaseAdmin"
import isEmpty from '../../utils/isEmpty'
import localToken from '../../types/tokens/localToken'
import tokenType from "../../types/tokens/tokenType";

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		res.status(405).send({ message: 'Only POST requests allowed' })
		return
	  }
	const data = req.body;
	if (!data.username || !data.id){
		res.status(400).send({ message: 'Please provide an ID and Username' })
	}
	var docRef = db.collection("brackets").doc(data.id);
	return docRef.get().then( (doc)=>{
		if (doc.exists){
			const docData = doc.data();
			if (!isEmpty(docData.history)){
				res.status(401).send({message : 'Game has already started'})
				return
			}
			if (docData.players.includes(data.username)){
				res.status(403).send({ message: 'Username already taken' })
				return
			}
			else{
				docRef.update({
					players: admin.firestore.FieldValue.arrayUnion(data.username)
				});
				const token:localToken = {
					id : data.id,
					type: tokenType.Player,
					username : data.username,
					admin : false,
				}
				res.status(200).json(
					{
						token: jwt.sign(token,process.env.JWT_SECRET),
					}
				)
			}
		}
		else{
			res.status(404).send({ message: `Bracket with id ${data.id} doesn't exist` })
			return
		}
	})
}
