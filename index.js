var H = require('./helpers');
var config = require('config');

let txArray = [];
let amount = 100;

async function init() {

    H.console.separatorMessage();
    H.console.nMsg(`Welcome to ${config.get('title').toString().toUpperCase()}`);
    H.console.nMsg(`Right now we are preparing to ${config.get('coin')} (${config.get('symbol')})`);
    H.console.separatorMessage();

    H.console.nMsg(`${H.string.getCurrentDatetime()} Starting the Log...`);
    await H.timeout.sleep(1000);
    H.console.nMsg(`${H.string.getCurrentDatetime()} Analyzing your settings...`);
    await H.timeout.sleep(1000);
    H.console.nMsg(`${H.string.getCurrentDatetime()} Testing RPC Credentials...`);


    if (H.operations.equals100Percent()) {

        H.console.sMsg(`${H.string.getCurrentDatetime()} We're ready to pay to the 100% of the reward`);

        H.rpc.getBalance(function (err, resBalance) {
            if (err == null) {
                const balance = resBalance.result;
                H.console.nMsg(`${H.string.getCurrentDatetime()} You have amount ${config.get('symbol')}: ${balance} available`);
                if (balance > config.get('blockedAmount')) {
                    H.console.nMsg(`${H.string.getCurrentDatetime()} Getting rewards received...`);
                    let rewardsNumber = H.operations.getNumberOfRewardsReceived(balance);
                    H.console.nMsg(`${H.string.getCurrentDatetime()} you have ${rewardsNumber} numbers of rewards to pay...`);

                    let listOfAddress = config.get('addresses');
                    H.console.nMsg(`${H.string.getCurrentDatetime()} Paying now...`);
                    for(var i = 0; i < listOfAddress.length; i++){
                        let amountToSend = H.operations.getAmountToBeSent(listOfAddress[i].percentage)
                            ,nameToSend = listOfAddress[i].name
                            ,addressToSend = listOfAddress[i].address
                            ,datetime = H.string.getCurrentDatetime();

                        H.console.nMsg(`${datetime} Trying to pay to${nameToSend} to the address: ${addressToSend} the amount of ${amountToSend} ${config.get('symbol')}`);

                        H.rpc.sendAmount(addressToSend, amountToSend, function(err, res){
                            if(err != null){
                                H.console.wMsg(`this is the res: ${JSON.stringify(res)}`);
                                //H.console.sMsg(`${datetime} Paid to${nameToSend} the amount of ${amountToSend} ${config.get('symbol')}`);

                            }
                            else{
                                H.console.eMsg(`${datetime} There was an error trying to pay to${nameToSend} with the next error: ${err.message}`);
                            }

                        });


                    }







                }
                else {
                    H.console.eMsg(`${H.string.getCurrentDatetime()} There is not a masternode here, finishing it`);
                }
            }
        });


        // let balance = amount;
        //
        // H.console.nMsg(`this is the balance ${balance}`);
        // if(balance > config.get('blockedAmount')){
        //
        //     H.console.nMsg(`${H.string.getCurrentDatetime()} Getting rewards received...`);
        //     let rewardsNumber = H.operations.getNumberOfRewardsReceived(balance);
        //
        //     await H.timeout.sleep(1000);
        //     H.console.nMsg(`${H.string.getCurrentDatetime()} you have ${rewardsNumber} numbers of rewards to pay...`);
        //
        //
        // }
        // else {
        //     H.console.eMsg(`There is not a masternode here, finishing it`);
        // }

    }
    else {

        H.console.wMsg(`${H.string.getCurrentDatetime()} DOES NOT Equals 100%, you need to add complete 100% in the addresses ${empty}`);
    }
}

async function receiveResultCallback(err, res) {
    if (err == null) {

        H.console.sMsg(`res ${res.result}`);
    }
    else {
        H.console.eMsg(`err ${JSON.stringify(err)}`);
        return -1;
    }
}

init();





