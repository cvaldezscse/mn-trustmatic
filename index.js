var H = require('./helpers');
var config = require('config');



async function init() {

    H.consoleHelper.separatorMessage();
    H.consoleHelper.neutralMessage(`${H.stringHelper.getDateFromTimestamp()}`);
    H.consoleHelper.neutralMessage(`Welcome to ${config.get('title').toString().toUpperCase()}`);
    H.consoleHelper.neutralMessage(`Right now we are preparing to ${config.get('coin')} (${config.get('symbol')})`);
    H.consoleHelper.separatorMessage();


    H.consoleHelper.neutralMessage(`${H.stringHelper.getCurrentDatetime()} Starting the Log...`);
    await H.timeoutHelper.sleep(1000);
    H.consoleHelper.neutralMessage(`${H.stringHelper.getCurrentDatetime()} Analyzing your settings...`);
    await H.timeoutHelper.sleep(1000);
    H.consoleHelper.neutralMessage(`${H.stringHelper.getCurrentDatetime()} Testing RPC Credentials...`);

    const testRPC = H.rpcHelper.testConnectionToRPC(receiveResultCallback);

    //H.consoleHelper.neutralMessage(`2Starting ${H.stringHelper.getCurrentDatetime()} with the next element`);

}

function receiveResultCallback(err, res){

    H.consoleHelper.neutralMessage(` err ${JSON.stringify(err)}`);
    H.consoleHelper.neutralMessage(`res ${JSON.stringify(res)}`);
}

init();





