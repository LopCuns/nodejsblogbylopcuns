import {
  getUserById,
  getPostById
} from '#Controllers/posts/post-lib.controller.js'
import userErrors from '#Errors/users.errors.js'
const commentPostController = async (req, res) => {
  // Obtener el postId de los parámetros de la request
  const { postId } = req.params
  // Obtener el userId de la request
  const { userId } = req
  // Obtener el content del comentario del body de la request
  const { content } = req.body
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
  // Comprobar que el usuario no haya comentado previamente en el post
  const hadUserComment = post.comments.find(
    (comment) => comment.authorId === userId
  )
  // Si el usuario ya ha comentado previamente el post,entonces devolver un error 409 ( Conflict )
  if (hadUserComment) {
    return res.status(409).send({ errors: 'Ya has comentado en este post' })
  }
  // Añadir el comentario al post
  post.comments.push({ authorId: userId, content })
  // Guardar los cambios en el post
  await post.save()
  // Devolver una respuesta satisfactoria
  return res.send('Has comentado en este post')
}
export default commentPostController
