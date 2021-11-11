var admin = require("firebase-admin");

var serviceAccount = require("firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://next-game-d05b8-default-rtdb.europe-west1.firebasedatabase.app"
});