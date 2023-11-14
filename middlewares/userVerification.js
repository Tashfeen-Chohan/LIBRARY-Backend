const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config({path: "../config.env"})

async function userVerification(req, res, next){
  try {
    const token = req.cookies.token
    if (!token) return res.status(401).send({message: "Access denied. No token provided!", status: false})
    
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    if (!decoded) return res.status(401).send({message: "Access denied!", status: false})

    req.user = decoded;
    res.status(200).send({message: "Access Granted!", status: true, user: req.user})
    next()
  } catch (error) {
    console.log(error.message)    
    res.status(500).send({message: "Failed to verify user!", status: false})
  }
}

module.exports = userVerification