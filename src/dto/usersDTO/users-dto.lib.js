// DTOs de los datos requeridos para los usuarios
export const idDTO = {
  type: 'string',
  format: 'uuid',
  errorMessage: {
    type: '_id debe ser de tipo string',
    format: '_id debe cumplir con el formato de uuid4'
  }
}

export const usernameDTO = {
  type: 'string',
  minLength: 4,
  maxLength: 15,
  errorMessage: {
    type: 'username debe ser de tipo string',
    minLength: 'username debe contener al menos 4 caracteres',
    maxLength: 'username debe contener un máximo de 15 caracteres'
  }
}

export const emailDTO = {
  type: 'string',
  format: 'email',
  errorMessage: {
    type: 'email debe ser de tipo string',
    format: 'email debe ser un formato email válido'
  }
}

export const passwordDTO = {
  type: 'string',
  format: 'password',
  minLength: 8,
  maxLength: 20,
  errorMessage: {
    type: 'password debe ser de tipo string',
    format:
      'password debe contener al menos una mayúscula,una minúscula y un número',
    minLength: 'password debe contener al menos 8 caracteres',
    maxLength: 'password no debe contener  más de 20 caracteres'
  }
}

export const roleDTO = {
  type: 'string',
  errorMessage: {
    type: 'role debe ser de tipo string'
  }
}

export const postsDTO = {
  type: 'array',
  items: {
    type: 'string',
    format: 'uuid'
  },
  errorMessage: 'posts debe ser un arreglo de strings'
}

export const likedPostsDTO = {
  type: 'array',
  items: {
    type: 'string',
    format: 'uuid'
  },
  errorMessage: 'likedPosts debe ser un arrego de strings'
}
