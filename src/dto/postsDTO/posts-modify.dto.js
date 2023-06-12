import { titleDTO, contentDTO } from './posts-dto.lib.js'
import Ajv from 'ajv'
import ajvErrors from 'ajv-errors'

// Esquema del DTO para modificar un post
const modifyPostSchema = {
  type: 'object',
  properties: {
    newTitle: titleDTO,
    newContent: contentDTO
  },
  required: ['newTitle', 'newContent'],
  additionalProperties: false,
  errorMessage: {
    required: {
      newTitle: 'newTitle es requerido para realizar esta operación',
      newContent: 'newContent es requerido para realizar esta operación'
    },
    additionalProperties: 'No se admiten propiedades adicionales'
  }
}
// Instancia de ajv
const ajv = new Ajv({ allErrors: true })
// Añadir errores a ajv
ajvErrors(ajv)
// Compilar el esquema para crear un validador
const validator = ajv.compile(modifyPostSchema)
// Función que valido el DTO
const modifyPostDTO = (req, res, next) => {
  // Comprobar que el DTO sea válido
  const isValidDTO = validator(req.body)
  // Si el DTO no es válido, entonces enviar un error 400 ( Bad Reques )
  if (!isValidDTO) {
    return res
      .status(400)
      .send({ error: validator.errors.map((error) => error.message) })
  }
  // Si el DTO es válido, entonces enviar el control al controlador
  next()
}

export default modifyPostDTO
