import db from '../components/firebase/firebaseClient'
import { useEffect, useState } from 'react'
import { onSnapshot, doc} from 'firebase/firestore'
import Column from '../components/bracket/column'
import Bracket from '../components/bracket/bracket'

const bracket_page = () => {
	const players = [
		"test 1",
		"test 2",
		"test 3",
		"test 4",
		"test 5",
		"test 6",
		"test 7",
	]

	const history = {
		"test 1test 5":"test 1",
		"test 2test 6":"test 6",
		"test 1test 6":"test 6",
		"test 3test 7":"test 3"
	}
	return <div className="flex w-screen h-screen justify-center">
		<Bracket players={players} history={history}/>
	</div>
}

export default bracket_page;