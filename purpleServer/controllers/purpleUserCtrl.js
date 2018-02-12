const User = require('../models').purpleUser;
const UserImage = require('../models').purpleUserImage;
const UserRole = require('../models').purpleUserRole;
const UserRolePermission = require('../models').purpleUserRolePermission;
const UserRoleMap = require('../models').purpleUserRoleMap;
const Store = require('../models').purpleStore;
const Address = require('../models').purpleAddress;
const AppDetail = require('../models').AppDetails;
const Response       =   require("../helper/errorhandling.js");

var Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bcrypt = require('bcrypt');

module.exports = {
	create(req, res){
		var userData = req.body;
		var salt = bcrypt.genSaltSync(10);
		var hash = bcrypt.hashSync(userData.password, salt);
		userData.password = hash;
		// console.log(userData,'userdataaaa');
		// return false;
		

		User
			.findOrCreate({where:{[Op.or]: [{email: userData.email}, {mobile: userData.mobile}]}, defaults: userData})
			.spread((userRole, status) => {
			    
			    if(status){
			    	var addressObj = {
			    		'userId': userRole.userId,
						'street': userData.street,
						'city': userData.city,
						'state': userData.state,
						'postalCode': userData.postalCode,
						'latitude': userData.latitude,
						'longitude': userData.longitude
					}
			    	Address
						.create(addressObj)
						.then(result => {
					     	if(result){
					     		UserRoleMap
									.create({userRoleId: userData.userRoleId,userId: userRole.userId})
									.then(result => {
								     	if(result){
								     		res.status(200).send({success:true,message:'Role created successfully'});
										}else{
											res.status(401).send({success:false,message:'Error in user mapping'});
										}
								});
							}else{
								res.status(401).send({success:false,message:'Error in saving address'});
							}
					});
				 	
			    	
			    }else{
			    	res.status(401).send({success:false,message:'User email or mobile already exists'});
			    }
			});
		
		
	},
	createUserRole(req, res){
		var userData = req.body;
		UserRole
			.findOrCreate({where: {roleName: userData.roleName,storeId: userData.storeId }, defaults: userData})
			.spread((userRole, status) => {
			    if(status){
			    	Response.getSuccessResult(status,res);
			    }else{
			    	Response.getErrorResult(status,res);
			    }
			});
	},
	getUserList(req, res){
		var userInput = req.query;
		if(userInput.type == 'user'){
			User.findAll({ where: { storeId: userInput.id }, include: [{ model: Store},{model:UserRoleMap,include:[UserRole]}]  }).then(result => {
			  if(result && result.length){
			  		return Response.getListResult(result, res);
			  }else{
					return Response.getNotExistsResult(result, res);
			  }
			})
		}else{
			UserRole.findAll({ where: { storeId: userInput.id }, include: [{ model: Store}]  }).then(result => {
			  if(result && result.length){
			  		return Response.getListResult(result, res);
			  }else{
					return Response.getNotExistsResult(result, res);
			  }
			})
		}
			
	},
	createUserRolePermission(req, res){
		var userRole = req.body;
		console.log(userRole);
		UserRolePermission
			.create(userRole)
			.then(result => {
				// console.log(result);
		     	if(result){
		     		Response.getSuccessResult(status,res);
				}else{
					Response.getErrorResult(status,res);
				}
		 	});
			    
	},
	getUsersByStoreId(req, res){
		var userInput = req.query;
	   	return purpleUser.findAndCountAll({
	        where: {
	        	'storeId' : userInput.storeId
	        }
	    }).then(function(details) {
	        if(details){
	            return Response.getListResult(details, res);
	        }
	        else{
	            return Response.getNotExistsResult(details, res);
	        }
	     }).catch(function(error){
	        return Response.getBadRequestResult(error, res);
	     });
	}
	// ,
	// deleteAppMaster(req, res){
	// 	var userInput = req.params;
	// 	//console.log(req,'req');
	//     return AppMaster.destroy({
	//      	where: {
	//         	id: userInput.id //this will be your id that you want to delete
	//      	}
	//     }).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
	//       	if(rowDeleted === 1){
	//          	return Response.getDeleteResult(rowDeleted, res);
	//       	}
	//       	else{
	//         	return Response.getDeleteErrorResult(rowDeleted, res);
	//       	}
	//     }).catch(function(error){
	//       	return Response.getUpdateErrorResult(error, res);
	//     });
	// }
};