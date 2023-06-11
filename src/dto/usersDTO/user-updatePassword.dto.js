import { passwordDTO } from './users-dto.lib.js'
import Ajv from 'ajv'
import ajvErrors from 'ajv-errors'
// Esquema de actualización de nombre de usuario
const userUpdatePasswordSchema = {
  type: 'object',
  properties: {
    oldPassword: passwordDTO,
    newPassword: passwordDTO
  },
  required: ['oldPassword', 'newPassword'],
  additionalProperties: false,
  errorMessage: {
    required: {
      oldPassword: 'oldPassword es obligatorio para realizar esta operación',
      newPassword: 'newPassword es obligatoria para realizar esta operación'
    },
    additionalProperties: 'No se admiten propiedades adicionales'
  }
}
// Instancia de Ajv
const ajv = new Ajv({ allErrors: true })
// Crear el formato para la contraseña
ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)
// Incorporamos errores a ajv
ajvErrors(ajv)

// Compilar el esquema para crear un validador
const validator = ajv.compile(userUpdatePasswordSchema)
// Validador del DTO
const userUpdatePasswordDTO = (req, res, next) => {
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
export default userUpdatePasswordDTO
