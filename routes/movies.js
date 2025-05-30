const express = require("express")
const { Movie, validate } = require("../models/movie")
const { Genre } = require("../models/genre")
const router = express.Router()

router.get(async (req, res) => {
  const movies = await Movie.find().sort("title")
  res.send(movies)
})

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id)

  if (!movie) return res.status(404).send("Movie with given ID doesn't exist.")

  res.send(movie)
})

router.post("/", async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const genre = await Genre.findById(req.body.genreId)
  if (!genre) return res.status(400).send("Invalid genre")

  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  })

  const result = await movie.save()
  res.send(result)
})

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const genre = await Genre.findById(req.body.genreId)
  if (!genre) return res.status(400).send("Invalid genre")

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  )
  if (!movie) return res.status(404).send("Movie with given ID doesn't exist.")

  res.send(movie)
})

router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id)
  if (!movie) return res.status(404).send("Movie with given ID doesn't exist.")

  res.send(movie)
})

module.exports = router
