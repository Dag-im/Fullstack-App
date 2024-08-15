import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    input: '',
    isEditing: false,
    currentTodoId: null,
  },
  reducers: {
    setInput: (state, action) => {
      state.input = action.payload
    },
    setIsEditing: (state, action) => {
      state.isEditing = action.payload
    },
    setCurrentTodoId: (state, action) => {
      state.currentTodoId = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.items = action.payload
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (todo) => todo._id === action.payload._id
        )
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((todo) => todo._id !== action.payload)
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (todo) => todo._id === action.payload._id
        )
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
  },
})

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get('http://localhost:8000/api/todos')
  return response.data
})

export const addTodo = createAsyncThunk('todos/addTodo', async (newTodo) => {
  const response = await axios.post('http://localhost:8000/api/todos', newTodo)
  return response.data
})
export const toggleTodo = createAsyncThunk(
  'todos/toggleTodo',
  async (id, { getState }) => {
    const todo = getState().todos.items.find((todo) => todo._id === id)
    const updatedTodo = { ...todo, completed: !todo.completed }
    const response = await axios.patch(
      `http://localhost:8000/api/todos/${id}`,
      updatedTodo
    )
    return response.data
  }
)
export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  await axios.delete(`http://localhost:8000/api/todos/${id}`)
  return id
})

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async ({ id, text }) => {
    const response = await axios.patch(
      `http://localhost:8000/api/todos/${id}`,
      { text }
    )
    return response.data
  }
)

export default todoSlice.reducer
export const { setInput, setIsEditing, setCurrentTodoId } = todoSlice.actions
