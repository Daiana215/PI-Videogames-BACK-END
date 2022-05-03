const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {

    class Genre extends Model {}

    Genre.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        }, {
        sequelize,
        modelName: 'Genre'
    });
}