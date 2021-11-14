import admin from 'firebase-admin';
import serviceAccount from '../../firebase.json';

if (!admin.apps.length) {
	try {
		admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
		databaseURL: "https://next-game-d05b8-default-rtdb.europe-west1.firebasedatabase.app"
		});
	} catch (error) {
		console.log('Firebase admin initialization error', error.stack);
	}
}

export default admin.firestore();