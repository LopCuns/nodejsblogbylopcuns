import { getUserById } from '#Controllers/lib.controller.js'
import { userNotFound } from '#Errors/users.errors.js'
import { postNotFound } from '#Errors/posts.errors.js'
import PostModel from '#Schemas/post.schema.js'

const getPostsByAuthorController = async (req, res) => {
  // Obtener el id del autor de los parámetros de la request
  const { authorId } = req.params
  // Obtener el usuario por su id
  const user = await getUserById(authorId)
  // Si no existe el usuario,entonces devolver un error 404 ( No encontrado )
  if (!user) return userNotFound(res)
  // Obtener los posts publicados por ese usuario
  const posts = await PostModel.find({ authorId }).exec()
  // Si el usuario no ha publicado ningún post,entonces devolver un error 404 ( No encontrado )
  if (!posts) {
    return postNotFound(res, 'El usuario todavía no ha publicado ningún post')
  }
  // Devolver los posts publicados por el usuario
  return res.send(posts)
}
export default getPostsByAuthorController
