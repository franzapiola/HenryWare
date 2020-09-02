const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // modelo categories
  sequelize.define('categories', {
    category_id :{
      type: DataTypes.INTEGER,
      allowNull : false
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false
    }
    
  });
};
