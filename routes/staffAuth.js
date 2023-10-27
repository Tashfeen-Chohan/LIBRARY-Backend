const router = require("express").Router()
const {Staff}  = require("../models/Staff")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// USER LOGIN
router.post("/", async(req, res) => {
  try {
    const staff = await Staff.findOne({email: req.body.email})
    if (!staff) return res.status(400).send({message: "Invalid Credentials!"})

    const validPassword = await bcrypt.compare(req.body.password, staff.password)
    if (!validPassword) return res.status(400).send({message: "Invalid Credentials!"})

    const token = jwt.sign({_id: staff._id}, process.env.JWTPRIVATEKEY, {expiresIn: "14d"})
    res.status(200).send({message: "Logged in successfully!", data: token})
  
  } catch (error) {
    res.status(500).send({message: error.message})
    console.log(error.message)
  }
})

module.exports = router;