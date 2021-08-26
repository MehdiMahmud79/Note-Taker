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
const updateDb = async (filePath, content) => {
  try {
    const previousNotes = await readFile(filePath, "utf8");
    const parsedNotes = JSON.parse(previousNotes);
    parsedNotes.push(content);
    writeFile(filePath, JSON.stringify(parsedNotes));
  } catch (error) {
    console.error(err);
  }
};

// get request to the all notes
router.get("/", async (req, res) => {
  try {
    console.log(`${req.method} request has been received.\n`);
    const notes = await readFile("./db/db.json");
    res.json(JSON.parse(notes));
  } catch (error) {
    console.error("Error in loading the database:", error);
  }
});
// get request for notes id
router.get("/:id", (req, res) => {
  console.log(`${req.method} request has been received.`);
  readFile("./db/db.json")
    .then((data) => {
      const notes = JSON.parse(data);
      const filteredNotes = notes.filter((note) => note.id == req.params.id);
      console.log(filteredNotes)
      if (filteredNotes.length == 0) {
        const response = {
          status: "404",
          body: `note with id ${req.params.id} not found`,
          action:"Note deleted"
        };
        res.json(response);
        return;
      }
      res.json(filteredNotes);
    })
    .catch((err) => {
      
      res.status(400).json({
        status: 'error',
        error: `note with id ${ req.params.id} not found.`,
      });
     
    });
});
// post a new note to the server
router.post("/", (req, res) => {
  console.info(`Adding a new note due to receiving: ${req.method} request.\n`);
  const { title, text } = req.body;
  if (!req.body) res.error(`Error in posting ${receivedNote.title}.`);
  const receivedNote = {
    id: uuid(),
    title,
    text,
  };

  updateDb("./db/db.json", receivedNote);
  res.json(`Note ${receivedNote.title} added successfully.\n`);
});

router.delete("/:id", (req, res) => {
  console.log(`${req.method} request has been received.`);
  readFile("./db/db.json")
    .then((data) => {
      const notes = JSON.parse(data);
      const filteredNotes = notes.filter((note) => note.id !== req.params.id);
      if (filteredNotes.length == notes.length) {
        const response = {
          status: "404",
          body: `note with id ${req.params.id} not found`,
          action:"Note deleted"
        };
        res.json(response);
        return;
      }
      res.json(filteredNotes);
      writeFile("./db/db.json", JSON.stringify(filteredNotes));
    })
    .catch((err) => {
      
      res.status(400).json({
        status: 'error',
        error: `note with id ${ req.params.id} not found.`,
      });
     
    });
});


module.exports = router;
