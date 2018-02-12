"use strict"

module.exports = function(sequelize, DataTypes) {
    var purpleAddress = sequelize.define("purpleAddress",{
        addressId:{
            type                :  DataTypes.INTEGER,
            allowNull           :  true,
            primaryKey          :  true,
            autoIncrement       :  true
        },
        userId:{
            type                : DataTypes.INTEGER,
            foreignKey          : true
        },
        street:{
            type                : DataTypes.STRING,
            allowNull           : true
        },
        city:{
            type            : DataTypes.STRING,
            allowNull       : true
        },
        state:{
            type            : DataTypes.STRING,
            allowNull       : true
        },
        postalCode:{
            type            : DataTypes.STRING,
            allowNull       : true
        },
        latitude:{
            type            : DataTypes.FLOAT,
            allowNull       : true
        },
        longitude:{
            type            : DataTypes.FLOAT,
            allowNull       : true
        },
        isDeleted:{
            type            : DataTypes.BOOLEAN,
            defaultValue       : false
        }
    });
    purpleAddress.associate = function (models) {
        purpleAddress.belongsTo(models.purpleUser, { foreignKey:'userId', as: 'userDetails', onDelete: 'cascade'});
    };
  return purpleAddress;
}