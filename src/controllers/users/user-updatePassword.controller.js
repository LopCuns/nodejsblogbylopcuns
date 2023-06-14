import UserModel from '#Schemas/user.schema.js'
import { hash, compare } from 'bcrypt'
import SALT from '#Constants/salt.js'
import { userNotFound, badCredentials } from '#Errors/users.errors.js'

const userUpdatePasswordController = async (req, res) => {
  // Obtener el _id de la request
  const { userId } = req
  // Obtener la contraseña actual y la nueva contraseña del body de la request
  const { oldPassword, newPassword } = req.body
  // Obtener el usuario por su _id
  const user = await UserModel.findById(userId).exec()
  // Si no existe dicho usuario,entonces se devuelve un error 401 ( No autorizado )
  if (!user) return userNotFound(res)
  // Comprobar si la contraseña es la correcta
  const isValidPassword = await compare(oldPassword, user.password)
  // Si la contraseña no es correcta,entonces se devuelve un código 401 ( No autorizado )
  if (!isValidPassword) {
    return badCredentials(res)
  }
  // Hash de la nueva contraseña
  const newHashedPassword = await hash(newPassword, SALT)
  // Cambiar la contraseña del usuario
  user.password = newHashedPassword
  // Salvar los cambios
  await user.save()
  // Enviar una respuesta satisfactoria
  return res.send({ successMessage: 'Contraseña cambiada con éxito' })
}
export default userUpdatePasswordController
