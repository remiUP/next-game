import jwt from "jsonwebtoken";
import { db , admin }  from "../../components/firebase/firebaseAdmin"
import localToken from "../../types/tokens/localToken";
import tokenType from "../../types/tokens/tokenType";

async function createBracket(username, isPlayer){
	const players = isPlayer ? (username ? [username] : []) : [];
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
	const id = await createBracket(data.username, data.isPlayer);
	const token:localToken = {
		id : id,
		type : data.isPlayer ? tokenType.Player : tokenType.Spectator,
		username : data.username,
		admin : true
	}
	res.status(200).json(
		{
			token: jwt.sign(token,process.env.JWT_SECRET),
		}
	)
}
