import { getPostById } from '../lib.controller.js'
import { postNotFound } from '#Errors/posts.errors.js'

const getPostByIdController = async (req, res) => {
  // Obtener el postId de la request
  const { postId } = req.params
  // Obtener el post de la base de datos
  const post = await getPostById(postId)
  // Si el post no existe, entonces devolver un error 404 ( No encontrado )
  if (!post) {
    return postNotFound(res, `Post con _id ${postId} no encontrado`)
  }
  // Enviar el post
  res.send(post)
}

export default getPostByIdController
