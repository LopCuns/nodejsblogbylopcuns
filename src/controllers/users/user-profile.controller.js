import UserModel from '#Schemas/user.schema.js'
import userErrors from '#Errors/users.errors.js'

const userProfileController = async (req, res) => {
  // Obetener el _id del jwt
  const { _id } = req
  // Obtener el usuario correspondiente a ese _id
  const user = await UserModel.findById(_id).exec()
  // Si no existe dicho usuario,se devuelve un error 401 ( No autorizado )
  if (!user) return res.status(401).send(userErrors[401])
  // Obtener el username,el email,el role y los posts del usuario
  const { username, email, role, posts } = user
  // Enviar los datos del usuario
  return res.send({ _id, username, email, role, posts })
}
export default userProfileController
