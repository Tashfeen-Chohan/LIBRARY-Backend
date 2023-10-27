const mongoose = require("mongoose");
const Joi = require("joi")
const passwordComplexity = require("joi-password-complexity")

const staffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {type: String, default: "librarian"}
  },
  { timestamps: true }
);

const Staff = mongoose.model("Staff", staffSchema)

// JOI PASSWORD COMPLEXITY OPTIONS
const complexityOptions = {
  min: 6,
  max: 25,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1
}
// FUNCTION TO VALIDATE USER
function validateStaff(user){
  const schema = Joi.object({
    name: Joi.string().required().min(2).label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity(complexityOptions).label("Password") 
  })
  return schema.validate(user)
}

module.exports = {Staff, validateStaff};
