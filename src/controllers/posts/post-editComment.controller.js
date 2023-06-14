import { getUserById, getPostById } from '../lib.controller.js'
import { notAuthorized } from '#Errors/users.errors.js'
import { postNotFound } from '#Errors/posts.errors.js'
const editCommentPostController = async (req, res) => {
  // Obtener el postId de los parámetros de la request
  const { postId } = req.params
  // Obtener el userId de la request
  const { userId } = req
  // Obtener el content del comentario del body de la request
  const { content } = req.body
  // Comprobar que el usuario exista
  const user = await getUserById(userId)
  // Si el usuario no existe, entonces enviar un error 401 ( No autorizado )
  if (!user) return notAuthorized(res)
  // Obtener el post de la base de datos
  const post = await getPostById(postId)
  // Si el post no existe,entonces delbolver un error 404 ( No encontrado )
  if (!post) {
    return postNotFound(res, `Post con _id ${postId} no encontrado`)
  }
  // Comprobar que el usuario haya comentado previamente en el post
  const userComment = post.comments.find(
    (comment) => comment.authorId === userId
  )
  // Si el usuario ya ha comentado previamente el post,entonces devolver un error 404 ( No encontrado )
  if (!userComment) {
    return postNotFound(res, 'No has comentado en este post')
  }
  // Editar el comentario del post
  userComment.content = content
  // Guardar los cambios en el post
  await post.save()
  // Devolver una respuesta satisfactoria
  return res.send({ successMessage: 'Has editado tu comentario en este post' })
}
export default editCommentPostController
