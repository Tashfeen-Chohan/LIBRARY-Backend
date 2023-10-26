const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi")
const passwordComplexity = require("joi-password-complexity")

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema)

// JOI PASSWORD COMPLEXITY OPTIONS
const complexityOptions = {
  min: 6,
  max: 25,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1
}
// FUNCTION TO VALIDATE USER
function validateUser(user){
  const schema = Joi.object({
    name: Joi.string().required().min(2).label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity(complexityOptions).label("Password") 
  })
  return schema.validate(user)
}

module.exports = {User, validateUser};
