var config = require('config');
var consoleHelper = require('./console');
var stringHelper = require('./string');
var promiseHelper = require('./promise');
var fs = require('fs');


function isFileConfigured(){
    return (config.get('storeType') == 'file') ? true : false;
}

module.exports ={

  appendArrayToFile: function(dataArray) {
      if (isFileConfigured()){
          let mainPath = config.get('filePathAndName');
          for(var i = 0; i < dataArray.length; i++) {
              fs.appendFile(mainPath, dataArray[i] + '\n', function (err) {
                  if (err) {
                      consoleHelper.eMsg(`There was an error saving into the document: ${mainPath}`);
                      throw err;
                  }
              });
          }
          consoleHelper.sMsg(`${stringHelper.getDateFromTimestamp()} Successfully added to the document in ${mainPath}`)
      }
      else {
          consoleHelper.wMsg(`Your configuration file is not prepared to be saved in a file`);
      }

  },

  appendSingleToFile: function(data){
      if (isFileConfigured()) {
          let mainPath = config.get('filePathAndName');
          fs.appendFile(mainPath, data + '\n', function (err) {
              if (err) {
                  consoleHelper.eMsg(`There was an error saving into the document: ${mainPath}`);
                  throw err;
              }
          });
      }
      else{
          consoleHelper.wMsg(`Your configuration file is not prepared to be saved in a file`);
      }
  }

};