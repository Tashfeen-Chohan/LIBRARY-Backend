const jwt = require("jsonwebtoken")

async function verifyStaffToken(res, req, next){
  const token = req.cookie.token
  if (!token) return res.status(401).send({message: "No token provided!"})
  try {
    const decoded = jwt.verify(token, JWTPRIVATEKEY)
    req.staff = decoded.staff
    next()
  } catch (error) {
    res.status(403).send({message: "Failed to authenticate token!"})
  }
}

module.exports = verifyStaffToken