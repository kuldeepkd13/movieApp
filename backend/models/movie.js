const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
      genre: {
        type: String,
        required: true,
      },
      releaseDate: {
        type: Date,
        required: true,
      },
      image: {
        type: String, 
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      cast: [
        {
          actor: String,
          character: String,
        },
      ],
      duration: {
        type: Number, 
        required: true,
      }
})

const MovieModel = mongoose.model("movie", movieSchema);

module.exports = {MovieModel}