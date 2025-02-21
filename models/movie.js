const Joi = require("joi")
const mongoose = require("mongoose")
const { genreSchema } = require("./genre")

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlenght: 255,
  },
  genres: { type: genreSchema, required: true },
  numberInStock: { type: Number, required: true, minlength: 0, maxlength: 255 },
  dailyRentalRate: {
    type: Number,
    required: true,
    minlength: 0,
    maxlength: 255,
  },
})

const Movie = mongoose.model("Movie", movieSchema)

function validateMovie(movie) {
  const schema = {
    title: Joi.string().required().min(5).max(50),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
  }

  return Joi.validate(movie, schema)
}

module.exports.Movie = Movie
module.exports.validate = validateMovie
