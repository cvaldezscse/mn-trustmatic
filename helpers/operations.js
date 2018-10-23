var config = require('config');

const globalAddresses = config.get('addresses');

module.exports={
  equals100Percent: function(){
      var sum = 0;

      for (var i = 0; i < globalAddresses.length; i++){
          sum += globalAddresses[i].percentage;
      }
      return ( sum == 100 ) ? true : false;
  },


    getRespectiveAmount: function(){

    }
};