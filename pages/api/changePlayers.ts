import jwt from "jsonwebtoken";
import { db , admin }  from "../../components/firebase/firebaseAdmin"

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		res.status(405).send({ message: 'Only POST requests allowed' })
		return
	}
	const data = req.body;
	
	try{
		const payload = jwt.verify(data.token, process.env.JWT_SECRET);
		const players = data.players;
		console.log(players);
		if(!players.every(i=> (typeof i === "string"))){
			res.status(400).send({message: "Player list should be a list of strings"});
		}
		console.log(req.body);
		if (!payload.admin){
			res.status(401).send({ message: "Invalid Token" });
			console.log("Not admin");
			return
		}
		var docRef = db.collection("brackets").doc(payload.id);
		return docRef.get().then( (doc)=>{
			if (doc.exists){
				// console.log(data.result);
				// console.log(doc.data());
				docRef.update({
					history:{},
					players:players
				});
				res.status(200).send();
				return
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

