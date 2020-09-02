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
const { Product, User, Categories} = sequelize.models;


//Comentado por JX.
//Pruebas de back
//Descomentar desde aca:

/*
Product.create({  
      name : "pendrive",
      price : 23,
      description : "req.query.desc",
      rating : 2,
      warranty : 1,
      stock : 22,
      image : "req.query.img"
    }).then((res) =>{
      console.log({res});
    }).catch(error => {
      console.log({error})
    })

Product.create({  
      name : "cdvirgen",
      price : 0,
      description : "para los que jugamos al lol",
      rating : 5,
      warranty :999,
      stock : 5,
      image : "req.query.img"
    }).then((res) =>{
      console.log({res});
    }).catch(error => {
      console.log({error})
    })
*/

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Product.belongsToMany(Categories,{through:'product_category',as:"categories",foreignKey:'product_id'})
Categories.belongsToMany(Product,{through:'product_category',as:"products",foreignKey:'category_id'})

module.exports = {
  ...sequelize.models,  // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
