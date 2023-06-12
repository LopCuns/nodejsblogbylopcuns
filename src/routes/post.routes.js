import express from 'express'
import verifyJWT from '#Dto/verifyJWT.dto.js'
import createPostDTO from '#Dto/postsDTO/post-create.dto.js'
import commentPostDTO from '#Dto/postsDTO/posts-comment.dto.js'
import modifyPostDTO from '#Dto/postsDTO/posts-modify.dto.js'
import getPostDTO from '#Dto/postsDTO/posts-get.dto.js'
import createPostController from '#Controllers/posts/posts-create.controller.js'

const postsRouter = express.Router()
// ENDPOINTS
// Crear un nuevo post
postsRouter.post('/create', verifyJWT, createPostDTO, createPostController)
// Dar me gusta a un post
postsRouter.post('/like/:postId', verifyJWT)
// Quitar me gusta a un post
postsRouter.post('/dislike/:postId')
// Comentar en un post
postsRouter.post('/comment/:postId', verifyJWT, commentPostDTO)
// Modificar un post
postsRouter.patch('/modify/:postId', verifyJWT, modifyPostDTO)
// Eliminar un post
postsRouter.delete('/delete/:postId', verifyJWT)
// Obtener un post por su _id
postsRouter.get('/get-byid/:postId')
// Obtener un post por su autor y título
postsRouter.get('/get', getPostDTO)

export default postsRouter
