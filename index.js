const mongoose = require("mongoose")
const express = require("express")
const home = require("./routes/home")
const genres = require("./routes/genres")
const app = express()

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB database..."))
  .catch((err) => console.error(err))

app.use(express.json())

app.use("/", home)
app.use("/api/genres", genres)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening to port ${port}...`)
})
