const Joi = require("joi")
const express = require("express")
const router = express()

const genres = [
  { id: 1, genre: "Action" },
  { id: 2, genre: "Adventure" },
  { id: 3, genre: "Comedy" },
]
//Getting all the list of Genres
router.get("/", (req, res) => {
  res.send(genres)
})

//Get single genre filtered by ID
router.get("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id))
  if (!genre)
    return res.status(404).send("The genre with provided ID doesn't exists.")

  res.send(genre)
})

router.post("/", (req, res) => {
  const { error } = validateGenre(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const genre = { id: genres.length + 1, genre: req.body.genre }
  genres.push(genre)

  res.send(genre)
})

router.put("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id))
  if (!genre)
    return res.status(404).send("The genre with provided ID doesn't exists.")

  const { error } = validateGenre(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  genre.genre = req.body.genre
  res.send(genre)
})

router.delete("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id))
  if (!genre)
    return res.status(404).send("The genre with provided ID doesn't exists.")

  const index = genres.indexOf(genre)
  genres.splice(index, 1)
  res.send(genre)
})

function validateGenre(genre) {
  const schema = {
    genre: Joi.string().min(3).required(),
  }
  return Joi.validate(genre, schema)
}

module.exports = router
