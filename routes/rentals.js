const express = require("express")
const router = express.Router()
const { Rental, validate } = require("../models/rental")
const { Customer } = require("../models/customer")
const { Movie } = require("../models/movie")

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut")
  res.send(rentals)
})

router.post("/", async (req, res) => {
  const { error } = validate(req.body)
  if (error) res.status(400).send(error.details[0].message)

  const customer = await Customer.findById(req.body.customerId)
  if (!customer) return res.status(400).send("Invalid customer!")

  const movie = await Movie.findById(req.body.movieId)
  if (!movie) return res.status(400).send("Invalid movie!")

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock")

  const rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      isGold: customer.isGold,
      phone: customer.phone,
    },
    movie: {
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  })

  const result = await rental.save()
  movie.numberInStock--
  movie.save()
  res.send(result)
})

module.exports = router
