import mongoose from 'mongoose'
import Todo from '../models/todoModel.js'

// Get all todos
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find()
    res.status(200).json(todos)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

// Create a new todo
export const createTodo = async (req, res) => {
  try {
    const newTodo = new Todo({
      text: req.body.text,
      completed: req.body.completed,
    })
    await newTodo.save()
    res.status(201).json(newTodo)
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

// Update a todo
export const updateTodo = async (req, res) => {
  const todoId = req.params.id
  if (!mongoose.Types.ObjectId.isValid(todoId)) {
    return res.status(400).json({ msg: 'Invalid Todo ID' })
  }

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(todoId, req.body, {
      new: true,
      runValidators: true,
    })
    if (!updatedTodo) {
      return res.status(404).json({ msg: 'Todo not found' })
    }
    res.status(200).json(updatedTodo)
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

// Delete a todo
export const deleteTodo = async (req, res) => {
  const todoId = req.params.id
  if (!mongoose.Types.ObjectId.isValid(todoId)) {
    return res.status(400).json({ msg: 'Invalid Todo ID' })
  }

  try {
    const deletedTodo = await Todo.findByIdAndDelete(todoId)
    if (!deletedTodo) {
      return res.status(404).json({ msg: 'Todo not found' })
    }
    res.status(204).json({ msg: `Todo with Id ${todoId} deleted successfully` })
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}
