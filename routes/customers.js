const { Customer, validate } = require("../models/customer")
const express = require("express")
const router = express.Router()

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
  const { error } = validate(req.body)
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
  const { error } = validate(req.body)
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

module.exports = router
