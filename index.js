// setup requirements and constants
const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  uuid = require("uuid"),
  /* fs = require("fs"), */
  path = require("path");
const app = express();

app.use(bodyParser.json());

let users = [
  {
    id: 1,
    name: "Kim",
    favoriteMovies: ["Star Wars: Revenge of the Sith"],
  },
  {
    id: 2,
    name: "Joe",
    favoriteMovies: ["One Piece Film: Red"],
  },
];

let movies = [
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
    Featured: "",
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
    Featured: "",
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
    Featured: "",
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
    Featured: "",
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
    Featured: "",
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
    Featured: "",
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
      Bio: "Jon Watts is an American filmmaker and screenwriter. He directed Cop Car and Clown before he was picked by Marvel and Sony to direct Spider-Man: Homecoming starring Tom Holland and Zendaya. It's success resulted in two sequels, Far from Home in 2019 and No Way Home in 2021. He was also picked by Marvel to direct a Fantastic Four reboot film following the failure of Josh Trank's Fant4stic, but dropped the directing role in April 2022. Born june 28, 1981.",
    },
    ImageURL: "",
    Featured: "",
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
    Featured: "",
  },

  {
    Title: "Star Wars: Episode I - The Phantom Menace",
    Year: "1999",
    Description:
      "When the Trade Federation organize a blockade around the planet Naboo, the Supreme Chancellor Valorum sends the Jedi Qui-Gon Jinn and Obi-Wan Kenobi to negotiate the end of the blockade. However the evil Viceroy Nute Gunray is ordered to kill the Jedi and invade Naboo. However the Jedi escape and Qui-Gon saves the life of the clumsy Gungan Jar Jar Binks. The outcast native takes the Jedi to his submerged city and the Gungan leader gives transportation to them. The Jedi head to the capital to warn Queen Amidala about the invasion. However she has been captured by the Federation droids but the Jedi rescue the queen and her court and they flee in a spacecraft that is damaged when they cross the blockade. They land on a desert planet and Qui-Gon Jinn goes to the town with Jar Jar, the droid R2-D2 and the queen's assistant Padmé to seek the necessary part for the spacecraft. When they find the component, they do not have money to buy it. But the slave boy Anakin Skywalker offers to dispute a race with his pod to raise the necessary money. Qui-Gon feels the Force in the boy and accepts his offer.",
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
    Featured: "",
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
    Featured: "",
  },
];

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
app.get("/movies", (req, res) => {
  res.status(200).json(movies);
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

//READ
app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  const movie = movies.find((movie) => movie.Title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("There is no movie with this title.");
  }
});

//READ
app.get("/movies/genre/:genreName", (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find((movie) => movie.Genre.Name === genreName).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send("Genre does not exist.");
  }
});

//READ
app.get("/movies/directors/:directorName", (req, res) => {
  const { directorName } = req.params;
  const director = movies.find(
    (movie) => movie.Director.Name === directorName
  ).Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send("There is no director with this name.");
  }
});

//Create
app.post("/users", (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send("Username needed.");
  }
});

//UPDATE
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send("There is no user with this ID.");
  }
});

//POST
app.post("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array.`);
  } else {
    res.status(400).send("There is no user with this ID.");
  }
});

//DELETE
app.delete("/users/:id/:movieTitle", (req, res) => {
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

//DELETE
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    users = users.filter((user) => user.id != id);
    res.json(users);
    res.status(200).send(`User ${id} has been deleted.`);
  } else {
    res.status(400).send("There is no user with this ID.");
  }
});
