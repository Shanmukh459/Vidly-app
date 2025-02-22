const Joi = required("joi")
const mongoose = require("mongoose")

const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
      },
      isGold: {
        type: Boolean,
        required: true,
      },
      phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
      },
    }),
    required: true,
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        trim: true,
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
      },
    }),
    required: true,
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateReturned: {
    type: Date,
  },
  retalFee: {
    type: Number,
    min: 0,
  },
})

const Rental = mongoose.model("Rental", rentalSchema)

function validateRental(rental) {
  const schema = {
    customerId: Joi.string().required(),
    ovieId: Joi.string().required(),
  }
  return Joi.validate(rental, schema)
}

module.exports.Rental = Rental
module.exports.validate = validateRental
