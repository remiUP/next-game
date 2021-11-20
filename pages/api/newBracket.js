import jwt from "jsonwebtoken";
import { db , admin }  from "../../components/firebase/firebaseAdmin"

async function createBracket(username){
	const players = username ? [username] : [];
	const res = await db.collection("brackets").add({
		created: admin.firestore.FieldValue.serverTimestamp(),
		players: players,
		history: {}
	})
	return res.id;
}

export default async function handler(req, res) {

	if (req.method !== 'POST') {
		res.status(405).send({ message: 'Only POST requests allowed' })
		return
	  }
	const data = req.body;
	const id = await createBracket(data.username);
	res.status(200).json(
		{
			token: jwt.sign({
				id : id,
				username : data.username,
				admin : true
			},process.env.JWT_SECRET),
		}
	)
}
