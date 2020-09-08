const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
    sequelize.define('LineaDeOrden', {
        lineaDeOrden_id: {
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        //Para que sequelize no le ponga a la table automáticamente el nombre 'LineaDeOrdens'
        freezeTableName: true
    })
}