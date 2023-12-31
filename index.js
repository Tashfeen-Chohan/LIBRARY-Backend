const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const books = require("./routes/books")
const userRegister = require("./routes/userRegister")
const userLogin = require("./routes/userLogin")
const userLogout = require("./routes/userLogout")
const home = require("./routes/home")
const adminDashboard = require("./routes/adminDashboard")

// DOTENV CONFIG
dotenv.config({path: "./config.env"})
const DATABASE = process.env.MONGODB_URL

// DATABASE CONNECTION
mongoose
  .connect(DATABASE)
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.log("Could not connect to the database", err))

// MIDDLEWARE FUNCTION
app.use(express.json())
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))
app.use(cookieParser())
app.use("/", home)
app.use("/api/book", books)
app.use("/api/userRegister", userRegister)
app.use("/api/userLogin", userLogin)
app.use("/userLogout", userLogout)
// app.use("/adminDashboard", adminDashboard)


// PORT ENVIRONMENT
const PORT = 3000
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))

