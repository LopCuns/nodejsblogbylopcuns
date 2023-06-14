// Error usuario 401 ( No autorizado )
const notAuthorized = (res, message = 'No autorizado') =>
  res.status(401).send({ errors: message })
// Error usuario 401 ( Credenciales incorrectas )
const badCredentials = (res, message = 'Credenciales incorrectas') =>
  res.status(401).send({ errors: message })
// Error usuario 400 ( Petición mala )
const badRequest = (
  res,
  message = 'La petición no cumple con los requisitos necesarios'
) => res.status(400).send({ errors: message })
// Error usuario 404 ( No encontrado )
const userNotFound = (res, message = 'Usuario no encontrado') =>
  res.status(404).send({ errors: message })
//  Error usuario 409 ( Conflicto )
const userConflict = (res, message = 'Error de conflicto') =>
  res.status(409).send({ errors: message })
export { notAuthorized, badCredentials, badRequest, userNotFound, userConflict }
