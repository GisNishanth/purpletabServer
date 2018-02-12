
module.exports  =   {
    
    getExistsResult: function(resp, cb) {
      if(resp.exists)  { 
        cb.status(200).send({success:false,error: resp.name +' Already Exists'});
      }
    },
    getSuccessResult: function(resp, cb) {
      cb.status(200).send({success:true,result: 'Inserted Successfully',data:resp});
    },
    getUpdateResult: function(resp, cb) {
      cb.status(200).send({success:true,result: 'Updated Successfully'});
    },
    getDeleteResult: function(resp, cb) {
      cb.status(200).send({success:true,result: 'Deleted Successfully'});
    },
    getListResult: function(resp, cb) {
      cb.status(200).send({success:true,result: resp});
    },
    getErrorResult : function(resp, cb) {
      cb.status(400).send({success:false,error:'Unable to Insert Data.'});
    },
    getUpdateErrorResult : function(resp, cb) {
      cb.status(400).send({success:false,error:'Unable to Update Data.'});
    },
    getDeleteErrorResult : function(resp, cb) {
      cb.status(400).send({success:false,error:'Unable to Delete Data.'});
    },
    getBadRequestResult : function(resp, cb) {
      cb.status(400).send({success:false,error:'Bad Request Found.'});
    },
    getNotExistsResult : function(resp,cb) {
      cb.status(204).send({success:false,error:'Data Not Exists.'});
    },


}