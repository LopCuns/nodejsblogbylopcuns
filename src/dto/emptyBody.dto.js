import Ajv from 'ajv'
import ajvErrors from 'ajv-errors'

const emptyBodySchema = {
  type: 'object',
  additionalProperties: false,
  errorMessage: 'El body debe ser un objeto vacío'
}

const ajv = new Ajv({ allErrors: true })
ajvErrors(ajv)

const validator = ajv.compile(emptyBodySchema)

const emptyBodyDTO = (req, res, next) => {
  const isValidDTO = validator(req.body)
  if (!isValidDTO) {
    return res
      .status(400)
      .send({ errors: validator.errors.map((error) => error.message) })
  }
  return next()
}

export default emptyBodyDTO
