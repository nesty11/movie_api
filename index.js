/**
 * Setup requirements and constants
 */
const mongoose = require("mongoose");
const Models = require("./models.js");
const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const app = express();
const { check, validationResult } = require("express-validator");

/**
 * Middleware for parsing JSON requests
 * @method
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next middleware function
 */
app.use(bodyParser.json());
/**
 * Middleware for parsing URL-encoded requests
 * @method
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next middleware function
 */
app.use(bodyParser.urlencoded({ extended: true }));

const Movies = Models.Movie;
const Users = Models.User;

/**
 * Connect to MongoDB using Mongoose
 * @type {Promise<mongoose>}
 */
mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const cors = require("cors");
let allowedOrigins = [
  /*  "http://localhost:8080",
   "http://localhost:80",
   "http://testsite.com",
   "http://localhost:1234",
   "https://nvflixapp.netlify.app",
   "http://localhost:4200",
   "https://nesty11.github.io/myFlix-Angular-App/welcome",
   "https://nesty11.github.io",
   "https://final-static-bucket.s3-website-us-east-1.amazonaws.com/",
   "https://movieapi-2cmo.onrender.com" */
  "*"
];
app.use(
  cors({
    /**
     * Check if the origin is allowed
     * @param {string} origin - The origin of the request
     * @param {function} callback - The callback function
     */
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        //If a specific origin isn't found on the list of allowed origins
        let message =
          "The CORS policy for this application doesn't allow acces from origin" +
          origin;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  })
);

let auth = require("./auth")(app);
const passport = require("passport");
require("./passport");
/**
 * Middleware for logging requests
 * @method
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next middleware function
 */

/* // setup Logging
const accessLogStream = fs.createWriteStream(
  // create a write stream
  path.join(__dirname, "log.text"), //a 'log.txt' file is created in the root directory
  { flags: "a" } // path.join appends it to 'log.text'
);

app.use(morgan("combined", { stream: accessLogStream })); // enable morgan logging to 'log.txt' */

app.use(morgan("common"));

// setup User Authentication

// setup JSON Parsing

// setup App Routing
/**
 * Serve static files from the 'public' folder
 * @method
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next middleware function
 */
app.use(
  express.static("public") // routes all requests for static files to the 'public' folder
);

/**
 * Route for the home page
 * @method GET
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.get("/", (req, res) => {
  res.send("Welcome to myFlix!");
});

//GET all movies 2.7
/**
 * Route for getting all movies
 * @method GET
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.get(
  "/movies",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Movies.find()
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//GET movie info for one Title 2.7
/**
 * Route for getting movie info by title
 * @method GET
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.get(
  "/movies/:Title",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Movies.findOne({ Title: req.params.Title })
      .then((movie) => {
        res.json(movie);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//GET genre info for one genre
/**
 * Route for getting genre info for one genre
 * @method GET
 * @param {string} req.params.genreName - The name of the genre to retrieve info for
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.get(
  "/movies/genres/:genreName",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Movies.findOne({ "Genre.Name": req.params.genreName })
      .then((movie) => {
        res.status(200).json(movie.Genre);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//GET info for one director
/**
 * Route for getting info for one director
 * @method GET
 * @param {string} req.params.directorName - The name of the director to retrieve info for
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.get(
  "/movies/directors/:directorName",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Movies.findOne({ "Director.Name": req.params.directorName })
      .then((movie) => {
        res.json(movie.Director);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//CREATE a new user 2.7 (Does not need authentication so new users can register)
/**
 * Route for creating a new user
 * @method POST
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.post(
  "/users",
  // Validation logic here for request
  //you can either use a chain of methods like .not().isEmpty()
  //or use .isLength({min: 5}) which means: minimum value of 5 characters are only allowed
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check("Username", "Username contains invalid characters.").isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail(),
  ],
  async (req, res) => {
    //Check the validation object for error
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    await Users.findOne({ Username: req.body.Username }) //Searches to see if a user with the requested username already exists
      .then((user) => {
        if (user) {
          //If the user is found, send a response that it already exists
          return res.status(400).send(req.body.Username + " already exists");
        } else {
          Users.create({
            Name: req.body.Name,
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday,
          })
            .then((user) => {
              res.status(201).json(user);
            })
            .catch((error) => {
              console.error(error);
              res.status(500).send("Error:" + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error:" + error);
      });
  }
);

// Get all users 2.7
/**
 * Route for getting all users
 * @method GET
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Users.find()
      .then((users) => {
        res.status(201).json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error:" + err);
      });
  }
);

//Get a user by username 2.7
/**
 * Route for getting a user by username
 * @method GET
 * @param {string} req.params.Username - The username of the user to retrieve
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.get(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Users.findOne({ Username: req.params.Username })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error:" + err);
      });
  }
);

// Update a user's info by username 2.7
/**
 * Route for updating a user's info by username
 * @method PUT
 * @param {string} req.params.Username - The username of the user to update
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.put(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    //Condition to check Username
    if (request.user.Username !== request.params.Username) {
      return response.status(400).send("Request denied.");
    }
    await Users.findOneAndUpdate(
      { Username: request.params.Username },
      {
        $set: {
          Username: request.body.Username,
          Password: request.body.Password,
          Email: request.body.Email,
          Birthday: request.body.Birthday,
        },
      },
      { new: true }
    ).then((user) => {
      if (!user) {
        response.status(500).send(`${request.params.Username} not found`);
      } else {
        response.status(201).json(user);
      }
    });
  }
);

//Add a movie to a user's list of favorites 2.7
/**
 * Route for adding a movie to a user's list of favorites
 * @method POST
 * @param {string} req.params.Username - The username of the user to add the movie to favorites
 * @param {string} req.params.MovieID - The ID of the movie to add to favorites
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.post(
  "/users/:Username/movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $push: { FavoriteMovies: req.params.MovieID },
      },
      { new: true }
    ) //This line makes sure that the updated document is returned
      .then((updatedUser) => {
        res.json(updatedUser);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error:" + err);
      });
  }
);

//DELETE a user's favorite movie 2.7
/**
 * Route for deleting a user's favorite movie
 * @method DELETE
 * @param {string} req.params.Username - The username of the user to remove the movie from favorites
 * @param {string} req.params.MovieID - The ID of the movie to remove from favorites
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.delete(
  "/users/:Username/movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Users.findOneAndUpdate(
      { Username: req.params.Username },
      { $pull: { FavoriteMovies: req.params.MovieID } },
      { new: true }
    )
      .then((updatedUser) => {
        res.json(updatedUser);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//DELETE a user by username 2.7
/**
 * Route for deleting a user by username
 * @method DELETE
 * @param {string} req.params.Username - The username of the user to delete
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.delete(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Users.findOneAndRemove({ Username: req.params.Username })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.Username + " was not found.");
        } else {
          res.status(200).send(req.params.Username + " was deleted.");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * Start the server
 * @param {number} port - Port number for the server to listen on
 */
const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log("Listening on Port " + port);
});

// setup Error Handling
/**
 * Middleware for error handling
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next middleware function
 */
app.use((err, req, res, next) => {
  console.error(err.stack); // information about the error will be logged to the terminal, then logged in the console
  res.status(500).send("Oh no! Something has gone wrong. ");
});
