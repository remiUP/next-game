import jwt from "jsonwebtoken";
import { db , admin }  from "../../components/firebase/firebaseAdmin"

async function addResult(id, res){
	const res = await db.collection("brackets").doc(id).update(
		res
	);
	return res;
}

export default async function handler(req, res) {

	if (req.method !== 'POST') {
		res.status(405).send({ message: 'Only POST requests allowed' })
		return
	}

	const data = req.body;
	const id = 1// await createBracket();
	res.status(200).json(
		{
			token: jwt.sign({
				id : id,
				usename : data.username,
				admin : true
			},process.env.JWT_SECRET),
		}
	)
}
