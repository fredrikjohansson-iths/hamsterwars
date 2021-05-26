var admin = require("firebase-admin");

var serviceAccount;

if (process.env.PRIVATE_KEY) {
	serviceAccount = JSON.parse(process.env.PRIVATE_KEY)
} else {
	serviceAccount = require("./hamsters-cf0a5-firebase-adminsdk-wy2ih-5e26a120d8.json");

}

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

function getDb() {
	return admin.firestore()
}

module.exports = getDb