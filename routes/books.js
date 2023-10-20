const router = require("express").Router()
const Joi = require("joi")
const Book = require("../models/Book")
const mongoose = require('mongoose');

// =======================> CRUD OPERATIONS <========================== //

// CREATE BOOK
router.post("/", async (req, res) => {

  // JOI VALIDATION
  const {error} = validateBook(req.body)
  if (error) return res.status(400).send({message: error.details[0].message})

  try {
    
    // CREATING A NEW BOOK
    let book = new Book(req.body)
    await book.save()
    res.status(200).send({message: "Book added successfully!"})
    
  } catch (error) {
    // HADLING DUPLICATE ENTRY
    if (error.code === 11000) {
      return res.status(400).send({message: "Duplicate entry! This book already exists."})
    }
    res.status(500).send({message: "Could not add book!"})
    console.log(error)
  }
})

// READING BOOKS
router.get("/", async (req, res) => {
  try {
    const books = await Book.find()
    res.status(200).send({books: books})

  } catch (error) {
    res.status(500).send({message: "Could not get all books!"})
    console.log(error)
  }
})

// READING SINGLE BOOK
router.get("/:id", async(req, res) => {

  // CHECKING BOOK ID
  if(!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send({message: "Invlaid Book Id!"})

  try {
    const book = await Book.findById(req.params.id)
    if (!book) return res.status(404).send({message: "Book not found!"})

    res.status(200).send({book: book})

  } catch (error) {
    res.status(500).send({message: "Could not get single book!"})
    console.log(error)
  }
})

// UPDATING BOOK
router.put("/:id", async (req, res) => {

  // CHECKING BOOK ID
  if(!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send({message: "Invlaid Book Id!"})

  // JOI VALIDATION
  const {error} = validateBook(req.body)
  if (error) return res.status(400).send({message: error.details[0].message})

  try {
    
    let book = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true})
    if (!book) return res.status(404).send({message: "Book not found!"})

    await book.save()
    res.status(200).send({message: "Book updated successfully!"})

  } catch (error) {
    if (error.code === 11000) return res.status(400).send({message: "Duplicate entry! This book already exists."})
    res.status(500).send({message: "Could not update book!"})
    console.log(error)
  }
})

// DELETE BOOK
router.delete("/:id", async (req, res) => {

  // CHECKING BOOK ID
  if(!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send({message: "Invlaid Book Id!"})

  try {
    const book = await Book.findByIdAndRemove(req.params.id)
    if (!book) return res.status(404).json({message: "Book not found!"})

    return res.status(200).json({message: "Book deleted successfully!"})

  } catch (error) {
    res.status(500).send({message: "Could not delete book!"})
    console.log(error)
  }
})


// FUNCTION TO VALIDATE BOOK
function validateBook(book){
  const schema = Joi.object({
    title: Joi.string().required().min(2),
    author: Joi.string().required().min(2),
    publisher: Joi.string().required().min(2),
    category: Joi.string().required().min(2),
    copies: Joi.number().required().min(5).max(1000),
    price: Joi.number().required().min(5).max(1000)
  })
  return schema.validate(book)
}

module.exports = router;