const StoreCtrl = require('../controllers/purpleStoreCtrl');
const UserCtrl = require('../controllers/purpleUserCtrl');


module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the PurpleTab API!',
  }));
  // console.log(purpleStoreController,);
  /* Store Routes */
  app.post('/api/store/create',StoreCtrl.create);
  app.get('/api/store/getStoreList',StoreCtrl.getStores);

  // app.get('/api/getAppMaster', appmasterController.getAppMaster);
  // app.delete('/api/deleteAppMaster/:id', appmasterController.deleteAppMaster);


  /* User Routes*/
  app.post('/api/users/create',UserCtrl.create);
  app.get('/api/users/getUserList',UserCtrl.getUserList);
  app.post('/api/users/createUserRole',UserCtrl.createUserRole);
  app.post('/api/users/createUserRolePermission',UserCtrl.createUserRolePermission);



  

};