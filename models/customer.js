const mongoose = require("mongoose")
const Joi = require("joi")

const customerSchema = mongoose.Schema({
  isGold: { type: Boolean, default: false },
  name: { type: String, required: true, minLength: 3, maxLength: 50 },
  phone: { type: String, required: true, min: 5, max: 50 },
})
const Customer = mongoose.model("Customer", customerSchema)

const validateCustomer = (customer) => {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean(),
  }

  return Joi.validate(customer, schema)
}

module.exports.Customer = Customer
module.exports.validate = validateCustomer
