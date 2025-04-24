const mongoose = require("mongoose")
const Joi = require("joi")
const express = require("express")
const router = express.Router()

const customerSchema = mongoose.Schema({
  isGold: { type: Boolean, default: false },
  name: { type: String, required: true, minLength: 3, maxLength: 50 },
  phone: { type: String, required: true, min: 5, max: 50 },
})
const Customer = mongoose.model("Customer", customerSchema)

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name")
  res.send(customers)
})

router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
  })

  customer = await customer.save()
  res.send(customer)
})

const validateCustomer = (customer) => {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean(),
  }

  return Joi.validate(customer, schema)
}
module.exports = router
