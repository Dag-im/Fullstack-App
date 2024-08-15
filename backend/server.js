// server.js

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db.js'
import todoRoutes from './routes/todoRoutes.js'

dotenv.config() // Load environment variables from .env file

const app = express()
const PORT = process.env.PORT || 8000

// Connect to MongoDB
connectDB()

app.use(express.json())
app.use(
  cors({
    origin: '*', // Adjust as necessary for your security needs
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

// Use todo routes
app.use('/api/todos', todoRoutes)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
