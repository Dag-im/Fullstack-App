import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
  updateTodo,
  setInput,
  setIsEditing,
  setCurrentTodoId,
} from './state/todoSlice'

function App() {
  const todos = useSelector((state) => state.todos.items)
  const input = useSelector((state) => state.todos.input) // Default to empty string
  const isEditing = useSelector((state) => state.todos.isEditing)
  const currentTodoId = useSelector((state) => state.todos.currentTodoId)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  const addTodoHandler = () => {
    if (input.trim() === '') return
    dispatch(addTodo({ text: input }))
    dispatch(setInput(''))
  }

  const toggleTodoHandler = (id) => {
    dispatch(toggleTodo(id))
  }

  const deleteTodoHandler = (id) => {
    dispatch(deleteTodo(id))
  }

  const editTodoHandler = (id) => {
    const todo = todos.find((todo) => todo._id === id)
    dispatch(setInput(todo.text))
    dispatch(setIsEditing(true))
    dispatch(setCurrentTodoId(id))
  }

  const updateTodoHandler = () => {
    const updatedTodo = { text: input }
    dispatch(updateTodo({ id: currentTodoId, text: updatedTodo.text }))
    console.log(updatedTodo.text, currentTodoId)
    dispatch(setIsEditing(false))
    dispatch(setInput(''))
    dispatch(setCurrentTodoId(null))
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 bg-white shadow-lg rounded-lg'>
        <h1 className='text-2xl font-bold text-center mb-6'>Todo App</h1>
        <div className='mb-4 flex'>
          <input
            type='text'
            className='flex-grow p-2 rounded-l-md border border-gray-500 focus:outline-none focus:border-blue-500'
            value={input}
            onChange={(e) => dispatch(setInput(e.target.value))}
            placeholder='Add a new todo'
          />
          <button
            className={`${
              isEditing
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white px-4 py-2 rounded-r-md`}
            onClick={isEditing ? updateTodoHandler : addTodoHandler}
          >
            {isEditing ? 'Update' : 'Add'}
          </button>
        </div>
        <ul>
          {todos.map((todo) => (
            <li
              key={todo._id}
              className={`flex items-center justify-between p-2 mb-2 border rounded-md ${
                todo.completed ? 'bg-green-100' : 'bg-gray-100'
              }`}
            >
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  checked={todo.completed}
                  onChange={() => toggleTodoHandler(todo._id)}
                  className='mr-2'
                />
                <span className={`${todo.completed ? 'line-through' : ''}`}>
                  {todo.text}
                </span>
              </div>
              <div className='flex space-x-2'>
                <button
                  className='text-blue-500 hover:text-blue-700'
                  onClick={() => editTodoHandler(todo._id)}
                >
                  Edit
                </button>
                <button
                  className='text-red-500 hover:text-red-700'
                  onClick={() => deleteTodoHandler(todo._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
