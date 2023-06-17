# Nodejs-blog

Simple blog developed usign Nodejs,Express and mongoDB.

# Definición de entidades

- User:Usuario registrado en el blog,todos los campos son obligatorios
  - \_id:Identificador del usuario
  - username: Nombre de el usuario
  - role : Rol del usuario (por defecto user)
  - email: Correo electrónico del usuario
  - password: Contraseña del usuario
  - posts: Cada uno de los posts publicados por el usuario
  - likedPosts: \_id de todos los posts a los que el usuario les ha dado me gusta
- Post: Publicación registrada en la plataforma,todos los campos son obligatorios
  - \_id: Identificador del post
  - author: Autor del post
  - title: Título del post
  - content: Contenido del post
  - likes: Cuantos usuarios le han dado a me gusta y la posibilidad de hacerlo para cada uno de ellos
  - comments: Comentarios añadidos al post por otros usuarios
  - date: Fecha de publicación del post

# Funcionalidades

- El usuario deberá ser capaz de registrase aportando todos los datos indicados en el apartado anterior
- El usuario deberá ser capaz de hacer un login aportando email o usuario y contraseña,devolviéndole un token (caduca cada 7 días)
- El usuario deberá ser capaz de acceder a sus datos dentro de la plataforma (\_id,username...)
- El usuario deberá ser capaz de modificar su "usename" aportando su token de identificación
- El usuario deberá ser capaz de modificar su "email" aportando su contraseña y su tolen de identificación
- El usuario deberá ser capaz de modificar su "contraseña" aportando su contraseña actual,la nueva contraseña y su token de identificación
- El usuario deberá ser capaz de publicar posts dentro de la plataforma
- El usuario deberá ser capaz de darle me gusta a los posts de otros usuarios dentro de la plataforma y comentar en ellos
- El usuario deberá ser capaz de modificar y eliminar sus posts dentro de la plataforma
- El o los usuarios con el "role" de admin deberán ser capaces de eliminar cualquier post dentro de la plataforma
- Los posts podrán ser buscados por su \_id o por su título y autor
- El o los usuarios con el "role" de admin deberán ser capaces de banear a cualquier usuario dentro de la plataforma

#Endpoints

Server on Render --> https://jlblog.onrender.com
- /user
  - /register --> Registrar un usuario
  - /login --> Iniciar sesión (devuelve un JWT)
  - /profile --> Obtener el perfil del usuario
  - /get-username/:userId --> Obtener el nombre de usuario por su _id
  - /update-username --> Editar el username
  - /update-email --> Editar el email
  - /update-password --> Editar la contraseña
  - /unregister --> Eliminar usuario
- /posts
  - /create --> Crear un post
  - /like/:postId --> Dar me gusta a un post
  - /liked --> Obtener posts a los que se ha dado me gusta
  - /comment/:postId --> Comentar en un post
  - /comment-delete/:postId --> Eliminar el comentario publicado en un post
  - /modify/:postId --> Modificar un post
  - /delte/:postId --> Eliminar un post
  - /get-byid/:postId --> Obtener un post por su _id
  - /get-byauthor/:authorId --> Obtener los posts publicados por un usuario
  - /get?author:authorUsername&title=postTitle --> Obtener un post por el username de su autor y el título del post

# Tecnologías empleadas

- Nodejs :Programación
- MongoDB:Base de datos
- Librerías (dependencias)
- [Express]:Servidor web
- [Jose]-->JWT
- [Ajv]-->Json schema validation
- [ajv-errors]-->Json schema errors
- [ajv-formats]-->Json schema formats
- [Mongoose]-->Interacción con base de datos en MongoDB
- [Bcrypt]-->Hash de las contraseñas
- [Dotenv]-->Usar las variables de entorno
- Desarrollo (dependencias de desarrollo)
- [Eslint]--> Analiza sintácticamente el código para notificar problemas
- [Standard.js] --> Configuración de Eslint
- [Prettier] --> Formateador de código
- [Nodemon] --> Escucha cambios en los archivos durante el desarrollo
- [Lint-staged] --> Ejecuta los linters y los formateadores antes de cada commit

<!-- ENLACES UTILIZADOS EN ESTE DOCUMENTO -->

[Express]: https://www.npmjs.com/package/express
[Jose]: https://www.npmjs.com/package/jose
[Ajv]: https://ajv.js.org/api.html
[ajv-errors]: https://ajv.js.org/packages/ajv-errors.html
[ajv-formats]: https://ajv.js.org/packages/ajv-formats.html
[Mongoose]: https://mongoosejs.com/docs/
[Bcrypt]: https://www.npmjs.com/package/bcrypt
[Dotenv]: https://www.npmjs.com/package/dotenv
[Eslint]: https://eslint.org/
[Standard.js]: https://standardjs.com/
[Prettier]: https://prettier.io/
[Nodemon]: https://www.npmjs.com/package/nodemon
[Lint-staged]: https://www.npmjs.com/package/lint-staged
