const express = require("express");
const fs = require("fs");
const router = express.Router();
const dbNotes = require("../db/db.json");
const {
  logger,
  jsonMiddleWare,
  urlMiddleWarre,
  uuid,
} = require("../helpers/middleWares");

const writeToFile = (dbPath, content) =>
  fs.writeFile(dbPath, JSON.stringify(content, null, 4), (err) =>
    err
      ? console.error(err)
      : console.info(`\nData written to ${dbPath} successfully!`)
  );

const updateDb = (file, content) => {
  fs.readFile(file, "utf8", (err, previousNotes) => {
    if (err) {
      console.error(err);
    } else {
      const parsedNotes = JSON.parse(previousNotes);
      parsedNotes.push(content);
      writeToFile(file, parsedNotes);
    }
  });
};
// get request to the all notes

router.get("/", (req, res) => {
  res.json(dbNotes);
console.log('%c the green hulk got mad!', 'color: green; font-weight: bold;');

});

// post a new note to the server
router.post("/", (req, res) => {
  console.info(`Adding a new note due to receiving: ${req.method} request.`);
  const { title, text } = req.body;
  if (!req.body) res.error(`Error in posting ${receivedNote.title}.`);
  const receivedNote = {
    id: uuid(),   
    title,
    text
  };

  updateDb("./db/db.json", receivedNote);
  res.json(`Note ${receivedNote.title} added successfully.`);
});

// delete a note from the list
router.delete(`/:id`, (req, res) => {
  console.log(`${req.method} request received`, 'background: #222; color: #bada55');
  var notes = dbNotes;
  var reqIdToDelete = req.params.id;

  const requiredNote = notes.filter((noteEl) => noteEl.id == reqIdToDelete);
  const requiredIndex = notes.findIndex((el) => el.id == reqIdToDelete);

  if (!requiredNote) {
    const response = {
      status: "failure",
      body: `note with ${reqIdToDelete} not found`,
    };
    console.log(response);
    res.json(response);
  }
  // requiredNote=notes[noteIndexToDelete];
  notes.splice(requiredIndex, 1);
  // stringify notes
  const updatedNotes = JSON.stringify(notes);
  fs.writeFile(`./db/db.json`, updatedNotes, `utf8`, (err) =>
    err
      ? console.error(err)
      : console.table(`Note ${reqIdToDelete} has been deleted from the database!`)
  );

  const response = {
    status: "success",
    body: { note: reqIdToDelete, action: "deleted" },
  };
  console.log(response);
  res.json(response);
  return;
});

//  get request a note by id
router.get(`/:id`, (req, res) => {
  console.log(`${req.method} request received`, 'background: #222; color: #bada55');
  var notes = dbNotes;
  var reqIdToDelete = req.params.id;

  const requiredNote = notes.filter((noteEl) => noteEl.id == reqIdToDelete);
  console.log("sadadasd ", requiredNote)
  if (requiredNote =="") {
    const response = {
      status: "failure",
      body: `note with ${reqIdToDelete} not found`,
    };
    console.log(response);
    res.json(response);
    return
  }
  
  console.log(requiredNote);
  res.json(requiredNote);
  return;
});

module.exports = router;
