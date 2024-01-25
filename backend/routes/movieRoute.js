const express = require("express");
const { role } = require("../middleware/roleMiddleware");
const { auth } = require("../middleware/authMiddleware");
const { MovieModel } = require("../models/movie");
const movieRoute = express.Router();

// Route to add a new movie (accessible by authenticated admin users)
movieRoute.post("/Addmovie", auth, role(["Admin"]), async (req, res) => {
    try {
        // Extract payload from the request body
        const payload = req.body;

        // Check if a movie with the same title and genre already exists
        const existingMovie = await MovieModel.findOne({ title: payload.title, genre: payload.genre });

        if (existingMovie) {
            // If a movie with the same title and genre is found, return an error
            return res.status(400).send({ "message": "Movie with the same name and genre already exists" });
        }

        // Create a new movie instance based on the MovieModel
        const newMovie = new MovieModel(payload);

        // Save the new movie to the database
        await newMovie.save();

        // Respond with a success message
        res.status(200).send({ "message": "Movie added successfully" });

    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).send({ "error": error.message });
    }
});


// Route to get all movies (accessible by all users)
movieRoute.get("/movies",  async (req, res) => {
    try {
        // Fetch all movies from the database
        const movies = await MovieModel.find();
        
        // Respond with the list of movies
        res.status(200).send({movies});
    } catch (error) {
        // Handle server error and respond with an error message
        res.status(500).send({ "error": error.message });
    }
});

// Route to get a specific movie by ID (accessible by all users)
movieRoute.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const movie = await MovieModel.findById(id);
        
        if (!movie) {
            return res.status(404).send({ "message": "Movie not found" });
        }
        
        res.status(200).send({movie});
    } catch (error) {
        res.status(500).send({ "error": error.message });
    }
});


// Route to update a movie by ID (accessible by authenticated admin users)
movieRoute.put("/update/:id", auth, role(["Admin"]), async (req, res) => {
    const { id } = req.params;

    try {
        // Find and update the movie in the database by its ID
        const updatedMovie = await MovieModel.findByIdAndUpdate(id, req.body, { new: true });

        // If the movie is not found, respond with a 404 status and a message
        if (!updatedMovie) {
            return res.status(404).send({ "message": "Movie not found" });
        }

        // Respond with the updated details of the movie
        res.status(200).send({ "message": "Movie updated successfully" });
    } catch (error) {
        // Handle server error and respond with an error message
        res.status(500).send({ "error": error.message });
    }
});

// Route to delete a movie by ID (accessible by authenticated admin users)
movieRoute.delete("/delete/:id", auth, role(["Admin"]), async (req, res) => {
    const { id } = req.params;

    try {
        // Find and delete the movie in the database by its ID
        const deletedMovie = await MovieModel.findByIdAndDelete(id);

        // If the movie is not found, respond with a 404 status and a message
        if (!deletedMovie) {
            return res.status(404).send({ "message": "Movie not found" });
        }

        // Respond with a success message indicating the movie was deleted
        res.status(200).send({ "message": "Movie deleted successfully" });
    } catch (error) {
        // Handle server error and respond with an error message
        res.status(500).send({ "error": error.message });
    }
});


module.exports = { movieRoute };
