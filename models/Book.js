const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true},
    author: { type: String, required: true },
    publisher: { type: String, required: true },
    category: { type: String, required: true },
    copies: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

// COMPOUND INDEX ON TITLE & AUTHOR TO ENFORCE UNIQUENESS
bookSchema.indexes({title: 1, author: 1}, {unique: true})

const Book = new mongoose.model("Book", bookSchema)

module.exports = Book;
