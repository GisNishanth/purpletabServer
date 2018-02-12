var lodash= require('lodash');
var env           = process.env.NODE_ENV || 'development';
var config        = require(__dirname  + '/config/config.json')[env];
var os          = require('os');
var IPaddress   = '';
var ifaces      = os.networkInterfaces();


module.exports  =   {
    constructErrorMessage   :   function (error) {
        var errMessage  =   '';
        if(error.message){
            errMessage  =   error.message;
        }

        if(error.errors && error.errors.length > 0){
            errMessage  =   error.errors.map(function(err) {
                return err.message;
            }).join(',\n');
        }
        
        return errMessage;
    },
    getReqValues   :   function (req) {
        return lodash.extend(req.body,req.params,req.query);
    },
    getResult: function(response) {
        if(response.error)  { return  {status:"error",error:response.error}; }
        if(response.result) { return  {status:"success",message:response.result}; }
        if(response.token)  { return  {status:"success", message: "Logged in Successfully", token: response.token, data:response.data}; }
    },
    getIp :function(){
        console.log("hiiiiiiiiiiiiii")
      Object.keys(ifaces).forEach(function (ifname) {
      var alias = 0;

     ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
     // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
     return;
   }

   if (alias >= 1) {
     // this single interface has multiple ipv4 addresses
     console.log(ifname + ':' + alias, iface.address);
   } else {
     IPaddress = iface.address;
     // this interface has only one ipv4 adress
     console.log(ifname, iface.address);
   }
   ++alias;
 });
});
      console.log("ippp",IPaddress)

      return IPaddress;
    }

}