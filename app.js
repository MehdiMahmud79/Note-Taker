const express = require("express");
const path = require('path');
const routesToApi = require("./routes/routes.js");
const {logger,jsonMiddleWare , urlMiddleWarre,uuid}= require('./helpers/middleWares');

const PORT = process.env.PORT || 5000;
const app = express();

// Init and Body Parser Middleware

app.use(logger);app.use(jsonMiddleWare);app.use(urlMiddleWarre);

// import and use the public folder
app.use(express.static('public'));

// link th eroutes to the api notes
app.use("/api/notes", routesToApi)

// get request to all notes
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// link to the main page when there is no request
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`serving files from public on port http://localhost:${PORT}``)
);