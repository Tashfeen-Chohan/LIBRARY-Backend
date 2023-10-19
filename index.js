const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const books = require("./routes/books")

// DOTENV CONFIG
dotenv.config({path: "./env"})

// DATABASE CONNECTION
mongoose
  .connect("mongodb://127.0.0.1/Library")
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.log("Could not connect to the database", err))

// MIDDLEWARE FUNCTION
app.use(express.json())
app.use(cors())
app.use("/api/book", books)


// PORT ENVIRONMENT
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))

