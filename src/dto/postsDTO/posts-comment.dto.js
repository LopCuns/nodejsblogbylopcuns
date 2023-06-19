import { contentDTO } from '#Dto/postsDTO/posts-dto.lib.js'
import Ajv from 'ajv'
import ajvErrors from 'ajv-errors'

// Esquema del DTO para comentar en un post
const commentPostSchema = {
  type: 'object',
  properties: {
    content: contentDTO
  },
  required: ['content'],
  additionalProperties: false,
  errorMessage: {
    required: {
      content: 'content es requerido para realizar esta operación'
    },
    additionalProperties: 'No se admiten propiedades adicionales'
  }
}
// Instancia de ajv
const ajv = new Ajv({ allErrors: true })
// Añadir errores a ajv
ajvErrors(ajv)
// Compilar el esquema para crear un validador
const validator = ajv.compile(commentPostSchema)
// Función que valido el DTO
const commentPostDTO = (req, res, next) => {
  // Comprobar que el DTO sea válido
  const isValidDTO = validator(req.body)
  // Si el DTO no es válido, entonces enviar un error 400 ( Bad Reques )
  if (!isValidDTO) {
    return res
      .status(400)
      .send({ errors: validator.errors.map((error) => error.message) })
  }
  // Si el DTO es válido, entonces enviar el control al controlador
  next()
}

export default commentPostDTO
