import { getUserById, getPostById } from '../lib.controller.js'
import { notAuthorized } from '#Errors/users.errors.js'
import { postNotFound, postConflict } from '#Errors/posts.errors.js'

const likePostController = async (req, res) => {
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
  // Comprobar que el usuario no le haya dado me gusta a el post con anterioridad
  const hadUserLikePost = user.likedPosts.find(
    (likedPostId) => likedPostId === postId
  )
  // Si el usuario ya le ha dado me gusta al post previamente, entonces devolver un error 409 ( Conflict )
  if (hadUserLikePost) {
    return postConflict(res, 'Ya le has dado me gusta a este post previamente')
  }
  // Sumar un me gusta al post
  post.likes += 1
  // Añadir el postId a likedPosts del usuario
  user.likedPosts.push(postId)
  // Guardar los cambios en el post
  await post.save()
  // Guardar los cambios en el usuario
  await user.save()
  // Enviar una respuesta satisfactoria
  return res.send({ successMessage: 'Has dado me gusta a este post' })
}
export default likePostController
