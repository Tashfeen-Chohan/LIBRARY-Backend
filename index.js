const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const books = require("./routes/books")
const staff = require("./routes/staff")
const staffAuth = require("./routes/staffAuth")
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
  methods: ["GET", "POST"],
  credentials: true
}))
app.use(cookieParser())
app.use("/api/book", books)
app.use("/api/staff", staff)
app.use("/api/staffAuth", staffAuth)
app.use("/adminDashboard", adminDashboard)


// PORT ENVIRONMENT
const PORT = 3000
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))

