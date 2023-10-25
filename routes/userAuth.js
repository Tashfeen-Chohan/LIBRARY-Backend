const router = require("express").Router()
const { User } = require("../models/User")
const bcrypt = require("bcrypt")

// USER LOGIN
router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email})
    if (!user) return res.status(400).send({message: "Invalid Credentials!"})

    const validPassword = await bcrypt.compare(user.password, req.body.password)
    if (!validPassword) return res.status(400).send({message: "Invalid Credentials!"})

    const token = user.genAuthToken()
    res.status(200).send({message: "Logged in successfully!", data: token})
  } catch (error) {
    res.status(500).send({message: error.message})
    console.log(error.message)
  }
})

module.exports = router;