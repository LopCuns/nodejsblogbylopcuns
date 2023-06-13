import PostModel from '#Schemas/post.schema.js'
import UserModel from '#Schemas/user.schema.js'
const getPostByAuthorTitleController = async (req, res) => {
  // Obtener el autor y el título del post del body de la request
  const { author, title } = req.body
  // Obtener los datos del autor
  const authorObject = await UserModel.findOne({ username: author })
  // Si el autor no está registrado, entonces devolver un error 404 ( No encontrado )
  if (!authorObject) {
    return res
      .status(404)
      .send({ errors: 'El autor no es un usuario registrado' })
  }
  // Obtener el id del autor
  const authorId = authorObject._id
  // Obtener el post por su authorId y su title
  const post = await PostModel.findOne({ authorId, title })
  // Si el post no existe, entonces devolver un error 404 ( No encontrado )
  if (!post) return res.status(404).send({ errors: 'Post no encontrado' })
  // Devolver el post
  return res.send(post)
}
export default getPostByAuthorTitleController
