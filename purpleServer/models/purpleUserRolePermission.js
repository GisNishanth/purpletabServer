"use strict"

module.exports = function(sequelize, DataTypes) {
    var purpleUserRolePermission = sequelize.define("purpleUserRolePermission",{
        userRolePermissionId:{
            type                :  DataTypes.INTEGER,
            allowNull           :  true,
            primaryKey          :  true,
            autoIncrement       :  true
        },
        storeId:{
            type                : DataTypes.INTEGER,
            foreignKey          : true
        },
        userRoleId:{
            type                : DataTypes.INTEGER,
            foreignKey          : true
        },
        moduleGroup:{
            type            : DataTypes.STRING,
            allowNull       : true
        },
        moduleName:{
            type            : DataTypes.STRING,
            allowNull       : true
        },
        applicationId:{
            type            : DataTypes.STRING,
            allowNull       : true
        },
        permission:{
            type            : DataTypes.ENUM('noAccess', 'viewPermission', 'modifyPermission'),
            defaultValue    : 'noAccess'
        },
        isDeleted:{
            type            : DataTypes.BOOLEAN,
            defaultValue       : false
        }
    });
    purpleUserRolePermission.associate = function (models) {
        purpleUserRolePermission.belongsTo(models.purpleStore,{foreignKey: 'storeId',as: 'userStoreDetails', onDelete: 'cascade'});
        purpleUserRolePermission.belongsTo(models.purpleUserRole,{foreignKey: 'userRoleId',as: 'userRoleDetails', onDelete: 'cascade'});
        // purpleUser.belongsTo(models.purpleAddress,{foreignKey: 'addressId',as: 'addressDetails', onDelete: 'cascade'});
    };
  return purpleUserRolePermission;
}