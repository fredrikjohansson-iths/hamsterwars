const express = require("express");
const path = require('path')
const cors = require("cors");
const getDb = require("./fbauth.js")
const localData = require("./data.json");
const hamsters = require('./routes/hamsters.js')
const staticFolder = path.join(__dirname, 'frontend')

const app = express();
const db = getDb()

const port = process.env.PORT || 8000;

app.use(express.json())
app.use(cors())
app.use(express.static(staticFolder))

app.use('/hamsters', hamsters)

// app.use(async function (req, res, next) {
//   for (const element of localData)
//     await db.collection("hamsters").doc(`${element.id}`).set(element);
//   next()
// });

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
