const router = require("express").Router()
const verifyStaffToken = require("../middlewares/verifyStaffToken")

router.get("/adminDashboard", verifyStaffToken, async (req, res) => {
  if (req.staff.role === "admin"){
    return res.status(200).send({message: "Welcome, you logged in as Admin"})
  }
  else {
    return res.status(403).send({message: "You are not Admin!"})
  }
})

module.exports = router;