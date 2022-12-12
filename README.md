
- Los get no son key-sensitives por lo que se puede localizar titulo de peliculas (y otros get
con String) tanto en mayúsculas como minúsculas.

- Se implementa Passport para la gestión de Cinemas y JWT para la gestión de Movies.

Cinemas (gestion Passport) --> Implemento roles con Passport ya que con JWT lo vimos en clase.

> Cualquier usuario puede hacer un Get de los Cinemas. 
> Cualquier usuario registrado e identificado en el sistema puede hacer un Post y Edit. Por ejemplo,  el usuario miguel@miguel.com con clave "pepe" (tiene rol "Admin" en lugar de "admin").
> Sólo los usuarios registrados e identificados con el rol "admin" pueden hacer un Delete. Por ejemplo, el usuario miguel3@miguel.com con clave "pepe" (tiene rol "admin)

Movies (gestión JWT)

> Cualquier usuario puede hacer cualquier Get.
> Sólo los usuarios registrados e identificados en el sistema puede hacer un Post y Edit. Por ejemplo,  el usuario miguel@miguel.com con clave "pepe".

- Movies. Las peliculas aceptan una cover (imagen con la cubierta de la pelicula). 

> Recomendado: la imagen se puede subir en base 64 usando el Post "/movies/with-uri". Funciona Post "/movies" para subir un archivo también pero no lo recomiendo (de hecho, lo he quitado de Postman).

- Desplegada en producción: https://proyecto-node-olive.vercel.app/


