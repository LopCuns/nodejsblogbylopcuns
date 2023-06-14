import UserModel from '#Schemas/user.schema.js'
import { hash } from 'bcrypt'
import SALT from '#Constants/salt.js'
import { userConflict } from '#Errors/users.errors.js'

const userRegisterController = async (req, res) => {
  // Obetener los datos del usuario del request body
  const { _id, username, email, password, role, posts } = req.body
  // Comprobamos si ya existe un usuario registrado con ese _id
  const existsUserById = await UserModel.findById(_id).exec()
  // Si ya existe un usuario con ese _id,entonces se devuelve un código 409 ( Conflict )
  if (existsUserById) {
    return userConflict(res, 'Usuario con ese _id ya registrado')
  }
  // Comprobamos si ya existe un usuario registrado con ese email
  const existsUserByEmail = await UserModel.findOne({ email }).exec()
  // Si ya existe un usuario con ese email, entonces se devuelve un código 409 ( Conflict )
  if (existsUserByEmail) {
    return userConflict(res, 'Usuario con ese email ya registrado')
  }
  // Comprobamos si ya existe un usuario con ese email
  const existsUserByUsername = await UserModel.findOne({ username }).exec()
  // Si ya existe un usuario con ese username,entonces se devuelve un error 409 ( Conflict )
  if (existsUserByUsername) {
    return userConflict(res, 'Usuario con ese username ya registrado')
  }
  // Pasar la contraseña por una función hash
  const hashedPassword = await hash(password, SALT)
  // Crear usuario con los datos proporcionados
  const newUser = new UserModel({
    _id,
    username,
    email,
    password: hashedPassword,
    role,
    posts
  })
  // Guardar los cambios en el usuario
  await newUser.save()
  // Devolver un mensaje de OK
  return res.send({
    successMessage: `Usuario registrado con éxito,bienvenido ${username}`
  })
}
export default userRegisterController
