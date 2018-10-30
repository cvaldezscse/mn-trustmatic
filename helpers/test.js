var config = require('config');
var request = require('request');
var clicolor = require('cli-color');
var jsonquery = require('simple-json-filter');
var mysqlHelper = require('../bin/mysql.helper');
var dateHelper = require('../bin/console.helper');
var rpcHelper = require('../bin/rpc.helper');
var strHelper = require('../bin/string.helper');

const BASE_URL_PAC1 = config.get('paccoinv1.apiaddress');
const API_TX_BEG = 'api/getrawtransaction?txid=';
const API_TX_END = '&decrypt=1';
const API_TXID_ENDPOINT = BASE_URL_PAC1 + API_TX_BEG;
const API_ADDRESS_ENDPOINT = BASE_URL_PAC1 + 'ext/getaddress/';

const addresses = config.get('paccoinv1.walletaddresses');
var startTime = undefined;
var currentAddressPosition = 0;


function processTransactionFromAddress(voutTransactions, position, addressInfo) {
    var currentTransaction = voutTransactions[position];

    if (currentTransaction != null) {
        var requestParams = {
            url: API_TXID_ENDPOINT + currentTransaction.addresses + API_TX_END,
            json: true
        };

        request(requestParams, function (error, response, body) {
            var transactionInfo = body;

            if (transactionInfo.toString() !== 'There was an error. Check your console.') {
                if (transactionInfo.time >= startTime) {
                    insertTransactionMySQL(voutTransactions, position, addressInfo, transactionInfo);
                }
            } else {
                console.error('An error ocurred while getting transaction info with id "' + currentTransaction.addresses + '"');
                processTransactionFromAddress(voutTransactions, position + 1, addressInfo);
            }
        });
    } else {
        processAddress(currentAddressPosition + 1);
    }
}

function insertTransactionMySQL(voutTransactions, position, addressInfo, transactionInfo) {
    var currentTransaction = voutTransactions[position];

    if (currentTransaction != null) {
        rpcHelper.getTxDataPac1(transactionInfo.txid, addressInfo.address, function(error, res) {
            if (!error) {
                var walletTx = res.result;

                var sendAmount = transactionInfo.vout.filter(
                    element => {
                        return element.scriptPubKey.addresses[0] === addressInfo.address;
                    })[0].value;


                var transactionText = walletTx['tx-comment'];
                if(transactionText == null || transactionText == undefined){
                    transactionText = 'WITHOUT COMMENTS';
                    console.log(clicolor.cyan('THIS IS YOUR COMMENT: NULL '+transactionText));
                }
                else{
                    ///FOR UPDATE IF THERE IS NO COMMENT
                    var recieveAddress = transactionText ? strHelper.get$PACAddressFromTxText(transactionText) : '';

                    var sqlParams = [
                        transactionInfo.txid,
                        transactionText,
                        recieveAddress
                    ];
                    //console.log(JSON.stringify(sqlParams));

                    /*mysqlHelper.executeQuery(mysqlHelper.storedProcedures.redemptionUpdateTxComment, sqlParams)
                        .then(function(){
                            console.log(clicolor.magenta('UPDATED TX_ID: '+ sqlParams.p_receive_transaction_id +" COMMENT: "+sqlParams.p_receive_comment));
                        })
                        .catch(function(error){
                            if (error.sqlMessage.indexOf('Duplicate entry') !== -1) {
                                console.log(clicolor.yellow('In Address: '+addressInfo.address+' >>>'+ 'Duplicate entry txid = "' + transactionInfo.txid + '". Transaction was already registered.'));
                                processTransactionFromAddress(voutTransactions, (position + 1), addressInfo);
                            } else {
                                console.error(clicolor.red('Failed to insert transaction "' + transactionInfo.txid + '"'), error);
                                console.error(clicolor.red('Aborting...'));
                            }
                        });
                        */
                }




                if (sendAmount != null) {
                    var sqlParams = [
                        transactionInfo.txid
                        , addressInfo.address
                        , sendAmount
                        , dateHelper.getDateFromTimestamp(transactionInfo.time)
                        , transactionText
                        , recieveAddress
                    ];

                    mysqlHelper.executeQuery(mysqlHelper.storedProcedures.redemptionPaymentsCreate, sqlParams)
                        .then(function () {
                            console.log(clicolor.green('Element saved ' + transactionInfo.txid));
                            processTransactionFromAddress(voutTransactions, (position + 1), addressInfo);
                        })
                        .catch(function (error) {
                            if (error.sqlMessage.indexOf('Duplicate entry') !== -1) {
                                console.log(clicolor.yellow('ADD: '+addressInfo.address+' >'+ 'Duplicate entry txid = "' + transactionInfo.txid + '". Transaction was already registered.'));
                                processTransactionFromAddress(voutTransactions, (position + 1), addressInfo);
                            } else {
                                console.error(clicolor.red('Failed to insert transaction "' + transactionInfo.txid + '"'), error);
                                console.error(clicolor.red('Aborting...'));
                            }
                        });
                }
            } else {
                console.error(clicolor.red('An error ocurred while getting wallet data of transaction "' + transactionInfo.txid + '"'));
                console.error(clicolor.red('Aborting...'));
            }
        });
    }
}

function init() {
    mysqlHelper.executeQuery(mysqlHelper.storedProcedures.redemptionPaymentsGetLastTxid, null)
        .then(function(result) {
            if (result.length > 0) {
                var txid = result[0].txid;

                var requestParams = {
                    url: API_TXID_ENDPOINT + txid + API_TX_END,
                    json: true
                };

                request(requestParams, function(error, response, body) {
                    var transaction = body;
                    startTime = config.get('paccoinv1.starttimestamp');
                    processAddress(0);
                });
            } else {
                startTime = config.get('paccoinv1.starttimestamp');
                processAddress(0);
            }
        })
        .catch(function(error) {
            startTime = config.get('paccoinv1.starttimestamp');
            processAddress(0);
        });
}


function processAddress(position) {
    currentAddressPosition = position;
    var addressId = addresses[position];

    if (addressId != null) {
        var requestParams = {
            url: API_ADDRESS_ENDPOINT + addressId,
            json: true
        };

        request(requestParams, function (error, response, body) {
            var addressInfo = body;

            if (!addressInfo.hasOwnProperty('error')) {
                var filter = { 'type': 'vout' };
                var sjf = new jsonquery();

                var voutTransactions = sjf
                    .filter(filter)
                    .data(addressInfo.last_txs)
                    .wantArray()
                    .exec();

                processTransactionFromAddress(voutTransactions, 0, addressInfo, position);
            } else {
                console.error('An error ocurred while getting address ' + addressId);
                processAddress(currentAddressPosition + 1);
            }
        });
    }
}


init();