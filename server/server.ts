import express from 'express'
import { join } from 'node:path'
import tasksRoutes from './routes/taskRoutes'

const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, 'public')))

server.use('/api/v1/task', tasksRoutes)

export default server
