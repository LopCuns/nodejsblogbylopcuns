import express from 'express'
import userRouter from '#Routes/user.routes.js'
import postsRouter from '#Routes/post.routes.js'
// Crear servidor de express
const expressApp = express()

// MIDDLEWARES
expressApp.use(express.json())
// ROUTERS
expressApp.use('/user', userRouter)
expressApp.use('/posts', postsRouter)
export default expressApp
