import UserModel from '#Schemas/user.schema.js'
import { userNotFound } from '#Errors/users.errors.js'
const userUpdateUsernameController = async (req, res) => {
  // Obtener el _id de la request
  const { userId } = req
  // Obtener el nuevo username del body de la reques
  const { newUsername } = req.body
  // Obtener el usuario a partir de su _id
  const user = await UserModel.findById(userId).exec()
  // Si dicho usuario no existe,entonces se envía un error 404 ( No encontrado )
  if (!user) return userNotFound(res)
  // Cambiar el username
  user.username = newUsername
  // Guardar los cambios
  user.save()
  // Devolver una respuesta satisfactoria
  return res.send({ successMessage: 'Username cambiado con éxito' })
}
export default userUpdateUsernameController
