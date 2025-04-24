const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()

const customerSchema = mongoose.Schema({
  isGold: { type: Boolean, default: false },
  name: { type: String, required: true, minLength: 3, maxLength: 50 },
  phone: { type: String, required: true },
})
const Customer = mongoose.model("Customer", customerSchema)

router.get("/", async (req, res) => {
  const customers = await Customer.find()
  res.send(customers)
})

module.exports = router
