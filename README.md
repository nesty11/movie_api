# 🎬 Movie API Documentation

Server-side component of a "movies" web application, which will provide user with access to information about different movies, directors, and genres. Users will be able to sign up, update their personal information, and create a list of their favorite movies.

## 🔒 Authentication

### 🚪 Login with username and password

- **URL**: `/login`
- **HTTP Method**: `POST`
- **Request Body Data Format**:
  - Parameters:
    - {Key: Username, Value: username}
    - {Key: Password, Value: password}
- **Response Body Data Format**:
  - A JSON object holding data of the user with JWT Bearer token string.

## 🎥 Movies

### 🎥 Get a list of movies

- **URL**: `/movies`
- **HTTP Method**: `GET`
- **Request Body Data Format**: None
- **Response Body Data Format**: A JSON object holding data of a list of movies.

### 🎬 Get data about a single movie

- **URL**: `/movies/:Title`
- **HTTP Method**: `GET`
- **Request Body Data Format**: None
- **Response Body Data Format**: A JSON object holding data about a single movie.

### 🎞️ Get data about a movie genre

- **URL**: `/movies/genre/:genreName`
- **HTTP Method**: `GET`
- **Request Body Data Format**: None
- **Response Body Data Format**: A JSON object holding data about a specific movie genre.

### 🎥 Get data about a specific movie director

- **URL**: `/movies/directors/:directorName`
- **HTTP Method**: `GET`
- **Request Body Data Format**: None
- **Response Body Data Format**: A JSON object holding data about a single movie director.

## 👤 Users

### 📝 Create data for a new user

- **URL**: `/users`
- **HTTP Method**: `POST`
- **Request Body Data Format**:
  - A JSON object holding data about a user to add, structured as:
    ```plaintext
    Users.create({
      Name: req.body.Name,
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday,
    })
    ```
- **Response Body Data Format**: A JSON object holding data about a movie, including an ID.

### 👥 Get all users

- **URL**: `/users`
- **HTTP Method**: `GET`
- **Request Body Data Format**: None
- **Response Body Data Format**: A JSON object holding data of a list of users.

### 👤 Get a user

- **URL**: `/users/:Username`
- **HTTP Method**: `GET`
- **Request Body Data Format**: None
- **Response Body Data Format**: A JSON object holding data of a specific user.

### ✏️ Update a user's info by username

- **URL**: `/users/:Username`
- **HTTP Method**: `PUT`
- **Request Body Data Format**:
  - A JSON object holding data about a user to add, structured as:
    ```plaintext
    {Name: req.body.Name,
    Username: req.body.Username,
    Password: req.body.Password,
    Email: req.body.Email,
    Birthday: req.body.Birthday, }
    ```
- **Response Body Data Format**: A JSON object holding updated data of a user.

### 🎬 Adding user's favorite movies

- **URL**: `/users/:Username/movies/:MovieID`
- **HTTP Method**: `POST`
- **Request Body Data Format**: None
- **Response Body Data Format**: A JSON object updating the user's favorite movies.

### ❌ Deleting a user's favorite movie

- **URL**: `/users/:Username/movies/:MovieID`
- **HTTP Method**: `DELETE`
- **Request Body Data Format**: None
- **Response Body Data Format**: A text message indicating the user's favorite movie being deleted.

### 🗑️ Deleting a user by username

- **URL**: `/users/:Username`
- **HTTP Method**: `DELETE`
- **Request Body Data Format**: None
- **Response Body Data Format**: A text message indicating a user being deleted.
