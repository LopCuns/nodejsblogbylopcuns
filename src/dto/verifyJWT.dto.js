// Importar jwtVerify de la librería jose
import { jwtVerify } from 'jose'
// Función que verifica la validez de un jwt
const verifyJWT = async (req, res, next) => {
  // Obetener la autorización
  const { authorization } = req.headers
  // Si no se entrega autorización,se devuleve un error 401 ( No autorizado )
  if (!authorization) return res.status(401).send({ errors: ['No autorizado'] })
  try {
    // Instancia del TextEncoder para pasar el secreto de jwt al formato requerido por la librería
    const encoder = new TextEncoder()
    // Verificar si el jwt es válido
    const { payload } = await jwtVerify(
      authorization.split(' ')[1],
      encoder.encode(process.env.JWT_SECRET)
    )
    // Pasar el id del usuario a la request
    req.userId = payload._id
    // Pasar el control al controller
    return next()
  } catch {
    // Si el jwt no es válido,enviar un error 401 (No autorizado)
    return res.status(401).send({ errors: ['No autorizado'] })
  }
}

export default verifyJWT
