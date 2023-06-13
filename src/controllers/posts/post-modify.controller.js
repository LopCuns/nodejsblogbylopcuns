import {
  getUserById,
  getPostById
} from '#Controllers/posts/post-lib.controller.js'
import userErrors from '#Errors/users.errors.js'

const modifyPostController = async (req, res) => {
  // Obtener el userId de la request
  const { userId } = req
  // Obtener el postId de los params de la request
  const { postId } = req.params
  // Obtener el newTitle y el newContent del body de la request
  const { newTitle, newContent } = req.body
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
  // Modificar el título del post
  post.title = newTitle
  // Modificar el contenido del post
  post.content = newContent
  // Guardar los cambios en el post
  await post.save()
  // Enviar una respuesta satisfactoria
  return res.send('Post editado con éxito')
}
export default modifyPostController
