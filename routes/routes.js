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

//  get request a note by id
router.get(`/:id`, async(req, res) => {
  console.log(`${req.method} request has been received.\n`);

  var notes = dbNotes;
  var reqId = req.params.id;

  const requiredNote = await notes.filter((noteEl) => noteEl.id == reqId);
  console.log("Required Note is: ",requiredNote)

  // if (requiredNote == "") {
  //   const response = {
  //     status: "404",
  //     body: `note with id ${reqId} not found we have found ${requiredNote}`,
  //   };
  //   res.json(response);
  //   return;
  // }
  res.json(requiredNote);
  return;
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
  readFromFile("./db/db.json")
    .then((data) => {
      const notes = JSON.parse(data);
      const filteredNotes = notes.filter((note) => note.id !== req.params.id);
      if (filteredNotes.length == notes.length) {
        const response = {
          status: "404",
          body: `note with id ${req.params.id} not found`,
        };
        console.log(response);
        res.json(response);
        return;
      }
      res.json(filteredNotes);
      writeFile("./db/db.json", JSON.stringify(filteredNotes));
    })
    .catch((err) => {
      const response = {
        status: "400",
        body: { note: reqIdToDelete, action: "deleted" },
      };
      res.json(response);
      console.log("Error:", err);
    });
});

const readFromFile = util.promisify(fs.readFile);

module.exports = router;
