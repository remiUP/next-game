import jwt from "jsonwebtoken";

const KEY = "lqdsfjsdlfkh867dsfjkhg56gsdfhjg567"

export default function handler(req, res) {
	res.status(200).json(
		{ token: jwt.sign({
			id : Math.floor(Math.random()*10),
			name : "test",
			admin : true
		},KEY)}
	)
  }
