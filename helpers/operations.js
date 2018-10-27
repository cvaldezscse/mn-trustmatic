var config = require('config');

const globalAddresses = config.get('addresses');
const baseReward = config.get('masternodeRewardAmount');
const blockedAmount = config.get('blockedAmount');
const ownerFee = config.get('mnOwnerFee');

module.exports={

  equals100Percent: function(){
      var sum = 0;

      for (var i = 0; i < globalAddresses.length; i++){
          sum += globalAddresses[i].percentage;
      }
      return ( sum == 100 ) ? true : false;
  },

  getNumberOfRewardsReceived: function(currentAmount){
      return Math.floor((currentAmount - blockedAmount) / baseReward);
  },

  getAmountToBeSent: function(percentage){
      return ((percentage/100) * (baseReward)).toFixed(2);
  },

  getOwnerFee: function(amountToSend){
    if(ownerFee > 0){
        return (ownerFee / 100) * baseReward;
    }
    else return 0;
  }

};