<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

# HenryWare

## Introducción

Esta página de e-commerce fue desarrollada por el grupo 10 de Henry, del cohorte 04. Es una **tienda online de productos relacionados a la tecnología y computación**. Fue nuestro primer proyecto. Luego de terminar la cursada, el objetivo era familiarizarnos más con el workflow de **GIT** y **SCRUM**, y poner en práctica las tecnologías que aprendimos:

- React
- Redux
- CSS / Bootstrap
- Express
- Node.js
- Sequelize
- PostgreSQL


## Levantar la aplicación
Si estás interesado/a en probar esta aplicación, estos son los pasos a seguir.

Después de clonar el repositorio, tendrás que ir a la carpeta `api` y ejecutar los siguientes comandos, en orden:

>npm install
>
>npm start

Luego, repite los mismos comandos, pero en la carpeta `client`. Al terminar, se abrirá la aplicación en una nueva pestaña en tu navegador.

## Descripción
A continuación haremos un breve recorrido a través de los features más importantes de la aplicación.

* __Catálogo__: aquí se pueden ver todos los productos disponibles para su compra. Está **paginado** y la **búsqueda** en la barra de navegación es instantánea, y se puede también **filtrar** por categorías. Si hay un usuario logeado, permite agregar/remover productos a su **wishlist**. Los productos **sin stock** son visibles, pero no está disponible la opción de agregar a carrito.

<p align='center'>
    <img src='https://i.imgur.com/vXokYi9.jpg' </img>
    <img src='https://i.imgur.com/S7ewPf2.jpg' </img>
</p>

* __Detalles de producto__: muestra más **información** sobre el producto, y también incluye la sección de **reviews**. Si el usuario logeado es admin, también hay un botón **Editar** que redirige al CRUD y filtra automáticamente según el ID del producto que se desea editar.
<p align='center'>
    <img src='https://i.imgur.com/ZSrXTWw.png' </img>
</p>

* __Carrito__: después de elegir productos desde el catálogo, el cliente puede dirigirse a su carrito. Si aún no inició sesión, en este momento se le presenta la opción de hacerlo para poder continuar con el proceso de compra.
<p align='center'>
    <img src='https://i.imgur.com/dCtX1gI.jpg' </img>
</p>

* __Checkout__: en esta pantalla hay un formulario en el cual el usuario deberá ingresar sus datos (método y detalles de pago, dirección de envío, etc) para poder concretar la compra. Al finalizar, se le envía un **correo** al cliente con los detalles de la orden. Existe la opción de utilizar un **código de descuento**.
<p align='center'>
    <img src='https://i.imgur.com/UulnC3t.jpg' </img>
</p>

* __UI de administrador__: si un usuario administrador inicia sesión, tiene algunas posibilidades más. La más importante es el **CRUD de productos**. Esta UI muestra una **lista completa** de los productos publicados y le permite al usuario admin **modificar** los datos de alguna publicación (imágenes, descripción, precio, etc), así como **eliminarla** o **publicar un nuevo producto**. Es fácilmente **filtrable por ID, nombre o categoría** y está **paginado**.
<p align='center'>
    <img src='https://i.imgur.com/SN6Yyp9.jpg' </img>
</p>

## Grupo 10 - Cohorte 04 de HENRY. Nuestro equipo:
- Nicolás Velandia - https://www.linkedin.com/in/nicolas-velandia-8849b71b6/
- Francisco Zapiola - https://www.linkedin.com/in/francisco-zapiola-martin-44301b1a6/
- Juan Cruz Barneix - https://www.linkedin.com/in/juan-cruz-barneix-9a0a17188/
- Gastón Ferreyra - https://www.linkedin.com/in/gaston-ferreyra-b0891562/
- Nicolás Kenny - https://www.linkedin.com/in/nicolasdkenny/
- Alexis Enríquez - https://www.linkedin.com/in/alexis-enriquez/