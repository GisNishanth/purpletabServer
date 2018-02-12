"use strict"

module.exports = function(sequelize, DataTypes) {
    var purpleUser = sequelize.define("purpleUser",{
        userId:{
            type                :  DataTypes.INTEGER,
            allowNull           :  true,
            primaryKey          :  true,
            autoIncrement       :  true
        },
        storeId:{
            type                : DataTypes.INTEGER,
            foreignKey          : true,
            allowNull           : false
        },
        userName:{
            type                : DataTypes.STRING,
            allowNull           : true
        },
        email:{
            type                : DataTypes.STRING,
            allowNull           : true
        },
        alternateEmail:{
            type                : DataTypes.STRING,
            allowNull           : true
        },
        password:{
            type                : DataTypes.STRING,
            allowNull           : true
        },
        mobile:{
            type                : DataTypes.STRING,
            allowNull           : true
        },
        imageId:{
            type                : DataTypes.INTEGER,
            allowNull           : true
        },
        isActive:{
            type                : DataTypes.BOOLEAN,
            defaultValue        : false
        },
        isAuthorized:{
            type                : DataTypes.BOOLEAN,
            defaultValue        : false
        },
        isDeleted:{
            type                : DataTypes.BOOLEAN,
            defaultValue        : false
        }
    });
    purpleUser.associate = function (models) {
        // purpleUser.hasMany(models.purpleUserRole,{foreignKey: 'userId', onDelete: 'cascade'});
        purpleUser.hasMany(models.purpleUserRoleMap,{foreignKey: 'userId', onDelete: 'cascade'});
        purpleUser.belongsTo(models.purpleStore,{foreignKey: 'storeId', onDelete: 'cascade'});
        // purpleUser.belongsTo(models.purpleAddress,{foreignKey: 'addressId',as: 'addressDetails', onDelete: 'cascade'});
        purpleUser.belongsTo(models.purpleUserImage,{foreignKey: 'imageId', onDelete: 'cascade'});
    };
  return purpleUser;
}