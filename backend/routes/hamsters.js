const getDb = require("../fbauth.js");
const express = require("express");
const { body, validationResult } = require("express-validator");

const db = getDb();
const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const snapshot = await db.collection("hamsters").get();

		let docData = [];

		snapshot.forEach((doc) => {
			docData.push({ docId: doc.id, ...doc.data() });
		});

		res.status(200).send(docData);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.get("/random", async (req, res) => {
	try {
		const snapshot = await db.collection("hamsters").get();

		let docData = [];

		snapshot.forEach((doc) => {
			docData.push(doc.data());
		});

		let rng = Math.floor(Math.random() * docData.length);

		res.status(200).send(docData[rng]);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.get("/:id", async (req, res) => {
	const id = req.params.id;

	var docRef = await db.collection("hamsters").doc(id);

	docRef
		.get()
		.then((doc) => {
			if (doc.exists) {
				console.log("Document data:", doc.data());
				res.status(200).send(doc.data());
			} else {
				// doc.data() will be undefined in this case
				console.log("No such document!");
				return res.status(404).send("404 Not Found");
			}
		})
		.catch((error) => {
			console.log("Error getting document:", error);
		});
});

router.post(
	"/",
	body("name").exists().notEmpty().isString(),
	body("age").exists().notEmpty().isInt(),
	body("favFood").exists().notEmpty().isString(),
	body("loves").exists().notEmpty().isString(),
	body("imgName").exists().notEmpty().isString(),
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
			const docRef = await db.collection("hamsters").add(req.body);
			res.status(200).send({ id: docRef.id, data: req.body });
		} catch (err) {
			res.status(500).send(err.message);
		}
	}
);

router.put("/:id", async (req, res) => {
	const id = req.params.id;

	var docRef = await db.collection("hamsters").doc(id);

	docRef
		.get()
		.then((doc) => {
			if (doc.exists) {
				if (Object.keys(req.body).length <= 0) {
					return res.status(400).send("400 Bad Request");
				}
				docRef.set(req.body, { merge: true });
				res.status(200).send("200 OK");
			} else {
				console.log("No such document!");
				return res.status(404).send("404");
			}
		})
		.catch((error) => {
			console.log("Error getting document:", error);
		});
});

router.delete("/:id", async (req, res) => {
	const id = req.params.id;

	var docRef = await db.collection("hamsters").doc(id);

	docRef
		.get()
		.then((doc) => {
			if (doc.exists) {
				docRef.delete();
				res.status(200).send(doc.data());
			} else {
				// doc.data() will be undefined in this case
				console.log("No such document!");
				return res.status(404).send("404 Not Found");
			}
		})
		.catch((error) => {
			console.log("Error getting document:", error);
		});
});

module.exports = router;
