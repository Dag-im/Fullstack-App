// todoModel.js

import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Optional: adds createdAt and updatedAt fields
  }
)

const Todo = mongoose.model('Todo', todoSchema)

export default Todo
