const mongoose = require("mongoose")
const express = require("express")
const home = require("./routes/home")
const genres = require("./routes/genres")
const customers = require("./routes/customers")
const movies = require("./routes/movies")
const app = express()

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB database..."))
  .catch((err) => console.error(err))

app.use(express.json())

app.use("/", home)
app.use("/api/genres", genres)
app.use("/api/customers", customers)
app.use("/api/movies", movies)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening to port ${port}...`)
})
