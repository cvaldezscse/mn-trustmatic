var H = require('./helpers');
var config = require('config');

var txArray =[];

async function init() {

    H.console.separatorMessage();
    H.console.neutralMessage(`Welcome to ${config.get('title').toString().toUpperCase()}`);
    H.console.neutralMessage(`Right now we are preparing to ${config.get('coin')} (${config.get('symbol')})`);
    H.console.separatorMessage();


    H.console.neutralMessage(`${H.string.getCurrentDatetime()} Starting the Log...`);
    await H.timeout.sleep(1000);
    H.console.neutralMessage(`${H.string.getCurrentDatetime()} Analyzing your settings...`);
    await H.timeout.sleep(1000);
    H.console.neutralMessage(`${H.string.getCurrentDatetime()} Testing RPC Credentials...`);

    //H.rpcHelper.testConnectionToRPC(receiveResultCallback);

    if(H.operations.equals100Percent()){

        // txArray.push(`${H.string.getDateFromTimestamp()} starts here`);
        // txArray.push(`${H.string.getDateFromTimestamp()} starts here 2`);
        // txArray.push(`${H.string.getDateFromTimestamp()} starts here 3`);
        // txArray.push(`${H.string.getDateFromTimestamp()} starts here 4`);
        // txArray.push(`${H.string.getDateFromTimestamp()} starts here 5`);
        //
        // H.file.appendToFile(txArray);
        H.console.successMessage(`${H.string.getCurrentDatetime()} Equals 100%`);
    }
    else{

        H.console.warningMessage(`${H.string.getCurrentDatetime()} DOES NOT Equals 100%`);
    }
}

function receiveResultCallback(err, res){
    H.console.errorMessage(`err ${JSON.stringify(err)}`);
    H.console.successMessage(`res ${JSON.stringify(res)}`);
}

init();





