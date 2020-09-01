const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price:{
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    description:{
      type:DataTypes.TEXT,
      allowNull:false,
    },
    rating:{
      type:DataTypes.INTEGER,
      allowNull:true,
    },
    warranty:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    stock:{
      type:DataTypes.INTEGER,
      allowNull:false,
    }
  });
};
