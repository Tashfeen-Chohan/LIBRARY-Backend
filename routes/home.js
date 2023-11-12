const router = require("express").Router()
const userVerification = require("../middlewares/userVerification")

router.post("/", userVerification)

module.exports = router;