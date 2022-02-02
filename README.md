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

## Technologies
![NodeJS](https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

## 🚀
## Mock-Up

The following images show the web application's appearance and functionality:

![App usage](./assets/screen.gif)

![API requests.](./assets/api.gif)

## 🛠️ 
##  Installation
```bash
npm i
```

### this will install the following dependencies 
```bash
 "dependencies": {
    "express": "^4.17.1",
    "moment": "^2.29.1",
    "util": "^0.12.4"
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

* 🌐 Live: https://mehdimahmud79.github.io/Note-Taker/

* ⚛️ Heroku: https://mehdi-note-taker.herokuapp.com/

---
© 2021 Mehdi Mahmud
