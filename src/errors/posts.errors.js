// Error post 404 ( No encontrado )
const postNotFound = (res, message = 'Post no encontrado') =>
  res.status(404).send({ errors: message })
// Error post 409 ( Conflict )
const postConflict = (res, message = 'Error de conflicto') =>
  res.status(409).send({ errors: message })

export { postNotFound, postConflict }
