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
          len: {
            args: [4, 80],
            msg: "No es un email valido"
          },
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
        len: {
          args: [2, 15],
          msg: "No es nombre valido"
        },
        notNull: {
          msg: 'Nombre obligatorio'
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 15],
          msg: "No es apellido valido"
        },
        notNull: {
          msg: 'Apellido obligatorio'
        }
      }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [5, 20],
            msg: "No es apellido valido"
          },
          notNull: {
            msg: 'Dirección obligatoria'
          }
        }
    },
    phone_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: {
            args: [7, 15],
            msg: "No es un numero valido"
          },
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
        defaultValue: 'user',
        validate: {
          len: {
            args: [4, 5],
            msg: "No es un role valido"
          },
        }
    },
    password: {
        type: DataTypes.TEXT,
        allowNull:false,
        set(value){
          const salt = bcrypt.genSaltSync(10)
          const hash = bcrypt.hashSync(value, salt);
          this.setDataValue('password', hash);
        }
    }
  });
};



module.exports = User;


























