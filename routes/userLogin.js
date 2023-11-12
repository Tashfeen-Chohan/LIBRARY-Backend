const router = require("express").Router()
const {User}  = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// USER LOGIN
router.post("/", async(req, res) => {
  try {
    const user = await User.findOne({email: req.body.email})
    if (!user) return res.status(400).send({message: "Invalid Credentials!"})

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send({message: "Invalid Credentials!"})

    const token = jwt.sign({id: user._id}, process.env.JWTPRIVATEKEY, {expiresIn: "1d"})
    res.cookie("token", token)
    res.send({message: "User logged in successfully!", success: true, user: user})
  
  } catch (error) {
    res.status(500).send({message: error.message})
    console.log(error.message)
  }
})



module.exports = router;