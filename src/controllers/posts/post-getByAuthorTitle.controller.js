import PostModel from '#Schemas/post.schema.js'
import UserModel from '#Schemas/user.schema.js'
import { userNotFound } from '#Errors/users.errors.js'
import { postNotFound } from '#Errors/posts.errors.js'
const getPostByAuthorTitleController = async (req, res) => {
  const { author, title } = req.query
  // Obtener los datos del autor
  const authorObject = await UserModel.findOne({ username: author })
  // Si el autor no está registrado, entonces devolver un error 404 ( No encontrado )
  if (!authorObject) {
    return userNotFound(res, 'El autor no es un usuario registrado')
  }
  // Obtener el id del autor
  const authorId = authorObject._id
  // Obtener el post por su authorId y su title
  const post = await PostModel.findOne({ authorId, title })
  // Si el post no existe, entonces devolver un error 404 ( No encontrado )
  if (!post) return postNotFound(res)
  // Devolver el post
  return res.send(post)
}
export default getPostByAuthorTitleController
