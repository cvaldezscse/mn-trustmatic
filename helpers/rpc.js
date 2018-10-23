var rpc_query = require('node-bitcoin-rpc');
var consoleUI = require('./console');
var config = require('config');


rpc_query.BITCOIND_TIMEOUT = 50000;//config.get('rpcWallet.rpctimeout');


function initWalletConnection(){
    try {
        const credentials = config.get('rpcWallet');
        rpc_query.init(credentials.rpchost, credentials.rpcport, credentials.rpcuser, credentials.rpcpassword);
    }
    catch (e) {
        consoleUI.errorMessage(`There was an error connecting to the RPC Helper: ${e.message}`);
    }
}



module.exports={

    sendAmount: function(credentials, address, name, amount){
        initWalletConnection();
        try {
            rpc_query.call("sendtoaddress", [address, amount], function (err, res, callback) {
                callback(err, res);
            });
        }
        catch (e) {
            consoleUI.errorMessage(`There was an error sending The Amount: ${e.message}`);
        }
    },

    setWalletPassPhrase : function(passphrase, timeout=60){
        initWalletConnection();
        try {
            rpc_query.call("walletpassphrase", [passphrase, timeout], function (err, res, callback) {
                callback(err, res);
            });
        }
        catch (e) {
            consoleUI.errorMessage(`There was an error setting the wallet passprase : ${e.message}`);
        }
    },

    walletLock : function(){
        initWalletConnection();
        try {
            rpc_query.call("walletlock", [], function (err, res, callback) {
                callback(err, res);
            });
        }
        catch (e) {
            consoleUI.errorMessage(`There was an error locking the wallet: ${e.message}`);
        }
    },

    testConnectionToRPC: function(callback){
        initWalletConnection();
        rpc_query.call("getinfo", [], function (err, res) {
            callback(err, res);
        });
    }


};