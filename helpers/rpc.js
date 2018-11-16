var rpc_query = require('node-bitcoin-rpc');
var consoleUI = require('./console');
var config = require('config');


function init(){
    try {
        rpc_query.BITCOIND_TIMEOUT = 50000;
        const cred = config.get('wallet');
        rpc_query.init(cred.rpchost, cred.rpcport, cred.rpcuser, cred.rpcpassword);
    }
    catch (e) {
        consoleUI.eMsg(`There was an error connecting to the RPC Helper: ${e.message}`);
    }
}

function getCommentPiece(){
    try{
        const baseComment1 = config.get('comment');
        const baseCommentTo = config.get('comment-to');
        const mnId = config.get('mnid');

        let comment1 = `The ${mnId} was paid ${baseComment1} to you by @cryptocashman, please get in touch to get your coins ${baseCommentTo}`;
        return comment1;
    } 
    catch (e) {
        consoleUI.eMsg(`There was an error Getting the messages: ${e.message}`);
    }
}



module.exports={

    sendAmount: function(address, amount, callback){
        init();
        try {
            rpc_query.call("sendtoaddress", [address, amount, getCommentPiece(), getCommentPiece(), true, false, false], function (err, res) {
                callback(err, res);
            });
        }
        catch (e) {
            consoleUI.eMsg(`There was an error sending The Amount: ${e.message}`);
        }
    },

    setWalletPassPhrase : function(passphrase, timeout=60, callback){
        init();
        try {
            rpc_query.call("walletpassphrase", [passphrase, timeout], function (err, res) {
                callback(err, res);
            });
        }
        catch (e) {
            consoleUI.eMsg(`There was an error setting the wallet passprase : ${e.message}`);
        }
    },

    walletLock : function(callback){
        init();
        try {
            rpc_query.call("walletlock", [], function (err, res) {
                callback(err, res);
            });
        }
        catch (e) {
            consoleUI.eMsg(`There was an error locking the wallet: ${e.message}`);
        }
    },

    IsMNRewardHere: function(){

        init();
        rpc_query.call("getwalletinfo", [], function (err, res) {
            if(res != null){
                consoleUI.wMsg(`THIS IS THE CURRENT AMOUNT ${res.amount}`);
                if(res.amount > config.get('masternodeRewardAmount')){
                    consoleUI.wMsg(`New award to be sent`);
                }
            }
        });
    },

    testConnectionToRPC: function(callback){
        init();
        rpc_query.call("getinfo", [], function (err, res) {
            callback(err, res);
        });
    },

    getBalance: function(callback) {
        init();
        rpc_query.call("getbalance", [], function (err, res) {
            callback(err, res);
        });
    }



};

