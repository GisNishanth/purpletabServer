"use strict"

module.exports = function(sequelize, DataTypes) {
    var purpleUserRoleMap = sequelize.define("purpleUserRoleMap",{
        userRoleMapId:{
            type                :  DataTypes.INTEGER,
            allowNull           :  true,
            primaryKey          :  true,
            autoIncrement       :  true
        },
        userRoleId:{
            type                : DataTypes.INTEGER,
            foreignKey          : true
        },
        userId:{
            type                : DataTypes.INTEGER,
            foreignKey          : true
        },
        isDeleted:{
            type                : DataTypes.BOOLEAN,
            defaultValue        : false
        }
    });
    purpleUserRoleMap.associate = function (models) {
        purpleUserRoleMap.belongsTo(models.purpleUserRole,{foreignKey: 'userRoleId', onDelete: 'cascade'});
        purpleUserRoleMap.belongsTo(models.purpleUser,{foreignKey: 'userId', onDelete: 'cascade'});
    };
  return purpleUserRoleMap;
}