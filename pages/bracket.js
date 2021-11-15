import db from '../components/firebase/firebaseClient'
import { useEffect, useState } from 'react'
import { onSnapshot, doc} from 'firebase/firestore'
import Column from '../components/bracket/column'

const Bracket = () => {
	const players = [
		"test 1",
		"test 2",
		"test 3",
		"test 4",
		"test 5",
		"test 6",
		"test 7",
		"test 8",
	]

	return <div className="flex w-full">
		<Column players={players} />
		<Column players={players.slice(0,4)} />
		<Column players={players.slice(0,2)} />
	</div>
}

export default Bracket;