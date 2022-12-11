
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

> Recomendado: la imagen se puede subir en base 64 usando el Post "/movies/with-uri". He dejado el Post "/movies" para subir un archivo también pero no lo recomiendo.













Permitir la subida de archivos a vuestro servidor. Hacer que una de vuestras colecciones incluya imágenes y que estas se guarden en el servidor utilizando multer.

Desplegar la aplicación. Subir el servidor a un proveedor de servicio como Vercel (a elección de cada uno), configurar variables de entorno y subir los archivos a la nube con Cloudinary.

Añadir nuevas colecciones y nuevos endpoints que se os ocurran. Algunos ejemplos serían
Un endpoint para recuperar películas paginadas
Que al eliminar una película se elimine de todos los cines que la tengan en cartelera.
Permitir a los usuarios añadir películas como favoritas.
Guardar número de veces que ha sido guardada una película como favorita y restar uno si se elimina un usuario que la marcó.
Estos son sólo algunos ejemplos, dejo a elección de cada uno los extras a añadir de cara a hacer las prácticas más variadas e interesantes. Podéis añadir a la base de datos cualquier colección que se os ocurra, sin limitaciones.

En la entrega final NO se deberán incluir:
Console logs
Debuggers
Código comentado que no se esté usando
Y se valorará positivamente que todo el código este documentado con comentarios que explique lo que hacen las funciones y fragmentos (Nos ayudará a entender lo que pretendéis hacer, aunque no lo logréis).

Además, también se valorará positivamente incluir un Readme en el que se documente lo que se ha hecho y las dificultades encontradas.

Como último extra es muy recomendable que en la entrega me paséis adjunta la colección de Postman en la que se incluyan todos los endpoints que habéis implementado. Servirá de presentación de vuestra API y dejará claro todo lo que habéis conseguido en un vistazo. Sabéis que podéis exportar las colecciones en formato JSON.


La fecha límite de entrega para la práctica será el 13 de diciembre, cualquier práctica entregada después de esa fecha (exceptuando motivos justificados) no servirá para superar el módulo.

¡En la sesión de mañana resolveremos dudas así que aprovechad para apuntarlas!

Recordaros que la entrega de esta práctica / proyecto final es obligatoria y debéis cumplir al menos con todos sus requisitos básicos. En caso de no entregar la práctica o hacerlo fuera de tiempo no se podrá superar el módulo de NodeJS.

Tanto yo como Santi quedamos a vuestra disposición para cualquier duda que tengáis. ¡Estaremos encantados de ayudaros!

¡Mucho ánimo chicos! Como ya hemos comentado en clase conseguir los requisitos básicos de la práctica es muy asequible y está al alcance de todos

Buen finde
