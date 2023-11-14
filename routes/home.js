const router = require("express").Router()
const userVerification = require("../middlewares/userVerification")

router.post("/", userVerification, (req, res) => {
  // console.log(req.user.role)
  if(req.user.role === 'reader') return res.status(200).send({message: "Welcome Dear Reader!", success: true, role})
  if(req.user.role === 'librarian') return res.status(200).send({message: "Welcome Dear Librarian!", success: true, role})
  if(req.user.role === 'admin') return res.status(200).send({message: "Welcome Dear Admin!", success: true, role})
})

module.exports = router;