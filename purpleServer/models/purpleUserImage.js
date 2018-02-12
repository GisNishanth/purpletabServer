"use strict"

module.exports = function(sequelize, DataTypes) {
    var purpleUserImage = sequelize.define("purpleUserImage",{
        imageId:{
            type                :  DataTypes.INTEGER,
            allowNull           :  true,
            primaryKey          :  true,
            autoIncrement       :  true
        },
        name:{
            type                : DataTypes.STRING,
            allowNull           : true
        },
        isDeleted:{
            type                : DataTypes.BOOLEAN,
            defaultValue        : false
        }
    });
    purpleUserImage.associate = function (models) {
        purpleUserImage.hasOne(models.purpleUser,{foreignKey: 'imageId', onDelete: 'cascade'});
        // purpleUserRole.belongsTo(models.purpleAddress,{foreignKey: 'addressId',as: 'addressDetails', onDelete: 'cascade'});
    };
  return purpleUserImage;
}