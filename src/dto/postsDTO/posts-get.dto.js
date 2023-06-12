import { titleDTO } from './posts-dto.lib.js'
import Ajv from 'ajv'
import ajvErrors from 'ajv-errors'

// Esquema del DTO para comentar en un post
const getPostSchema = {
  type: 'object',
  properties: {
    author: {
      type: 'string',
      minLength: 4,
      maxLength: 15,
      errorMessage: {
        type: 'author debe ser de tipo string',
        minLength: 'author debe contener al menos 4 caracteres',
        maxLength: 'author debe contener un máximo de 15 caracteres'
      }
    },
    title: titleDTO
  },
  required: ['author', 'title'],
  additionalProperties: false,
  errorMessage: {
    required: {
      author: 'author es requerido para realizar esta operación',
      title: 'title es requerido para realizar esta operación'
    },
    additionalProperties: 'No se admiten propiedades adicionales'
  }
}
// Instancia de ajv
const ajv = new Ajv({ allErrors: true })
// Añadir errores a ajv
ajvErrors(ajv)
// Compilar el esquema para crear un validador
const validator = ajv.compile(getPostSchema)
// Función que valido el DTO
const getPostDTO = (req, res, next) => {
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

export default getPostDTO
