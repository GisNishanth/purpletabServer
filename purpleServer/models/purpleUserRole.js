"use strict"

module.exports = function(sequelize, DataTypes) {
    var purpleUserRole = sequelize.define("purpleUserRole",{
        userRoleId:{
            type                :  DataTypes.INTEGER,
            allowNull           :  true,
            primaryKey          :  true,
            autoIncrement       :  true
        },
        storeId:{
            type                : DataTypes.INTEGER,
            foreignKey          : true
        },
        roleName:{
            type            : DataTypes.STRING,
            allowNull       : true
        },
        description:{
            type            : DataTypes.STRING,
            allowNull       : true
        },
        status:{
            type            : DataTypes.STRING,
            allowNull       : true
        },
        createdBy:{
            type            : DataTypes.INTEGER,
            allowNull       : true
        },
        updatedBy:{
            type            : DataTypes.INTEGER,
            allowNull       : true
        },
        isDeleted:{
            type            : DataTypes.BOOLEAN,
            defaultValue       : false
        }
    });
    purpleUserRole.associate = function (models) {
        purpleUserRole.belongsTo(models.purpleStore,{foreignKey: 'storeId', onDelete: 'cascade'});
        // purpleUserRole.belongsTo(models.purpleAddress,{foreignKey: 'addressId',as: 'addressDetails', onDelete: 'cascade'});
    };
  return purpleUserRole;
}