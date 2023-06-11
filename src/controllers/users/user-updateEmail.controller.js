import UserModel from '#Schemas/user.schema.js'
import { compare } from 'bcrypt'
import userErrors from '#Errors/users.errors.js'

const userUpdateEmailController = async (req, res) => {
  // Se obtiene el _id del usuario de la request
  const { _id } = req
  // Se obtiene el newEmail y la password de la request
  const { newEmail, password } = req.body
  // Se obtiene el usuario a partir de su _id
  const user = await UserModel.findById(_id)
  // Si no existe ese usuario,entonces se envía un error 401 ( No autorizado )
  if (!user) return res.status(401).send(userErrors[401])
  // Se comprueba que la contraseña sea la correcta
  const isValidPassword = await compare(password, user.password)
  // Si la contraseña no es correcta,entonces se envía un error 401 ( No autorizado )
  if (!isValidPassword) {
    return res.status(401).send(userErrors[401])
  }
  // Se modifica el email del usuario
  user.email = newEmail
  // Se guardan los cambios
  await user.save()
  // Se devuelve una respuesta satisfactoria
  return res.send('Email cambiado con éxito')
}
export default userUpdateEmailController
