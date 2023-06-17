import { getUserById } from '#Controllers/lib.controller.js'
import { userNotFound } from '#Errors/users.errors.js'
const userGetUsernameController = async (req, res) => {
  // Obtener el id del usuario de los parámetros de la request
  const { userId } = req.params
  // Obtener el usuario a partir de su id
  const user = await getUserById(userId)
  // Si el usuario no existe, entonces devolver un error 404 ( No encontrado )
  if (!user) {
    return userNotFound(res)
  }
  // Devolver el username del usuario
  return res.send({ username: user.username })
}
export default userGetUsernameController
