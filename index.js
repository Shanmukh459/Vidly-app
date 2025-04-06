const Joi = require("joi")
const express = require("express")
const app = express()
app.use(express.json())

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Adventure" },
  { id: 3, name: "Drama" },
]

app.get("/api/genres", (req, res) => {
  res.send(genres)
})

app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id))

  if (!genre) return res.status(400).send("Genre with given ID doesn't exist.")

  res.send(genre)
})

app.post("/api/genres", (req, res) => {
  const schema = {
    name: Joi.string().min(3).required(),
  }
  const result = Joi.validate(req.body, schema)
  if (result.error) return res.status(400).send(result.error.details[0].message)

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  }
  genres.push(genre)
  res.send(genre)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))
