var fs = require("fs");
var jsonminify = require("jsonminify");
var settings = require("./settings");
const consoleUI = require('./console');


exports.reloadLocale = function (locale) {
    var localeFilename = locale;
    localeFilename = "./" + localeFilename;

    var localeStr;
    try{
        localeStr = fs.readFileSync(localeFilename).toString();
    } catch(e){
        consoleUI.wMsg('Locale file not found. Continuing using defaults!');
    }


    var lsettings;
    try {
        if(localeStr) {
            localeStr = jsonminify(localeStr).replace(",]","]").replace(",}","}");
            lsettings = JSON.parse(localeStr);
        }
    }catch(e){
        consoleUI.eMsg('There was an error processing your locale file: '+e.message);
        process.exit(1);
    }


    for(var i in lsettings)
    {
        if(i.charAt(0).search("[a-z]") !== 0) {
            consoleUI.wMsg("Settings should start with a low character: '" + i + "'");
        }

        if(exports[i] !== undefined) {
            exports[i] = lsettings[i];
        } else {
            consoleUI.wMsg("Unknown Setting: '" + i + "'. This setting doesn't exist or it was removed");
        }
    }

};

exports.reloadLocale(settings.locale);