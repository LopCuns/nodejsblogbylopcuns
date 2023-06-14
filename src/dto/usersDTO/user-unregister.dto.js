import { emailDTO, passwordDTO } from './users-dto.lib.js'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import ajvErrors from 'ajv-errors'

const userUnregisterSchema = {
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
      password: 'password es requerido para realizar esta operación'
    },
    additionalProperties: 'No se admiten propiedades adicionales'
  }
}

const ajv = new Ajv({ allErrors: true })
addFormats(ajv, ['email'])
ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)
ajvErrors(ajv)

const validator = ajv.compile(userUnregisterSchema)

const userUnregisterDTO = (req, res, next) => {
  const isValidDTO = validator(req.body)
  if (!isValidDTO) {
    return res
      .status(400)
      .send({ errors: validator.errors.map((error) => error.message) })
  }
  return next()
}
export default userUnregisterDTO
