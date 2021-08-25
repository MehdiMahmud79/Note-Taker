const express = require("express");
const fs = require('fs');
const router = express.Router();
const dbNotes = require('../db/db.json');
const {logger,jsonMiddleWare , urlMiddleWarre,uuid}= require('./helpers/middleWares');

const writeToFile = (dbPath, content) =>
 fs.writeFile(dbPath, JSON.stringify(content, null, 4), (err) =>
   err ? console.error(err) : console.info(`\nData written to ${dbPath} successfully!`)
);

const updateDb = (file, content) => {
  fs.readFile(file, 'utf8', (err, previousNotes) => {
    if (err) {
      console.error(err);
    } else {
      const parsedNotes = JSON.parse(previousNotes);
      parsedData.push(content);
      writeToFile(file, parsedNotes);
    }
  });
 };
// get request to the all notes
router.get('/', (req, res) => res.json(dbNotes));

// post a new note to the server
router.post('/', (req, res) => {
  console.info(`Adding a new note due to receiving: ${req.method} request.`);
  const { title, text } = req.body;
  if (req.body) {
    const receivedNote = {
      title,
      text,
      id: uuid(),
    };

    updateDb('./db/db.json', receivedNote);
    res.json(`Note ${receivedNote.title} added successfully.`);
  } else {
    res.error(`Error in posting ${receivedNote.title}.`);
  }
});


 


module.exports = router;