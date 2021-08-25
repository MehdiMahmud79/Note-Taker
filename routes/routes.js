const express = require("express");
const fs = require("fs");
const router = express.Router();
var dbNotes = require("../db/db.json");
const util = require("util");
const { uuid } = require("../helpers/middleWares");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

if (dbNotes === "") dbNotes = [];

//  write the new note to the database
const updateDb = async(filePath, content) => {
  try{
    const previousNotes = await readFile(filePath, "utf8");
      const parsedNotes = JSON.parse(previousNotes);
      parsedNotes.push(content);
      writeFile(filePath, JSON.stringify(parsedNotes));    
  } catch(error){
  console.error(err);
  }
 
};

// get request to the all notes
router.get("/", async (req, res) => {
  try {
    console.log(`${req.method} request has been received.`);
    const notes = await readFile("./db/db.json");
    res.json(JSON.parse(notes));
  } catch (error) {
    console.error("Error in loading the database:", error);
  }
});

//  get request a note by id
router.get(`/:id`, (req, res) => {
  console.log(
    `${req.method} request received`,
  );
  var notes = dbNotes;
  var reqIdToview = req.params.id;

  const requiredNote = notes.filter((noteEl) => noteEl.id == reqIdToview);
  console.log("sadadasd ", requiredNote);
  if (requiredNote == "") {
    const response = {
      status: "404",
      body: `note with ${reqIdToview} not found`,
    };
    console.log(response);
    res.json(response);
    return;
  }

  console.log(requiredNote);
  res.json(requiredNote);
  return;
});
// post a new note to the server
router.post("/", (req, res) => {
  console.info(`Adding a new note due to receiving: ${req.method} request.`);
  const { title, text } = req.body;
  if (!req.body) res.error(`Error in posting ${receivedNote.title}.`);
  const receivedNote = {
    id: uuid(),
    title,
    text,
  };

  updateDb("./db/db.json", receivedNote);
  res.json(`Note ${receivedNote.title} added successfully.`);
});

// delete a note from the list
router.delete(`/:id`, (req, res) => {
  console.log(
    `${req.method} request received`,
    "background: #222; color: #bada55"
  );
  var notes = dbNotes;
  var reqIdToDelete = req.params.id;

  const requiredNote = notes.filter((noteEl) => noteEl.id == reqIdToDelete);
  const requiredIndex = notes.findIndex((el) => el.id == reqIdToDelete);

  if (!requiredNote) {
    const response = {
      status: "404",
      body: `note with ${reqIdToDelete} not found`,
    };
    console.log(response);
    res.json(response);
  }
  // requiredNote=notes[noteIndexToDelete];
  notes.splice(requiredIndex, 1);
  // stringify notes
  const updatedNotes = JSON.stringify(notes);
  
  writeFile(`./db/db.json`, updatedNotes, `utf8`, (err) =>
    err
      ? console.error(err)
      : console.table(
          `Note ${reqIdToDelete} has been deleted from the database!`
        )
  );

  const response = {
    status: "success",
    body: { note: reqIdToDelete, action: "deleted" },
  };
  console.log(response);
  res.json(response);
  return;
});

module.exports = router;
