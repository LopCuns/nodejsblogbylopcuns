import {
  getUserById,
  getPostById,
  deletePostById
} from '#Controllers/posts/post-lib.controller.js'
import userErrors from '#Errors/users.errors.js'

const deletePostController = async (req, res) => {
  const { userId } = req
  const { postId } = req.params

  // Comprobar si el usuario existe
  const user = await getUserById(userId)
  // Si el usuario no existe, entonces enviar un error 401 ( No autorizado )
  if (!user) return res.status(401).send(userErrors[401])
  // Comprobar que el post exista
  const post = await getPostById(postId)
  // Si el post no existe, entonces devolver un error 404 ( No encontrado )
  if (!post) {
    return res
      .status(404)
      .send({ errors: `Post con _id ${postId} no encontrado` })
  }
  // Comprobar que el editor sea el autor del post
  const isEditorAuthor = user._id === post.authorId
  // Si el editor no es el autor del post, devolver un error 401 ( No autroizado )
  if (!isEditorAuthor) return res.status(401).send(userErrors[401])
  // Eliminar el post
  deletePostById(postId)
  // Enviar una respuesta satisfactoria
  res.send('Post eliminado')
}
export default deletePostController
