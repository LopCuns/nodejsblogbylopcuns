import UserModel from '#Schemas/user.schema.js'
import PostModel from '#Schemas/post.schema.js'
import userErrors from '#Errors/users.errors.js'
// Controlador para crear un post
const createPostController = async (req, res) => {
  // Obtener el authorId de la request
  const authorId = req.userId
  // Obtener los datos del post de la request
  const { _id, title, content, likes, comments } = req.body
  // Obetener el usuario autor del post
  const user = await UserModel.findById(authorId)
  // Si el usuario no existe, entonces enviar un error 401 ( No autorizado )
  if (!user) return res.status(401).send(userErrors[401])
  // Comprobar si el usuario está baneado
  const isUserBanned = user.role === 'banned'
  // Si el usuario está baneado, entonces enviar un error 401 ( No autorizado )
  if (isUserBanned) return res.status(401).send(userErrors[401])
  // Comprobar si ya existe un post con ese _id
  const existsPostById = await PostModel.findById(_id)
  // Si ya existe un pos con ese _id,entonces devolver un error 409 ( Conflict )
  if (existsPostById) {
    return res.status(409).send({ errors: 'Ya existe un post con ese _id' })
  }
  // Comprobar si ya existe un post de este usuario con el mismo title
  const existsPostByAuthorTitle = await PostModel.findOne({ authorId, title })
  // Si ya existe un post del usuario con el mismo title, entonces devolver un error 409 ( Conflict )
  if (existsPostByAuthorTitle) {
    return res
      .status(409)
      .send({ errors: 'Ya has publicado previamente un post con ese title' })
  }
  // Crear un nuevo post con los datos proporcionados
  const newPost = new PostModel({
    _id,
    authorId,
    title,
    content,
    likes,
    comments
  })
  // Guardar los cambios
  await newPost.save()
  // Devolver una respuesta satisfactoria
  return res.send('Post publicado con éxito')
}
export default createPostController
