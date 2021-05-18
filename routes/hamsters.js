const getDb = require('../fbauth.js')
const express = require('express')

const db = getDb()
const router = express.Router()

router.get('/', async (req, res) => {
	try {
		const snapshot = await db.collection('hamsters').get();

		if (!snapshot) {
			res.status(404).send("Sorry, can't find this.");
		}

		else {
			snapshot.forEach((doc) => {
				console.log(doc.id, '=>', doc.data());
			});

		}
	} catch (err) {
		res.status(500).send(err.message)
	}

})

module.exports = router 