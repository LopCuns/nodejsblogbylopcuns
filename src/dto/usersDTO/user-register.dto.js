import {
  idDTO,
  usernameDTO,
  emailDTO,
  passwordDTO,
  roleDTO,
  postsDTO,
  likedPostsDTO
} from './users-dto.lib.js'
import Ajv from 'ajv'
import ajvErrors from 'ajv-errors'
import addFormats from 'ajv-formats'

// Esquema del registro de usuario
const userRegisterSchema = {
  type: 'object',
  properties: {
    _id: idDTO,
    username: usernameDTO,
    email: emailDTO,
    password: passwordDTO,
    role: roleDTO,
    posts: postsDTO,
    likedPosts: likedPostsDTO
  },
  required: [
    '_id',
    'username',
    'email',
    'password',
    'role',
    'posts',
    'likedPosts'
  ],
  additionalProperties: false,
  errorMessage: {
    required: {
      _id: '_id es requerido para realizar esta operación',
      username: 'username es requerido para realizar esta operación',
      email: 'email es requerido para realizar esta operación',
      password:
        'password es requerida para realizar esta operación es requerido para realizar esta operación',
      role: 'role es requerido para realizar esta operación',
      posts: 'posts son requeridos para realizar esta operación',
      likedPosts: 'likedPosts es requerido para realizar esta operación'
    },
    additionalProperties: 'No se permiten propiedades adicionales'
  }
}
// Instancia de ajv
const ajv = new Ajv({ allErrors: true })
// Añadir formato de email y uuid
addFormats(ajv, ['email', 'uuid'])
// Crear formato de contraseña
ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)
// Añadir los errores de ajv
ajvErrors(ajv)

// Compilar el esquema para crear un validaor
const validator = ajv.compile(userRegisterSchema)

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
