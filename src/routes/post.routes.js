import express from 'express'
import verifyJWT from '#Dto/verifyJWT.dto.js'
import createPostDTO from '#Dto/postsDTO/post-create.dto.js'
import commentPostDTO from '#Dto/postsDTO/posts-comment.dto.js'
import modifyPostDTO from '#Dto/postsDTO/posts-modify.dto.js'
import getPostDTO from '#Dto/postsDTO/posts-get.dto.js'
import emptyBodyDTO from '#Dto/emptyBody.dto.js'
import createPostController from '#Controllers/posts/posts-create.controller.js'
import likePostController from '#Controllers/posts/posts-like.controller.js'
import dislikePostController from '#Controllers/posts/posts-dislike.dto.js'
import commentPostController from '#Controllers/posts/post-comment.controller.js'
import deleteCommentPostController from '#Controllers/posts/post-deleteComment.controller.js'
import editCommentPostController from '#Controllers/posts/post-editComment.controller.js'
import modifyPostController from '#Controllers/posts/post-modify.controller.js'
import deletePostController from '#Controllers/posts/post-delete.controller.js'
import getPostByIdController from '#Controllers/posts/post-getById.controller.js'
import getPostByAuthorTitleController from '#Controllers/posts/post-getByAuthorTitle.controller.js'

const postsRouter = express.Router()
// ENDPOINTS
// Crear un nuevo post
postsRouter.post('/create', verifyJWT, createPostDTO, createPostController)
// Dar me gusta a un post
postsRouter.post('/like/:postId', verifyJWT, emptyBodyDTO, likePostController)
// Quitar me gusta a un post
postsRouter.post(
  '/dislike/:postId',
  verifyJWT,
  emptyBodyDTO,
  dislikePostController
)
// Comentar en un post
postsRouter.post(
  '/comment/:postId',
  verifyJWT,
  commentPostDTO,
  commentPostController
)
// Eliminar un comentario
postsRouter.post(
  '/comment-delete/:postId',
  verifyJWT,
  emptyBodyDTO,
  deleteCommentPostController
)
// Editar un comentario
postsRouter.patch(
  '/comment-edit/:postId',
  verifyJWT,
  commentPostDTO,
  editCommentPostController
)
// Modificar un post
postsRouter.patch(
  '/modify/:postId',
  verifyJWT,
  modifyPostDTO,
  modifyPostController
)
// Eliminar un post
postsRouter.delete(
  '/delete/:postId',
  verifyJWT,
  emptyBodyDTO,
  deletePostController
) // TODO CONTROLLER
// Obtener un post por su _id
postsRouter.get(
  '/get-byid/:postId',
  verifyJWT,
  emptyBodyDTO,
  getPostByIdController
)
// Obtener un post por su autor y título
postsRouter.get('/get', getPostDTO, getPostByAuthorTitleController) // TODO CONTROLLER

export default postsRouter
