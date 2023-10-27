const router = require("express").Router()
const {Staff, validateStaff} = require("../models/Staff")
const bcrypt = require("bcrypt")

// USER REGISTERATION
router.post("/", async(req, res) => {
  const {error} = validateStaff(req.body)
  if (error) return res.status(400).send({message: error.details[0].message})

  try {
    let user = await Staff.findOne({email: req.body.email})
    if (user) return res.status(409).send({message: "Staff with given email already exists!"})

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    user = new Staff({...req.body, password: hashPassword})
    await user.save()

    res.status(200).send({message: "Staff registered successfully!"})
  } catch (error) {
    res.status(500).send({message: error.message})
    console.log(error.message)
  }
})

module.exports = router;
