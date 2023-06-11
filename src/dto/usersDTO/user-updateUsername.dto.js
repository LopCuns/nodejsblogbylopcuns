import { usernameDTO } from './users-dto.lib.js'
import Ajv from 'ajv'
import ajvErrors from 'ajv-errors'
// Esquema de actualización de nombre de usuario
const userUpdateUsernameSchema = {
  type: 'object',
  properties: {
    newUsername: usernameDTO
  },
  required: ['newUsername'],
  additionalProperties: false,
  errorMessage: {
    required: 'newUsername es obligatirio para realizar esta operación',
    additionalProperties: 'No se admiten propiedades adicionales'
  }
}
// Instancia de Ajv
const ajv = new Ajv({ allErrors: true })
// Incorporamos errores a ajv
ajvErrors(ajv)

// Compilar el esquema para crear un validador
const validator = ajv.compile(userUpdateUsernameSchema)
// Validador del DTO
const userUpdateUsernameDTO = (req, res, next) => {
  const isValidDTO = validator(req.body)
  // Si el DTO no es válido,responder con un código 400 ( Bad Request )
  if (!isValidDTO) {
    return res
      .status(400)
      .send({ errors: validator.errors.map((error) => error.message) })
  }
  // Si el DTO es válido, devolver el control al controller
  next()
}
export default userUpdateUsernameDTO
