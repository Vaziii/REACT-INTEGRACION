# Respuestas de analisis

## 1. Para que sirve useState en este laboratorio?

Sirve para manejar datos que cambian en la interfaz: publicaciones, carga,
errores, campos del formulario, autor y busqueda.

## 2. Por que usamos useEffect para cargar las publicaciones?

Porque permite ejecutar la peticion inicial a la API cuando el componente se
monta. Con el arreglo vacio `[]`, la carga se realiza una sola vez.

## 3. Que diferencia hay entre api.js y postService.js?

`api.js` configura la instancia base de Axios. `postService.js` usa esa
instancia para definir las operaciones especificas de publicaciones.

## 4. Por que separamos la logica en un custom hook?

Porque el hook `usePosts` concentra la logica de negocio y deja al componente
enfocado en la interfaz visual.

## 5. Que hace setPosts(datos.slice(0, 10))?

Guarda solo las primeras diez publicaciones recibidas desde la API.

## 6. Que hace filter cuando eliminamos una publicacion?

Crea un nuevo arreglo sin la publicacion cuyo `id` coincide con el elemento
eliminado.

## 7. Que ocurre si la API no responde?

El bloque `catch` asigna un mensaje de error, y la interfaz muestra ese mensaje
al usuario.

## 8. Por que se usa preventDefault() en el formulario?

Para evitar que el navegador recargue la pagina al enviar el formulario.

## 9. Que ventaja tiene Axios frente a escribir todo directamente con fetch?

Axios simplifica la configuracion base, el manejo de respuestas JSON,
interceptores, timeouts y errores HTTP.

## 10. Que parte del proyecto se encarga de la interfaz visual?

El componente `GestorPosts.jsx`, junto con los estilos definidos en
`index.css`, se encarga de la interfaz visual.
