var H = require('./helpers');
var config = require('config');

let txArray = [];
let amount = 100;

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


    if (H.operations.equals100Percent()) {

        H.console.successMessage(`${H.string.getCurrentDatetime()} We're ready to pay to the 100% of the reward`);

        H.rpc.getBalance(function (err, resBalance) {
            if (err == null) {
                const balance = resBalance.result;
                H.console.neutralMessage(`${H.string.getCurrentDatetime()} You have amount ${config.get('symbol')}: ${balance} available`);
                if (balance > config.get('blockedAmount')) {
                    H.console.neutralMessage(`${H.string.getCurrentDatetime()} Getting rewards received...`);
                    let rewardsNumber = H.operations.getNumberOfRewardsReceived(balance);
                    H.console.neutralMessage(`${H.string.getCurrentDatetime()} you have ${rewardsNumber} numbers of rewards to pay...`);

                    //Get amounts
                    let listOfAddress = config.get('addresses');

                    H.console.neutralMessage(`${H.string.getCurrentDatetime()} Paying now...`);
                    for(var i = 0; i < listOfAddress.length; i++){
                        H.console.neutralMessage(`${H.string.getCurrentDatetime()} Paying to ${listOfAddress[i].name} to the address: ${listOfAddress[i].address} ...`);

                        let amountToSend = H.operations.getAmountToBeSent(listOfAddress[i].percentage)
                        H.console.successMessage(`To be sent is: ${amountToSend}`);
                        //H.rpc.sendAmount()
                    }







                }
                else {
                    H.console.errorMessage(`${H.string.getCurrentDatetime()} There is not a masternode here, finishing it`);
                }
            }
        });


        // let balance = amount;
        //
        // H.console.neutralMessage(`this is the balance ${balance}`);
        // if(balance > config.get('blockedAmount')){
        //
        //     H.console.neutralMessage(`${H.string.getCurrentDatetime()} Getting rewards received...`);
        //     let rewardsNumber = H.operations.getNumberOfRewardsReceived(balance);
        //
        //     await H.timeout.sleep(1000);
        //     H.console.neutralMessage(`${H.string.getCurrentDatetime()} you have ${rewardsNumber} numbers of rewards to pay...`);
        //
        //
        // }
        // else {
        //     H.console.errorMessage(`There is not a masternode here, finishing it`);
        // }

    }
    else {

        H.console.warningMessage(`${H.string.getCurrentDatetime()} DOES NOT Equals 100%, you need to add complete 100% in the addresses ${empty}`);
    }
}

async function receiveResultCallback(err, res) {
    if (err == null) {

        H.console.successMessage(`res ${res.result}`);
    }
    else {
        H.console.errorMessage(`err ${JSON.stringify(err)}`);
        return -1;
    }
}

init();





