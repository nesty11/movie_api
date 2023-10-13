// setup requirements and constants
const mongoose = require("mongoose");
const Models = require("./models.js");
const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const app = express();
const { check, validationResult } = require("express-validator");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Movies = Models.Movie;
const Users = Models.User;
mongoose.connect("mongodb://127.0.0.1/cfDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const cors = require("cors");
let alloweedOrigins = ["http://localhost:8080", "http://testsite.com"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (alloweedOrigins.indexOf(origin) === -1) {
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

/* let movies = [
  {
    Title: "Star Wars: Revenge of the Sith",
    Year: "2005",
    Description:
      "Nearly three years have passed since the beginning of the Clone Wars. The Republic, with the help of the Jedi, take on Count Dooku and the Separatists. With a new threat rising, the Jedi Council sends Obi-Wan Kenobi and Anakin Skywalker to aid the captured Chancellor. Anakin feels he is ready to be promoted to Jedi Master. Obi-Wan is hunting down the Separatist General, Grievous. When Anakin has future visions of pain and suffering coming Padmé's way, he sees Master Yoda for counsel. When Darth Sidious executes Order 66, it destroys most of all the Jedi have built. Experience the birth of Darth Vader. Feel the betrayal that leads to hatred between two brothers. And witness the power of hope.",
    Genre: {
      Name: "Action",
      Description:
        "Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats. The genre tends to feature a mostly resourceful hero struggling against incredible odds, which include life-threatening situations, a dangerous villain, or a pursuit which usually concludes in victory for the hero.",
    },
    Director: {
      Name: "George Lucas",
      Bio: "George Walton Lucas, Jr. (Modesto, California, May 14, 1944) is an American filmmaker, creator of the film sagas of Star Wars and Indiana Jones, and former president of Lucasfilm Limited, LucasArts Entertainment Company, Lucas Digital Ltd, Lucas Licensing, LucasBooks and Lucas Learning Ltd. It was considered, for two consecutive years, the fourth most powerful person in the entertainment industry, behind the owners of Time Warner, Turner and Steven Spielberg. Born: May 14, 1944.",
    },
    ImageURL: "",
    Featured: "True",
  },

  {
    Title: "Happy Gilmore",
    Year: "1996",
    Description:
      "A rejected hockey player puts his skills to the golf course to save his grandmother's house.",
    Genre: {
      Name: "Comedy",
      Description:
        "Comedy is a genre of fiction that consists of discourses or works intended to be humorous or amusing by inducing laughter, especially in theatre, film, stand-up comedy, television, radio, books, or any other entertainment medium.",
    },
    Director: {
      Name: "Denis Dugan",
      Bio: "Dennis Barton Dugan is an American film director, actor, comedian and screenwriter from Wheaton, Illinois who directed several films featuring Adam Sandler including Happy Gilmore, Big Daddy, Jack & Jill, Grown Ups, I Now Pronounce You Chuck & Larry and You Don't Mess With the Zohan. He also directed Beverly Hills Ninja and The Benchwarmers. Born September 5, 1946.",
    },
    ImageURL: "",
    Featured: "True",
  },

  {
    Title: "Dragon Ball Super: Broly",
    Year: "2018",
    Description:
      "Goku and Vegeta encounter Broly, a Saiyan warrior unlike any fighter they've faced before.",
    Genre: {
      Name: "Action",
      Description:
        "Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats. The genre tends to feature a mostly resourceful hero struggling against incredible odds, which include life-threatening situations, a dangerous villain, or a pursuit which usually concludes in victory for the hero.",
    },
    Director: {
      Name: "Tatsuya Nagamine",
      Bio: "Tatsuya Nagamine (長峯 達也, Nagamine Tatsuya) is a Japanese anime director working for Toei Animation. He is known for Dragon Ball Super: Broly (2018), One Piece (1999) and One Piece Film Z (2012).",
    },
    ImageURL: "",
    Featured: "True",
  },

  {
    Title: "One Piece Film: Red",
    Year: "2022",
    Description:
      "For the first time ever, Uta - the most beloved singer in the world - will reveal herself to the world at a live concert. The voice that the whole world has been waiting for is about to resound.",
    Genre: {
      Name: "Adventure",
      Description:
        "Adventure fiction is a type of fiction that usually presents danger, or gives the reader a sense of excitement.",
    },
    Director: {
      Name: "Goro Taniguchi",
      Bio: "Gorō Taniguchi (谷口 悟朗, Taniguchi Gorō, born October 18, 1966) is a Japanese anime director, writer, producer and storyboard artist, who is among Sunrise's noted directors. He was born in Nisshin, Aichi, Japan.",
    },
    ImageURL: "",
    Featured: "True",
  },

  {
    Title: "Spider-Man: Into the Spider-Verse",
    Year: "2018",
    Description:
      "Teen Miles Morales becomes the Spider-Man of his universe and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.",
    Genre: {
      Name: "Action",
      Description:
        "Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats. The genre tends to feature a mostly resourceful hero struggling against incredible odds, which include life-threatening situations, a dangerous villain, or a pursuit which usually concludes in victory for the hero.",
    },
    Director: {
      Name: "Bob Persichetti",
      Bio: "Robert Persichetti Jr. (born January 17, 1973) is an American filmmaker, animator, story artist, storyboard artist, screenwriter, film director, and film producer. He is best known for co-directing the film Spider-Man: Into the Spider-Verse, for which he won the Academy Award for Best Animated Feature.",
    },
    ImageURL: "",
    Featured: "True",
  },

  {
    Title: "Princess Mononoke",
    Year: "1997",
    Description:
      "On a journey to find the cure for a Tatarigami's curse, Ashitaka finds himself in the middle of a war between the forest gods and Tatara, a mining colony. In this quest he also meets San, the Mononoke Hime.",
    Genre: {
      Name: "Animation",
      Description:
        "Animation is the method that encompasses myriad filmmaking techniques, by which still images are manipulated to create moving images. In traditional animation, images are drawn or painted by hand on transparent celluloid sheets (cels) to be photographed and exhibited on film. Animation has been recognized as an artistic medium, specifically within the entertainment industry. Many animations are computer animations made with computer-generated imagery (CGI). Stop motion animation, in particular claymation, has continued to exist alongside these other forms.",
    },
    Director: {
      Name: "Hayao Miyazaki",
      Bio: "Hayao Miyazaki is 1 of Japan's greatest animation directors. The entertaining plots, compelling characters & breathtaking animation in his films have earned him international renown from critics as well as public recognition within Japan. He was born on January 5, 1941 in Tokyo. He started his career in 1963 as an animator at the studio Toei Douga studio, and was subsequently involved in many early classics of Japanese animation. From the beginning, he commanded attention with his incredible drawing ability and the seemingly endless stream of movie ideas he proposed.",
    },
    ImageURL: "",
    Featured: "True",
  },

  {
    Title: "Spider-Man: No Way Home",
    Year: "2021",
    Description:
      "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.",
    Genre: {
      Name: "Action",
      Description:
        "Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats. The genre tends to feature a mostly resourceful hero struggling against incredible odds, which include life-threatening situations, a dangerous villain, or a pursuit which usually concludes in victory for the hero.",
    },
    Director: {
      Name: "Jon Watts",
      Bio: "Jon Watts is an American filmmaker and screenwriter. He directed Cop Car and Clown before he was picked by Marvel and Sony to direct Spider-Man: Homecoming starring Tom Holland and Zendaya. It's success resulted in two sequels, Far from Home in 2019 and No Way Home in 2021. He was also picked by Marvel to direct a Fantastic Four reboot film following the failure of Josh Trank's Fant4stic, but dropped the directing role in April 2022. Born June 28, 1981.",
    },
    ImageURL: "",
    Featured: "True",
  },

  {
    Title: "The Waterboy",
    Year: "1998",
    Description:
      "A waterboy for a college football team discovers he has a unique tackling ability and becomes a member of the team.",
    Genre: {
      Name: "Comedy",
      Description:
        "Comedy is a genre of fiction that consists of discourses or works intended to be humorous or amusing by inducing laughter, especially in theatre, film, stand-up comedy, television, radio, books, or any other entertainment medium. ",
    },
    Director: {
      Name: "Frank Coraci",
      Bio: "Frank Coraci is an American film Director, Writer and Actor best know for his work with Adam Sandler. Coraci was born in Shirley, New York on Long Island. Coraci graduated from New York University's Tisch School of the Arts in 1988 with a bachelor's degree in Film. He has directed a number of Sandler's most revered and biggest box office hits (The Wedding Singer, The Waterboy and Click). Born February 3, 1966.",
    },
    ImageURL: "",
    Featured: "True",
  },

  {
    Title: "Star Wars: Episode I - The Phantom Menace",
    Year: "1999",
    Description:
      "Two Jedi escape a hostile blockade to find allies and come across a young boy who may bring balance to the Force, but the long dormant Sith resurface to claim their original glory.",
    Genre: {
      Name: "Action",
      Description:
        "Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats. The genre tends to feature a mostly resourceful hero struggling against incredible odds, which include life-threatening situations, a dangerous villain, or a pursuit which usually concludes in victory for the hero.",
    },
    Director: {
      Name: "George Lucas",
      Bio: "George Walton Lucas, Jr. (Modesto, California, May 14, 1944) is an American filmmaker, creator of the film sagas of Star Wars and Indiana Jones, and former president of Lucasfilm Limited, LucasArts Entertainment Company, Lucas Digital Ltd, Lucas Licensing, LucasBooks and Lucas Learning Ltd. It was considered, for two consecutive years, the fourth most powerful person in the entertainment industry, behind the owners of Time Warner, Turner and Steven Spielberg. Born: May 14, 1944.",
    },
    ImageURL: "",
    Featured: "True",
  },

  {
    Title: "Dungeons & Dragons: Honor Among Thieves",
    Year: "2023",
    Description:
      "A charming thief and a band of unlikely adventurers undertake an epic heist to retrieve a lost relic, but things go dangerously awry when they run afoul of the wrong people. Dungeons and Dragons: Honor Among Thieves brings the rich world and playful spirit of the legendary roleplaying game to the big screen in a hilarious and action-packed adventure.",
    Genre: {
      Name: "Fantansy",
      Description:
        "Fantasy is a genre of speculative fiction involving magical elements, typically set in a fictional universe and usually inspired by mythology or folklore.",
    },
    Director: {
      Name: "John Francis Daley",
      Bio: "John Francis Daley began acting in the national and international tour of The Who's Tommy, playing young Tommy - and coming to national prominence in the critically acclaimed, cult classic series, Freaks and Geeks (1999). Formerly a regular on the Fox hit, Bones (2005), John can also be seen in the Lions Gate comedy, Waiting and the upcoming Rapture-Palooza (2013), opposite Anna Kendrick and Craig Robinson. Now enjoying a successful screenwriting career, with his writing partner, Jonathan Goldstein, the two have sold several scripts in the past three years, including the summer hit, Horrible Bosses (2011). As well as being an actor and screenwriter, John is also a musician, playing keyboard and singing lead vocals in his band, Dayplayer soon to release their first CD.",
    },
    ImageURL: "",
    Featured: "True",
  },
]; */

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
app.use(
  express.static("public") // routes all requests for static files to the 'public' folder
);

// GET requests READ
/* app.get("/movies", (req, res) => {
  res.status(200).json(movies);
}); */

app.get("/", (req, res) => {
  res.send("Welcome to myFlix!");
});

// Listen for requests
/* app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
}); */

const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log("Listening on Port" + port);
});

// setup Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack); // information about the error will be logged to the terminal, then logged in the console
  res.status(500).send("Oh no! Something has gone wrong. ");
});

