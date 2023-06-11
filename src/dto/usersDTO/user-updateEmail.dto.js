import { emailDTO, passwordDTO } from './users-dto.lib.js'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import ajvErrors from 'ajv-errors'
// Esquema de actualización de nombre de usuario
const userUpdateEmailSchema = {
  type: 'object',
  properties: {
    newEmail: emailDTO,
    password: passwordDTO
  },
  required: ['newEmail', 'password'],
  additionalProperties: false,
  errorMessage: {
    required: {
      newEmail: 'newEmail es obligatorio para realizar esta operación',
      password: 'password es obligatori0 para realizar esta operación'
    },
    additionalProperties: 'No se admiten propiedades adicionales'
  }
}
// Instancia de Ajv
const ajv = new Ajv({ allErrors: true })
// Incorporamos los formatos a ajv
addFormats(ajv, ['email'])
// Crear el formato para la contraseña
ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)
// Incorporamos errores a ajv
ajvErrors(ajv)

// Compilar el esquema para crear un validador
const validator = ajv.compile(userUpdateEmailSchema)
// Validador del DTO
const userUpdateEmailDTO = (req, res, next) => {
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
export default userUpdateEmailDTO
