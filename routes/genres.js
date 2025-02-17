const Joi = require("joi")
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

const Genre = mongoose.model(
  "Genre",
  new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 50 },
  })
)

//Getting all the list of Genres
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name")
  res.send(genres)
})

//Get single genre filtered by ID
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id)
  if (!genre)
    return res.status(404).send("The genre with provided ID doesn't exists.")

  res.send(genre)
})

router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let genre = new Genre({ name: req.body.name })
  genre = await genre.save(genre)

  res.send(genre)
})

router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  )
  if (!genre)
    return res.status(404).send("The genre with provided ID doesn't exists.")

  res.send(genre)
})

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id)
  if (!genre)
    return res.status(404).send("The genre with provided ID doesn't exists.")

  res.send(genre)
})

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  }
  return Joi.validate(genre, schema)
}

module.exports = router
