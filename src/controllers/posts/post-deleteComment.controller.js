import userErrors from '#Errors/users.errors.js'
import { getUserById, getPostById } from './post-lib.controller.js'

const deleteCommentPostController = async (req, res) => {
  // Obtener el postId de los parámetros de la request
  const { postId } = req.params
  // Obtener el userId de la request
  const { userId } = req
  // Comprobar que el usuario exista
  const user = await getUserById(userId)
  // Si el usuario no existe, entonces enviar un error 401 ( No autorizado )
  if (!user) return res.status(401).send(userErrors[401])
  // Obtener el post de la base de datos
  const post = await getPostById(postId)
  // Si el post no existe,entonces delbolver un error 404 ( No encontrado )
  if (!post) {
    return res
      .status(404)
      .send({ errors: `Post con _id ${postId} no encontrado` })
  }
  // Comprobar que el usuario haya comentado previamente en el post
  const userComment = post.comments.find(
    (comment) => comment.authorId === userId
  )
  // Si el usuario no ha comentado previamente el post,entonces devolver un error 404 ( No encontrado )
  if (!userComment) {
    return res.status(404).send({ errors: 'No has comentado en este post' })
  }
  // Eliminar el comentario del post
  post.comments.splice(post.comments.indexOf(userComment), 1)
  // Guardar los cambios en el post
  await post.save()
  // Devolver una respuesta satisfactoria
  return res.send('Comentario eliminado')
}
export default deleteCommentPostController
