<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

# HenryWare

## Introducción

Esta aplicación de **React** fue desarrollada por el grupo 10 del cohorte 04 de <a href="https://www.soyhenry.com">Henry</a>. Es un **e-commerce de productos relacionados a la tecnología y computación**. Fue nuestro primer proyecto. Luego de terminar la cursada, el objetivo era familiarizarnos más con el workflow de **GIT** y **SCRUM**, y poner en práctica las tecnologías que aprendimos:

- React
- Redux
- CSS
- Bootstrap
- Express
- Node.js
- Sequelize
- PostgreSQL


# Cómo levantar la aplicación
Antes que nada, asegúrate de tener instalados los siguientes programas y dependencias:
- <a href="https://nodejs.org/en/download/">Node</a> (versión 12.18.3 o mayor)
- NPM (versión 6.14.16 o mayor)
- <a href="https://www.enterprisedb.com/downloads/postgres-postgresql-downloads">PostgreSQL</a>
- <a href="https://www.pgadmin.org/download/">pgAdmin 4</a>
- <a href="https://www.postman.com/">Postman</a>

Para verificar si tienes instalado Node y NPM o consultar qué versión tienes, ejecuta los siguientes comandos en una terminal:

>node -v
>
>npm -v

A continuación veremos qué pasos hay que seguir para poder probar esta aplicación:

1. ### <a href="https://docs.github.com/es/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/cloning-a-repository">Clonar este repositorio</a>
2. ### Crear la base de datos
    - Instala PostgreSQL. Recuerda el nombre de usuario y contraseña que elegiste  durante la instalación.
    - Para crear la base de datos, la manera más fácil es a través de pgAdmin:
        1. Abre pgAdmin
        2. Clickea 'Servers'
        3. Click derecho a 'PostgreSQL'
        4. Crea la base de datos. El nombre debe ser 'henryWare'.


3. ### Crear archivo .env (variables de entorno)
En la carpeta `api` de tu copia de este repositorio, crea un archivo con el nombre '.env'. Copia en ese archivo el texto que ves a continuación. Cambia los campos que están *`pintados`*:

>DB_HOST=localhost
>
>DB_USER=*`tu_usuario_de_PostgreSQL`*
>
>DB_PASSWORD=*`tu_contraseña_de_PostgreSQL`*
>
>ACCESS_TOKEN_SECRET=*`cualquier_cosa`*
>
>REFRESH_TOKEN_SECRET=*`lo_que_sea`*

4. ### Levantar la aplicación
Primero abre en una terminal la carpeta `api` y ejecuta desde ahí, en orden, los siguientes comandos:
>npm install
>
>npm start

Deja esa terminal abierta. Ahora, en una nueva terminal, abre la carpeta `client` y repite los mismos comandos. Al terminar, se abrirá la aplicación en una nueva pestaña en tu navegador.

5. ### Ingresa a HenryWare como admin
Hay features de la aplicación que sólo están disponibles para un usuario administrador, como por ejemplo cargar nuevos productos o promover a  administrador a otro usuario. Con las siguientes credenciales podrás acceder a esas características:
>email: admin@henryware.test
>
>contraseña: 123456789

# Descripción
A continuación veremos un breve recorrido a través de los features más importantes de la aplicación...

## Catálogo
<p align='center'>
    <img src='https://i.imgur.com/vXokYi9.jpg' </img>
    <!-- <img src='https://i.imgur.com/S7ewPf2.jpg' </img> -->
</p>

Aquí se pueden ver todos los productos disponibles para su compra. Está **paginado** y la **búsqueda** en la barra de navegación es instantánea, y se puede también **filtrar** por categorías. Si hay un usuario logeado, permite agregar/remover productos a su **wishlist**. Los productos **sin stock** son visibles, pero no está disponible la opción de agregar a carrito.
<p align='center'>
    <img src='https://i.imgur.com/S7ewPf2.jpg' </img>
</p>


## Detalles de producto
<p align='center'>
    <img src='https://i.imgur.com/ZSrXTWw.png' </img>
</p>

Muestra más información sobre el producto, y también incluye la sección de **reviews**. Si el usuario logeado es admin, también hay un botón **Editar** que redirige al CRUD y filtra automáticamente según el ID del producto que se desea editar.

## Carrito
<p align='center'>
    <img src='https://i.imgur.com/dCtX1gI.jpg' </img>
</p>

Después de elegir productos desde el catálogo, el cliente puede dirigirse a su carrito. Si aún no inició sesión, en este momento se le presenta la opción de hacerlo para poder continuar con el proceso de compra.

## Checkout
<p align='center'>
    <img src='https://i.imgur.com/UulnC3t.jpg' </img>
</p>

En esta pantalla hay un formulario en el cual el usuario deberá ingresar sus datos (método y detalles de pago, dirección de envío, etc) para poder concretar la compra. Al finalizar, se le envía un **correo** al cliente con los detalles de la orden. Existe la opción de utilizar un **código de descuento**.

## UI de administrador
<p align='center'>
    <img src='https://i.imgur.com/SN6Yyp9.jpg' </img>
</p>

Si un usuario administrador inicia sesión, tiene algunas posibilidades más. La más importante es el **CRUD de productos**. Esta UI muestra una **lista completa** de los productos publicados y le permite al usuario admin **modificar** los datos de alguna publicación (imágenes, descripción, precio, categorías, etc), así como **eliminarla** o **publicar un nuevo producto**. Es fácilmente **filtrable por ID, nombre o categoría** y está **paginado**. Un admin también puede acceder a un **listado de usuarios, un listado de órdenes y un listado de categorías**.

## Nuestro equipo, grupo 10 - cohorte 04 de HENRY:
- Nicolás Velandia - https://www.linkedin.com/in/nicolas-velandia-8849b71b6/
- Francisco Zapiola - https://www.linkedin.com/in/francisco-zapiola-martin-44301b1a6/
- Juan Cruz Barneix - https://www.linkedin.com/in/juan-cruz-barneix-9a0a17188/
- Gastón Ferreyra - https://www.linkedin.com/in/gaston-ferreyra-b0891562/
- Nicolás Kenny - https://www.linkedin.com/in/nicolasdkenny/
- Alexis Enríquez - https://www.linkedin.com/in/alexis-enriquez/
