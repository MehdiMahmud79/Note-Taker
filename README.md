[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Express.js: Note Taker

# Table of Contents 

* [Description](#description)
* [Mock-Up](#🚀)
* [Installation](#installation)
* [Getting Started](#📚)
* [Websites](#websites)


## 📝
## Description 
A note taker application that can be used to write and save notes. This application will use an Express.js back end and will save and retrieve note data from a JSON file.

The application consists ofthe front end and the back end, connect the two, and then deploy the entire application to Heroku.

![badmath](https://img.shields.io/github/issues/MehdiMahmud79/Note-Taker)
![badmath](https://img.shields.io/github/forks/MehdiMahmud79/Note-Taker)
![badmath](https://img.shields.io/github/stars/MehdiMahmud79/Note-Taker)


## 🚀
## Mock-Up

The following images show the web application's appearance and functionality:

![Existing notes are listed in the left-hand column with empty fields on the right-hand side for the new note’s title and text.](./Assets/11-express-homework-demo-01.png)

![Note titled “Balance accounts” reads, “Balance account books by end of day Monday,” with other notes listed on the left.](./Assets/11-express-homework-demo-02.png)

## 🛠️ 
##  Installation
```bash
npm init
npm i
```

### this will install the following dependencies 
```bash
 "dependencies": {
    "email-validator": "^2.0.4",
    "inquirer": "^8.1.2",
    "uuid": "^8.3.2",
    "uuid-validate": "0.0.3"
  }

```

# 📚
## Getting Started

On the back end, the application  include a `db.json` file that will be used to store and retrieve notes using the `fs` module.

The following HTML routes are  created:

* `GET /notes` will  return the `notes.html` file.

* `GET *` will return the `index.html` file.

The following API routes should be created:

* `GET /api/notes` will read the `db.json` file and return all saved notes as JSON.

* `POST /api/notes` will receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

* `GET /api/notes/:id` get the notes by id because each note has a unique id.  

* `DELETE /api/notes/:id` will receive a a request  to delete a nothe with the givin id from the `db.json` file, and then update the notes.html page


## Websites
* Github: https://github.com/MehdiMahmud79/Note-Taker
* Live: https://mehdimahmud79.github.io/Note-Taker/



---
© 2021 Mehdi Mahmud
