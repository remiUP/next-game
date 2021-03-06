import jwt from "jsonwebtoken";
import { db , admin }  from "../../components/firebase/firebaseAdmin"
import isEmpty from '../../utils/isEmpty'

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		res.status(405).send({ message: 'Only POST requests allowed' })
		return
	  }
	const data = req.body;
	if (!data.id){
		res.status(400).send({ message: 'Please provide an ID' })
	}
	var docRef = db.collection("brackets").doc(data.id);
	return docRef.get().then( (doc)=>{
		if (doc.exists){
			res.status(200).json(
				{
					token: jwt.sign({
						id : data.id,
						admin : false,
					},process.env.JWT_SECRET),
				}
			)
		}
		else{
			res.status(404).send({ message: `Bracket with id ${data.id} doesn't exist` })
			return
		}
	})
}
