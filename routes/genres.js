const { Genre, validate } = require("../models/genre")
const express = require("express")
const router = express.Router()

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
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let genre = new Genre({ name: req.body.name })
  genre = await genre.save(genre)

  res.send(genre)
})

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body)
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

module.exports = router
