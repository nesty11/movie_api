// setup requirements and constants
const express = require("express"),
  morgan = require("morgan"),
  fs = require("fs"),
  path = require("path");
const app = express();

let topMovies = [
  {
    title: `Star Wars: Revenge of the Sith`,
    director: "George Lucas",
    year: "2005",
  },
  {
    title: `Happy Gilmore`,
    director: "Dennis Dugan",
    year: "1996",
  },
  {
    title: `The Princess Bride`,
    director: "Rob Reiner",
    year: "1987",
  },
  {
    title: `One Piece Film: Red`,
    director: "Goro Taniguchi",
    year: "2022",
  },
  {
    title: `Spider-Man: Into the Spider-Verse`,
    director: "Bob Persichetti",
    year: "2018",
  },
  {
    title: `Princess Mononoke`,
    director: "Hayao Miyazaki",
    year: "1997",
  },
  {
    title: `Spider-Man: No Way Home`,
    director: "Jon Watts",
    year: "2021",
  },
  {
    title: `The Waterboy`,
    director: "Frank Coraci",
    year: "1998",
  },
  {
    title: `Star Wars: Episode I - The Phantom Menace`,
    director: "George Lucas",
    year: "1999",
  },
  {
    title: `Dungeons & Dragons: Honor Among Thieves`,
    director: "John Francis Daley, Jonathan Goldstein",
    year: "2023",
  },
];

// setup Logging
const accessLogStream = fs.createWriteStream(
  // create a write stream
  path.join(__dirname, "log.text"), //a 'log.txt' file is created in the root directory
  { flags: "a" } // path.join appends it to 'log.text'
);

app.use(morgan("combined", { stream: accessLogStream })); // enable morgan logging to 'log.txt'

// setup User Authentication

// setup JSON Parsing

// setup App Routing
app.use(
  express.static("public") // routes all requests for static files to the 'public' folder
);

// GET requests
app.get("/movies", (req, res) => {
  res.json(topMovies);
});

app.get("/", (req, res) => {
  res.send("Welcome to myFlix!");
});

// Listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});

// setup Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack); // information about the error will be logged to the terminal, then logged in the console
  res.status(500).send("Oh no! Something has gone wrong. ");
});
