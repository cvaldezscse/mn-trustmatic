var config = require('config');
var consoleHelper = require('./console');
var stringHelper = require('./string');
var promiseHelper = require('./promise');
var fs = require('fs');


function isFileConfigured(){
    return (config.get('storeType') == 'file') ? true : false;
}

module.exports ={
  appendToFile: function(dataArray) {
      if (isFileConfigured()){

          //First alternative
          //var fileStream = fs.createWriteStream(pathWithFilename, {'flags': 'a'});

          //for(var i = 0; i < dataArray.length; i++){
          //    fileStream.write(dataArray[i]);
          //}
          //fileStream.end();


          var mainPath = config.get('filePathAndName');
          //Second Alternative
          for(var i = 0; i < dataArray.length; i++) {
              fs.appendFile(mainPath, dataArray[i] + '\n', function (err) {
                  if (err) {
                      consoleHelper.errorMessage(`There was an error saving into the document: ${mainPath}`);
                      throw err;
                  }
              });
          }
          consoleHelper.successMessage(`${stringHelper.getDateFromTimestamp()} Successfully added to the document in ${mainPath}`)
      }
      else {
          consoleHelper.warningMessage(`Your configuration file is not prepared to be saved in a file`);
      }

  }
};