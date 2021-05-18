const getDb = require('../fbauth.js')
const express = require('express')

const db = getDb()
const router = express.Router()

const snapshot = await db.collection('hamsters').get();

router.get('/', async (req, res) => {
	try {
			snapshot.forEach((doc) => {
				console.log(doc.id, '=>', doc.data());
				res.send(doc.name)
			});
		
	} catch (err) {
		res.status(500).send(err.message)
	}

})

module.exports = router 