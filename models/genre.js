const mongoose = require("mongoose")
const Joi = require("joi")

const genreSchema = mongoose.Schema({
  name: { type: String, required: true, minLength: 5, maxLength: 50 },
})
const Genre = mongoose.model("Genre", genreSchema)

const validateGenre = (genre) => {
  const schema = {
    name: Joi.string().min(3).required(),
  }
  return Joi.validate(genre, schema)
}

module.exports.Genre = Genre
module.exports.validate = validateGenre
module.exports.genreSchema = genreSchema
