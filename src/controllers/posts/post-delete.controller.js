import { getUserById, getPostById, deletePostById } from '../lib.controller.js'
import { notAuthorized } from '#Errors/users.errors.js'
import { postNotFound } from '#Errors/posts.errors.js'

const deletePostController = async (req, res) => {
  // Obtener el userId de la request
  const { userId } = req
  // Obtener el postId de los params de la request
  const { postId } = req.params
  // Comprobar si el usuario existe
  const user = await getUserById(userId)
  // Si el usuario no existe, entonces enviar un error 401 ( No autorizado )
  if (!user) return notAuthorized(res)
  // Comprobar que el post exista
  const post = await getPostById(postId)
  // Si el post no existe, entonces devolver un error 404 ( No encontrado )
  if (!post) {
    return postNotFound(res, `Post con _id ${postId} no encontrado`)
  }
  // Comprobar que el editor sea el autor del post
  const isEditorAuthor = user._id === post.authorId
  // Si el editor no es el autor del post, devolver un error 401 ( No autroizado )
  if (!isEditorAuthor) return notAuthorized(res)
  // Eliminar el post
  deletePostById(postId)
  // Enviar una respuesta satisfactoria
  res.send({ successMessage: 'Post eliminado' })
}
export default deletePostController
