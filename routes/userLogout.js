const router = require("express").Router()

router.post("/", (req, res) => {
  res.clearCookie("token")
})

module.exports = router;