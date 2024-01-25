# Movie Management System

## Description

This application provides a Movie Management System where users can register, login, and perform CRUD operations on movies. 


## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Routes](#routes)
  - [User Routes](#user-routes)
  - [Movie Routes](#movie-routes)
 

## Features

- User Registration and Authentication with JWT tokens
- CRUD operations on movies
- User wishlist management for adding, viewing, and removing movies from the wishlist

## Technologies Used

- Node.js
- React.js
- Express.js
- MongoDB
- JWT-based authentication

## Installation

  ### For Backend

   1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/movieApp.git
    cd backend
    ```

  2. Install dependencies:

    ```bash
    npm install
    ```

  3. Set up your MongoDB connection by creating a `.env` file in the root directory with the following content:

    ```env
    MONGOURL=your-mongodb-connection-string
    port=your-port
    secretKey=your-Secret-Key
 
    ```

  - Replace `your-mongodb-connection-string` with your MongoDB connection string .
  - Replace `your-port` with Port number .
  - Replace `your-Secret-Key` with Secretkey for JWT authentication.

  4. Run the application:

    ```bash
    npm run server
    ```

  The server will be running on http://localhost:8080 by default.

 ### For Frontend
 
   1. Navigate to the frontend directory:

    ```bash
    cd frontend
    ```
    
  2. Install dependencies:

    ```bash
    npm install
    ```
    
   3. Start the frontend application:
    
    ```bash
    npm start
    ```
    
   The frontend will be running on http://localhost:3000.


## Routes


### User Routes

| Method | Endpoint             | Description              | Authentication Required  |
| ------ | ---------------------| ------------------------ | ------------------------ |
| POST   | `/user/register`     | Create a new user        | No                       |
| POST   | `/user/login`        | Log in an existing user  | No                       |
| POST   | `/user/logout`       | Log out a user           | Yes                      |
| POST   | `/user//addtowishlist/:movieId`| Add a movie to the wishlist | Yes                      |
| GET    | `/user/wishlist`     | Get all movies in the wishlist   | Yes                      |
| DELETE | `/user/removeFromWishlist/:movieId`|Remove a movie from the wishlist     | Yes                      |




### Movie Routes

| Method | Endpoint             | Description              | Authentication Required  |
| ------ | ---------------------| ------------------------ | ------------------------ |
| POST   | `/movie/Addmovie`     | Add a new movie          | 	Yes (Admin)             |
| POST   | `/movie/movies`       | 	Get all movies | No                       |
| POST   | `/movie/:id`       | Get a specific movie     | No                   |
| POST   | `/movie/update/:id`     | 	Update a movie         | 	Yes (Admin)             |
| POST   | `/movie/delete/:id`       | 	Delete a movie | Yes (Admin)                      |


