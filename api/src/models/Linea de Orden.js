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
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        //Devuelve el precio total de todas las unidades compradas (VIRTUAL: no se almacena en la db)
        //Si agregaramos descuentos o algo por el estilo, habría que contemplarlo acá, en el get
        total_price: {
            type: DataTypes.VIRTUAL,
            allowNull: false,
            get(){
                const precioIndividual = this.getDataValue(price);
                const cantidad = this.getDataValue(quantity);
                
                return precioIndividual * cantidad;
            }
        }
    }, {
        //Para que sequelize no le ponga a la table automáticamente el nombre 'LineaDeOrdens'
        freezeTableName: true
    })
}