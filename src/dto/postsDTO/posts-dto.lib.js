const _idDTO = {
  type: 'string',
  format: 'uuid',
  errorMessage: {
    type: '_id debe ser de tipo string',
    format: '_id debe cumplir con el formato uuid4'
  }
}

const titleDTO = {
  type: 'string',
  minLength: 1,
  maxLength: 50,
  errorMessage: {
    type: 'title debe ser de tipo string',
    minLength: 'title debe tener al menos 1 caracter',
    maxLength: 'title no debe tener más de 20 caracters'
  }
}

const contentDTO = {
  type: 'string',
  minLength: 1,
  maxLength: 2000,
  errorMessage: {
    type: 'content debe ser de tipo string',
    minLength: 'content debe tener al menos 1 caracter',
    maxLength: 'content no debe tener más de 2000 caracteres'
  }
}

const likesDTO = {
  type: 'number',
  errorMessage: 'likes debe ser del tipo number'
}

const commentsDTO = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      authorId: {
        type: 'string',
        format: 'uuid',
        errorMessage: {
          type: 'authorId debe ser de tipo string',
          format: 'authorId debe cumplir con el formato uuid4'
        }
      },
      content: contentDTO
    },
    errorMessage: 'comments debe contener objetos'
  },
  errorMessage: 'comments debe ser del tipo array'
}

const dateDTO = {
  type: 'string',
  format: 'date',
  errorMessage: {
    type: 'date debe ser de tipo string',
    format: 'date debe cumplir con el formato full date RFC3339'
  }
}

export { _idDTO, titleDTO, contentDTO, likesDTO, commentsDTO, dateDTO }
