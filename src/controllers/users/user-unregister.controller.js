import { getUserById } from '#Controllers/lib.controller.js'
import { notAuthorized, badCredentials } from '#Errors/users.errors.js'
import { compare } from 'bcrypt'
import UserModel from '#Schemas/user.schema.js'

const userUnregisterController = async (req, res) => {
  // Obtener el userId de la request
  const { userId } = req
  // Obtener el email y la password del body de la request
  const { email, password } = req.body
  // Obtener el usuario por su id
  const user = await getUserById(userId)
  // Si el usuario no existe, entonces devolver un error 401 ( No autorizado )
  if (!user) {
    return notAuthorized(res)
  }
  // Comprobar que el email sea el correcto
  const isValidEmail = email === user.email
  // Si el email no es correcto, entonces enviar un error 401 ( No autorizado )
  if (!isValidEmail) {
    return badCredentials(res)
  }
  // Comprobar que la contraseña sea la correcta
  const isValidPassword = await compare(password, user.password)
  // Si la contraseña no es correcta, entonces enviar un error 401 ( No autorizado )
  if (!isValidPassword) return badCredentials(res)
  // Eliminar el usuario
  await UserModel.findByIdAndDelete(userId)
  // Enviar una respuesta satisfactoria
  return res.send({ successMessage: 'Usuario eliminado' })
}
export default userUnregisterController
