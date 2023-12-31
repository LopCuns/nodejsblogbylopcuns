import UserModel from '#Schemas/user.schema.js'
import { notAuthorized } from '#Errors/users.errors.js'

const userProfileController = async (req, res) => {
  // Obetener el _id del jwt
  const { userId } = req
  // Obtener el usuario correspondiente a ese _id
  const user = await UserModel.findById(userId).exec()
  // Si no existe dicho usuario,se devuelve un error 401 ( No autorizado )
  if (!user) return notAuthorized(res)
  // Obtener los datos del usuario
  const { username, email, role, posts, likedPosts } = user
  // Enviar los datos del usuario
  return res.send({ _id: userId, username, email, role, posts, likedPosts })
}
export default userProfileController
