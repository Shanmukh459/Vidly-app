const Joi = require("joi")
const express = require("express")

const app = express()
app.use(express.json())

const genres = [
  { id: 1, genre: "Action" },
  { id: 2, genre: "Adventure" },
  { id: 3, genre: "Comedy" },
]

//Home page
app.get("/", (req, res) => {
  res.send("Hello world!")
})

//Getting all the list of Genres
app.get("/api/genres", (req, res) => {
  res.send(genres)
})

//Get single genre filtered by ID
app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id))

  if (!genre)
    return res.status(404).send("The genre with provided ID doesn't exists.")

  res.send(genre)
})

app.post("/api/genres", (req, res) => {
  const schema = {
    genre: Joi.string().min(3).required(),
  }
  const result = Joi.validate(req.body, schema)

  if (result.error) return res.status(400).send(result.error.details[0].message)

  const genre = { id: genres.length + 1, genre: req.body.genre }
  genres.push(genre)

  res.send(genre)
})

app.put("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id))

  if (!genre)
    return res.status(404).send("The genre with provided ID doesn't exists.")

  const schema = {
    genre: Joi.string().min(3).required(),
  }
  const result = Joi.validate(req.body, schema)
  if (result.error) return res.status(400).send(result.error.details[0].message)

  genre.genre = req.body.genre
  res.send(genre)
})

app.listen(3000, () => {
  console.log("Listening to port 3000...")
})
