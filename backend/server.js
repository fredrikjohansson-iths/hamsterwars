const express = require("express");
const path = require("path");
const cors = require("cors");
const getDb = require("./fbauth.js");

const hamsters = require("./routes/hamsters.js");

const buildDir = path.join(__dirname, "../public");
// const imgDir = path.join(__dirname, "./img");

const app = express();
const db = getDb();

const PORT = process.env.PORT || 1010;

app.use((req, res, next) => {
	console.log(`${req.method} ${req.url}`, req.params);
	next();
});

app.use(express.json());
app.use(cors());
app.use(express.static(buildDir));
app.use('/img', express.static(path.join(__dirname, './img')))
// app.use(express.static(imgDir));
app.use("/hamsters", hamsters);

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../public/index.html"));
  });

app.listen(PORT, () => {
	console.log(`App listening at port ${PORT}`);
});
