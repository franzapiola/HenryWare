require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/development`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

sequelize.authenticate()
 .then(() => {
     console.log('Connection is OK.')
 })
 .catch((error) => {
     console.log('Fail to connect to the database.', error);
 });

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Product, User, Categories, Carrito, Order, LineaDeOrden} = sequelize.models;


// Relaciones:

//Producto-Categoría M:M
//product_category es la tabla intermedia
Product.belongsToMany(Categories, {
  through:'product_category',
  as:"categories",
  foreignKey:'product_id'
});
Categories.belongsToMany(Product, {
  through:'product_category',
  as:"products",
  foreignKey:'category_id'
});

//User-Carrito 1:1
//añade el foreign key user_id al modelo de Carrito
User.hasOne(Carrito, {
  foreignKey: 'user_id'
});
Carrito.belongsTo(User, {
  foreignKey: 'user_id'
});

//User-Order 1:M
//añade el foreign key user_id al modelo de Order
User.hasMany(Order, {
  foreignKey: 'user_id'
});
Order.belongsTo(User, {
  foreignKey: 'user_id'
});

//Producto-Order M:M
//Utiliza Línea de Orden como tabla intermedia
Product.belongsToMany(Order, {
  through: LineaDeOrden,
  as: 'orders',
  foreignKey:'product_id'
});
Order.belongsToMany(Product, {
  through: LineaDeOrden,
  as: 'products',
  foreignKey:'order_id'
});





//Comentado por JX.
//Pruebas de back
//Descomentar desde aca:
/*

Product.create({  
      name : "Pendrive 32 GB",
      price : 200,
      description : "Pendrive de 32 GB almacenamiento. Tecnologia de punta para transferencia de datos.",
      rating : 4,
      warranty : 2,
      stock : 200,
      image : "https://i.ytimg.com/vi/v4yUOeevSR0/maxresdefault.jpg"
    })

Product.create({  
  name : "Thinkpad T-430",
  price : 75000,
  description : "The most popular PC in our legendary ThinkPad product line, the ThinkPad T430 is durable, secure, portable, and packed with features to enhance productivity. From its ultra-long battery life to its advanced wireless technology, the T430 helps you take your business to the next level.",
  rating : 5,
  warranty : 2,
  stock : 20,
  image : "https://www.lenovo.com/medias/lenovo-laptop-thinkpad-t430-main.png?context=bWFzdGVyfHJvb3R8NTY4Nzh8aW1hZ2UvcG5nfGg1MC9oZDIvOTUyNDAxMjE4NzY3OC5wbmd8NWIyYTg4YWU5N2Q3MmQ0MTA4NGZjZmQ4NWY1ODg2MTk5YjMyOWRjMDJiYTE0MjBjZWM5N2EyMWFjNTkxMjBhZg"
})

Product.create({  
  name : "MacBook-Air",
  price : 190000,
  description : "The incredibly thin and light MacBook Air is now more powerful than ever. It features a brilliant Retina display, new Magic Keyboard, Touch ID, processors with up to twice the performance, faster graphics, and double the storage capacity.",
  rating : 5,
  warranty : 1,
  stock : 5,
  image : "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Macbook_Air.jpg/1200px-Macbook_Air.jpg"
})


Product.create({  
  name : "Thinkpad T-480",
  price : 150000,
  description : "Far faster than its predecessor and has 8th generation Intel® Core™ processing.  Delivers high performance and is designed to take your productivity to new heights. Backed by the increased speed of DDR4 memory, the ThinkPad T480 gives you the power of a desktop PC and the freedom of a portable laptop.",
  rating : 5,
  warranty :2,
  stock : 15,
  image : "https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc3/ThinkPad_T480_7.png"
})

*/

//Categorias de prueba
/*Categories.create({
  category_id : 1,
  name : "Notebooks"
}).then((resp) =>{
      console.log({resp});
    }).catch(error => {
      console.log({error})
    })

Categories.create({
  category_id : 2,
  name : "Accesorios"
}).then((resp) =>{
      console.log({resp});
    }).catch(error => {
      console.log({error})

User.create({
  email:'nicokenny98@gmail.com',
  first_name:'Nicolas',
  last_name:'Kenny',
  address:'lalala 1234',
  phone_number:1161171314,
  role:'ADMIN'
})
})*/


module.exports = {
  ...sequelize.models,  // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};