var Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Store = require('../models').purpleStore;
const User = require('../models').purpleUser;
const UserRoleMap = require('../models').purpleUserRoleMap;
const Address = require('../models').purpleAddress;
const Response       =   require("../helper/errorhandling.js");
const upload       =   require("../helper/commonUpload.js");
const bcrypt = require('bcrypt');


// var env           = process.env.NODE_ENV || 'development';
// var config        = require('../config/config.json')[env];
// const utils = require("../../Utils.js");
// // const Ip = require('../../').Utils.getIp;
// const serverPath = 'http://'+utils.getIp+':'+config.port+'/purpleServer/public/uploads/store-';

module.exports = {
	create(req, res){
		var userData = req.body;
		console.log(userData);
		if(userData.user.password){
			var salt = bcrypt.genSaltSync(10);
			var hash = bcrypt.hashSync(userData.user.password, salt);
			userData.user.password = hash;
		}
		
		Store
			.findOrCreate({where:{phoneNumber: userData.store.mobile}, defaults: userData.store})
			.spread((store, status) => {
				userData.user.storeId = store.storeId;
				if(status){
					User
						.findOrCreate({where:{[Op.or]: [{email: userData.user.email}, {mobile: userData.user.mobile}]}, defaults: userData.user})
						.spread((userRole, status) => {
						    
						    if(status){
						    	var addressObj = {
						    		'userId': userRole.userId,
									'street': userData.store.street,
									'city': userData.store.city,
									'state': userData.store.state,
									'postalCode': userData.store.postalCode,
									'latitude': userData.store.latitude,
									'longitude': userData.store.longitude
								}
						    	Address
									.create(addressObj)
									.then(result => {
								     	if(result){
								     		UserRoleMap
												.create({userRoleId: userData.user.userRoleId,userId: userRole.userId})
												.then(result => {
											     	if(result){
											     		Response.getSuccessResult(userData,res);
													}else{
														Response.getErrorResult(result,res);
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
				}else{
					res.status(401).send({success:false,message:'User email or mobile already exists'});
				}
			});
		
		
	},
	getStores(req, res){
		var userInput = req.query;
		if(userInput.storeId){
			var conditions = {
				storeId : userInput.storeId
			}
		}else if(userInput.parentStoreId){
			var conditions = {
				parentStoreId : userInput.parentStoreId
			}
		}

	   	Store.findAll({
	        where: conditions
	    }).then(function(datas){
	        if(datas){
	            Response.getListResult(datas, res);
	        }else{
	            Response.getNotExistsResult(datas, res);
	        }
	     }).catch(function(error){
	         Response.getBadRequestResult(error, res);
	    });
	}
};