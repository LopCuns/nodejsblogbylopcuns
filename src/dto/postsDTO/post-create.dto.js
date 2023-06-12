import {
  _idDTO,
  titleDTO,
  contentDTO,
  likesDTO,
  commentsDTO
} from './posts-dto.lib.js'
import Ajv from 'ajv'
import ajvErrors from 'ajv-errors'
import addFormats from 'ajv-formats'

// Esquema del DTO para crear un post
const createPostSchema = {
  type: 'object',
  properties: {
    _id: _idDTO,
    title: titleDTO,
    content: contentDTO,
    likes: likesDTO,
    comments: commentsDTO
  },
  required: ['_id', 'title', 'content', 'likes', 'comments'],
  additionalProperties: false,
  errorMessage: {
    required: {
      _id: '_id es requerido para realizar esta operación',
      title: 'title es requerido para realizar esta operación',
      content: 'content es requerido para realizar esta operación',
      likes: 'likes es requerido para realizar esta operación',
      comments: 'comments es requerido para realizar esta operación'
    },
    additionalProperties: 'No se admiten propiedades adicionales'
  }
}
// Instancia de Ajv
const ajv = new Ajv({ allErrors: true })
// Añadir formato uuid4 a ajv
addFormats(ajv, ['uuid'])
// Añadir errores a ajv
ajvErrors(ajv)
// Compilar el esquema para crear un validador de DTO
const validator = ajv.compile(createPostSchema)
// Función validadora de DTO
const createPostDTO = (req, res, next) => {
  // Comprobar que el DTO sea válido
  const isValidDTO = validator(req.body)
  // Si el DTO no es válido, entonces enviar un error 400 ( Bad Request )
  if (!isValidDTO) {
    return res
      .status(400)
      .send({ error: validator.errors.map((error) => error.message) })
  }
  // Si el DTO es válido,entonces pasar el control al controlador
  next()
}

export default createPostDTO
