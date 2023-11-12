const jwt = require("jsonwebtoken")
const User = require("../models/User")

async function userVerification(req, res){
  try {
    const token = req.cookies.token
    if (!token) return res.status(401).send({message: "Access denied. No token provided!", status: false})
    
    const data = await jwt.verify(token, process.env.JWTPRIVATEKEY);
    const user = await User.findById(data.id);

    if (!user) return res.status(401).send({message: "Access denied!", status: false})
    res.status(400).send({message: "Access Granted!", status: true})

  } catch (error) {
    console.log(error)    
    res.status(400).send({message: "Failed to authorize", status: false})
  }
}

module.exports = userVerification