//GET all movies 2.7
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

//READ 2.5
/* app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  const movie = movies.find((movie) => movie.Title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("There is no movie with this title.");
  }
}); */

//GET movie info for one Title 2.7
app.get(
  "/movies/:Title",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    Movies.findOne({ Title: req.params.Title })
      .then((movie) => {
        res.json(movie);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//READ 2.5
/* app.get("/movies/genre/:genreName", (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find((movie) => movie.Genre.Name === genreName).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send("Genre does not exist.");
  }
}); */

//GET genre info for one genre
app.get(
  "/movies/genres/:genreName",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    Movies.findOne({ "Genre.Name": req.params.genreName })
      .then((movie) => {
        res.status(200).json(movie.Genre);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//READ 2.5
/* app.get("/movies/directors/:directorName", (req, res) => {
  const { directorName } = req.params;
  const director = movies.find(
    (movie) => movie.Director.Name === directorName
  ).Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send("There is no director with this name.");
  }
}); */

//GET info for one director
app.get(
  "/movies/directors/:directorName",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    Movies.findOne({ "Director.Name": req.params.directorName })
      .then((movie) => {
        res.json(movie.Director);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//Create 2.5
/* app.post("/users", (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send("Username needed.");
  }
}); */

//CREATE a new user 2.7 (Does not need authentication so new users can register)
app.post(
  "/users",
  // Validation logic here for request
  //you can either use a chain of methods like .not().isEmpty()
  //or use .isLength({min: 5}) which means: minimum value of 5 characters are only allowed
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check("Username", "Username contains invalid characters.").isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail,
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
            Password: req.body.Password,
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
app.get(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    Users.findOne({ Username: req.params.Username })
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
app.post(
  "/users/:Username/movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    Users.findOneAndUpdate(
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

//UPDATE 2.5
/* app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send("There is no user with this ID.");
  }
}); */

//POST 2.5
/* app.post("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array.`);
  } else {
    res.status(400).send("There is no user with this ID.");
  }
}); */

//DELETE 2.5
/* app.delete("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(
      (title) => title !== movieTitle
    );
    res
      .status(200)
      .send(`${movieTitle} has been removed from user ${id}'s array.`);
  } else {
    res.status(400).send("There is no user with this ID.");
  }
});
 */

//DELETE a user's favorite movie 2.7
app.delete(
  "/users/:Username/movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    Users.findOneAndUpdate(
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

//DELETE 2.5
/* app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    users = users.filter((user) => user.id != id);
    res.json(users);
    res.status(200).send(`User ${id} has been deleted.`);
  } else {
    res.status(400).send("There is no user with this ID.");
  }
}); */

//DELETE a user by username 2.7
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
