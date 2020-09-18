const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
const User = (sequelize) => {
  // defino el modelo
  sequelize.define('user', {
    user_id:{
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey: true,
      unique:true
    },
    email: {
      type: DataTypes.STRING,
      validate: {
          isEmail: {
            msg: "No es un email valido"
          },
          notNull: {
            msg: 'Email obligatorio'
          }
      },
      unique: true,
      allowNull: false,
      
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Nombre obligatorio'
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Apellido obligatorio'
        }
      }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Dirección obligatoria'
          }
        }
    },
    phone_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
          isInt: {
            msg: "No es un numero"
          },
          notNull: {
            msg: 'Numero obligatorio'
          }
        }
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user'
    },
    password: {
        type: DataTypes.TEXT,
        set(value){
          bcrypt.hash(value, 10)
          .then(hash => this.setDataValue('password', hash))
          //No sé que otra cosa podria hacer con el error? mmm...
          .catch(error => console.log('ERROR PASSWORD:', error));
        }
    }
  });
};

module.exports = User;