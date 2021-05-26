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
			docData.push(doc.data());
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
	try {
		const id = req.params.id;
		const docRef = await db.collection("hamsters").doc(id).get();

		if (!docRef.exists) {
			res.status(404);
		}

		res.status(200).send(docRef.data());
	} catch (err) {
		res.status(500).send(err.message);
	}
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

router.put(
	"/:id",
	body("name").isString(),
	body("age").isInt(),
	body("favFood").isString(),
	body("loves").isString(),
	body("imgName").isString(),
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
			const id = req.params.id;
			const docRef = await db.collection("hamsters").doc(id).get();

			if (!docRef.exists) {
				return res.status(404);
			}
			const docSet = await db
				.collection("hamsters")
				.doc(id)
				.set(req.body, { merge: true });
			res.status(200);
		} catch (err) {
			res.status(500).send(err.message);
		}
	}
);

router.delete("/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const docRef = await db.collection("hamsters").doc(id).get();

		if (!docRef.exists) {
			res.status(404);
		}

		const docDel = await db.collection("hamsters").doc(id).delete();
		res.status(200);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

module.exports = router;
