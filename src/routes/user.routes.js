import express from 'express'
import userRegisterDTO from '#Dto/usersDTO/user-register.dto.js'
import userLoginDTO from '#Dto/usersDTO/user-login.dto.js'
import userUpdateUsernameDTO from '#Dto/usersDTO/user-updateUsername.dto.js'
import userUpdateEmailDTO from '#Dto/usersDTO/user-updateEmail.dto.js'
import userUpdatePasswordDTO from '#Dto/usersDTO/user-updatePassword.dto.js'
import verifyJWT from '#Dto/verifyJWT.dto.js'
import userRegisterController from '#Controllers/users/user-register.controller.js'
import userLoginController from '#Controllers/users/user-login.controller.js'
import userProfileController from '#Controllers/users/user-profile.controller.js'
import userUpdateUsernameController from '#Controllers/user-updateUsername.controller.js'
import userUpdateEmailController from '#Controllers/users/user-updateEmail.controller.js'
import userUpdatePasswordController from '#Controllers/users/user-updatePassword.controller.js'

const userRouter = express.Router()

// Regitstro de usuario
userRouter.post('/register', userRegisterDTO, userRegisterController)
// Login de usuario
userRouter.post('/login', userLoginDTO, userLoginController)
// Obtener datos de usuario
userRouter.get('/profile', verifyJWT, userProfileController)
// Cambiar nombre de usuario
userRouter.patch(
  '/update-username',
  verifyJWT,
  userUpdateUsernameDTO,
  userUpdateUsernameController
)
// Cambiar email
userRouter.patch(
  '/update-email',
  verifyJWT,
  userUpdateEmailDTO,
  userUpdateEmailController
)
// Cambiar contraseña
userRouter.patch(
  '/update-password',
  verifyJWT,
  userUpdatePasswordDTO,
  userUpdatePasswordController
)

export default userRouter
