const Joi = require("joi")
const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()

const customerSchema = new mongoose.Schema({
  isGold: { type: Boolean, default: false },
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
  phone: { type: String, required: true, minlength: 5, maxlength: 50 },
})

const Customer = mongoose.model("Customer", customerSchema)

//get all customers
router.get("/", async (req, res) => {
  const customers = await Customer.find()
  return res.send(customers)
})

//get a single customer based on id
router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id)

  if (!customer)
    return res.status(404).send("Customer with given ID doesn't exists.")

  res.send(customer)
})

//add a new customer
router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  })
  customer = await customer.save()
  return res.send(customer)
})

//update a customer
router.put("/:id", async (req, res) => {
  const { error } = validateCustomer(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone,
    },
    { new: true }
  )
  if (!customer)
    return res.status(404).send("Customer with given ID doesn't exists.")

  res.send(customer)
})

//delete a customer
router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id)

  if (!customer)
    return res.status(404).send("Customer with given ID doesn't exists.")

  res.send(customer)
})

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean(),
    phone: Joi.string().min(5).max(50).required(),
  }
  return Joi.validate(customer, schema)
}

module.exports = router
