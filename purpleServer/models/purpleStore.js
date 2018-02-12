"use strict"

module.exports = function(sequelize, DataTypes) {
    var purpleStore = sequelize.define("purpleStore",{
        storeId:{
            type                :  DataTypes.INTEGER,
            allowNull           :  true,
            primaryKey          :  true,
            autoIncrement       :  true
        },
        userName:{
            type                : DataTypes.STRING,
            allowNull           : true
        },
        storeReferenceName:{
            type                : DataTypes.STRING,
            allowNull           : true
        },
        phoneNumber:{
            type                : DataTypes.STRING,
            allowNull           : true
        },
        websiteUrl:{
            type                : DataTypes.STRING,
            allowNull           : true
        },
        image:{
            type                : DataTypes.STRING,
            allowNull           : true
        },
        parentStoreId:{
            type                : DataTypes.INTEGER,
            allowNull           : true
        },
        officeNumber1:{
            type                : DataTypes.INTEGER,
            allowNull           : true
        },
        officeNumber2:{
            type                : DataTypes.INTEGER,
            allowNull           : true
        },
        isDeleted:{
            type                : DataTypes.BOOLEAN,
            defaultValue        : false
        }
    });
    purpleStore.associate = function (models) {
        purpleStore.belongsTo(models.purpleStore,{foreignKey: 'parentStoreId', onDelete: 'cascade'});
        purpleStore.hasMany(models.purpleUser,{foreignKey: 'storeId', onDelete: 'cascade'});
        purpleStore.hasMany(models.purpleUserRole,{foreignKey: 'storeId', onDelete: 'cascade'});
    };
  return purpleStore;
}