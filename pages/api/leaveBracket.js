import jwt from "jsonwebtoken";
import { db , admin }  from "../../components/firebase/firebaseAdmin"
import isEmpty from '../../utils/isEmpty'

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		res.status(405).send({ message: 'Only POST requests allowed' })
		return
	}
	const data = req.body;
	
	try{
		const payload = jwt.verify(data.token, process.env.JWT_SECRET);
		console.log(payload.username);
		var docRef = db.collection("brackets").doc(payload.id);
		return docRef.get().then( (doc)=>{
			if (doc.exists){
				if (payload.admin){
					docRef.delete();
					res.status(200).send();
					return
				}
				const docData = doc.data();
				console.log(docData);
				if (!isEmpty(docData.history)){
					docRef.update({
						[`history.${payload.username + "all"}`]: payload.username
					});
					res.status(200).send();
					console.log(`${payload.username} left while the tournament is ongoing : default lose`)
					return
				}
				else{
					docRef.update({
						players: admin.firestore.FieldValue.arrayRemove(payload.username)
					});
					console.log(`${payload.username} left before tournament start : removed from players`)
					res.status(200).send();
					return
				}
			}
			else{
				res.status(404).send({ message: 'Bracket does not exist anymore' })
				return
			}
		});
	} catch (e){
		res.status(401).send({ message: "Invalid Token" });
		return
	}
}
