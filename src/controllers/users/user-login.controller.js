import UserModel from '#Schemas/user.schema.js'
import { compare } from 'bcrypt'
import { SignJWT } from 'jose'
import { userNotFound, badCredentials } from '#Errors/users.errors.js'
// Controlador del login de usuario
const userLoginController = async (req, res) => {
  // Obtener email y contraseña del body
  const { email, password } = req.body
  // Obtener usuario de la base de datos
  const user = await UserModel.findOne({ email }).exec()
  // Si no se encuentra un usuario con ese email,se deveulve un código 401 ( No autorizado )
  if (!user) return userNotFound(res)
  // Se comprueba que la contraseña sea correct
  const isValidPassword = await compare(password, user.password)
  // Si la contraseña no es correcta,se devuleve un código 401 ( No autorizado )
  if (!isValidPassword) return badCredentials(res)
  // Instancia del TextEncoder para pasar el JWT secret al formato requerido por la libreria
  const encoder = new TextEncoder()
  // Crear un jwt con el id del usuario en su body
  const jwt = await new SignJWT({ _id: user._id })
    //  Encriptado con el algoritmo HS256
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    // Set del momento de creación del token
    .setIssuedAt()
    // El token expirará en 7 días
    .setExpirationTime('7d')
    // Firmar el token con el secreto
    .sign(encoder.encode(process.env.JWT_SECRET))
  // Devolver el jwt en el body
  return res.send({ jwt })
}
export default userLoginController
