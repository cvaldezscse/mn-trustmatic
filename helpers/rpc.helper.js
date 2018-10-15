
var rpc_query = require('node-bitcoin-rpc');


function initWalletConnection(credentials){
    rpc_query.init(credentials.host, credentials.port, credentials.user, credentials.pass);
}


function payMnReward(credentials, address, name, amount, callback){
    initWalletConnection(credentials);
    rpc_query.call("sendtoaddress", [address, amount], function(err, res){
        callback(err, res);
    });
}

function getSavedAddresses(){

}


module.exports={

};