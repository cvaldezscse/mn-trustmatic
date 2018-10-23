var H = require('./helpers');
var config = require('config');



async function init() {

    H.consoleHelper.separatorMessage();
    H.consoleHelper.neutralMessage(`Welcome to ${config.get('title').toString().toUpperCase()}`);
    H.consoleHelper.neutralMessage(`Right now we are preparing to ${config.get('coin')} (${config.get('symbol')})`);
    H.consoleHelper.separatorMessage();


    H.consoleHelper.neutralMessage(`${H.stringHelper.getCurrentDatetime()} Starting the Log...`);
    await H.timeoutHelper.sleep(1000);
    H.consoleHelper.neutralMessage(`${H.stringHelper.getCurrentDatetime()} Analyzing your settings...`);
    await H.timeoutHelper.sleep(1000);
    H.consoleHelper.neutralMessage(`${H.stringHelper.getCurrentDatetime()} Testing RPC Credentials...`);

    //H.rpcHelper.testConnectionToRPC(receiveResultCallback);

    if(H.operationsHelper.equals100Percent()){

        H.consoleHelper.successMessage(`${H.stringHelper.getCurrentDatetime()} Equals 100%`);
    }
    else{

        H.consoleHelper.warningMessage(`${H.stringHelper.getCurrentDatetime()} DOES NOT Equals 100%`);
    }
}

function receiveResultCallback(err, res){
    H.consoleHelper.errorMessage(`err ${JSON.stringify(err)}`);
    H.consoleHelper.successMessage(`res ${JSON.stringify(res)}`);
}

init();





