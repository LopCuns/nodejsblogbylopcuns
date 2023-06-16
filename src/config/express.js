import express from 'express'
import userRouter from '#Routes/user.routes.js'
import postsRouter from '#Routes/post.routes.js'
import cors from 'cors'
// Crear servidor de express
const expressApp = express()

// MIDDLEWARES
expressApp.use(express.json())
expressApp.use(cors())
// ROUTERS
expressApp.use('/user', userRouter)
expressApp.use('/posts', postsRouter)
export default expressApp
