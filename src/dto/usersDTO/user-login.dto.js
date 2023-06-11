import { emailDTO, passwordDTO } from './users-dto.lib.js'
import Ajv from 'ajv'
import ajvErrors from 'ajv-errors'
import addFormats from 'ajv-formats'

// Esquema del login de usuario
const userLoginSchema = {
  type: 'object',
  properties: {
    email: emailDTO,
    password: passwordDTO
  },
  required: ['email', 'password'],
  additionalProperties: false,
  errorMessage: {
    required: {
      email: 'email es requerido para realizar esta operación',
      password:
        'password es requerido para realizar esta operación es requerido para realizar esta operación'
    },
    additionalProperties: 'No se permiten propiedades adicionales'
  }
}
// Instancia de ajv
const ajv = new Ajv({ allErrors: true })
// Añadir formato de email
addFormats(ajv, ['email'])
// Crear formato de contraseña
ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)
// Añadir los errores de ajv
ajvErrors(ajv)

// Compilar el esquema para crear un validaor
const validator = ajv.compile(userLoginSchema)

// Función que valida que los datos entregados cumplan con el esquema
const userRegisterDTO = (req, res, next) => {
  const isValidDTO = validator(req.body)
  // Si los datos entregados no son válidos, devolver error 400( Bad Request)
  if (!isValidDTO) {
    return res
      .status(400)
      .send({ errors: validator.errors.map((error) => error.message) })
  }
  // Si los datos entregados son válidos,pasar control al controller
  next()
}

export default userRegisterDTO
