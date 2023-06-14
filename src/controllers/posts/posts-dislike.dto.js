import { getUserById, getPostById } from '../lib.controller.js'
import { notAuthorized } from '#Errors/users.errors.js'
import { postNotFound } from '#Errors/posts.errors.js'

const dislikePostController = async (req, res) => {
  // Obtener el postId de los parámetros de la request
  const { postId } = req.params
  // Obetner el userId de la request
  const { userId } = req
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
  // Comprobar que el usuario le haya dado me gusta a el post con anterioridad
  const hadUserLikePost = user.likedPosts.find(
    (likedPostId) => likedPostId === postId
  )
  // Si el usuario no le ha dado me gusta al post previamente, entonces devolver un error 404 ( No encontrado )
  if (!hadUserLikePost) {
    return postNotFound(res, 'No le has dado me gusta a este post')
  }
  // Restar un me gusta al post
  post.likes += -1
  // Eliminar el postId de likedPosts del usuario
  user.likedPosts.splice(user.likedPosts.indexOf(postId), 1)
  // Guardar los cambios en el post
  await post.save()
  // Guardar los cambios en el usuario
  await user.save()
  // Enviar una respuesta satisfactoria
  return res.send({ successMessage: 'Has retirado tu me gusta del post' })
}
export default dislikePostController
