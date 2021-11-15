import jwt from "jsonwebtoken";
import { db , admin }  from "../../components/firebase/firebaseAdmin"

const KEY = "lqdsfjsdlfkh867dsfjkhg56gsdfhjg567"


async function createBracket(){
	const res = await db.collection("brackets").add({
		test: admin.firestore.FieldValue.serverTimestamp()
	})
	return res.id;
}

export default async function handler(req, res) {
	const id = await createBracket();
	console.log(id)
	res.status(200).json(
		{ 
			token: jwt.sign({
				id : id,
				name : "test",
				admin : true
			},KEY),
			id: id
		}
	)
  }
