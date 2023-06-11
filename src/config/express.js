import express from 'express'
import userRouter from '#Routes/user.routes.js'
// Crear servidor de express
const expressApp = express()

// MIDDLEWARES
expressApp.use(express.json())
// ROUTERS
expressApp.use('/user', userRouter)
export default expressApp
