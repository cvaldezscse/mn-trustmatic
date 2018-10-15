const settings = require("../settings");
const consoleUI = require("console.helper");
var fs = require("fs");
var jsonminify = require("jsonminify");


//Default settings
exports.title = "MN Trustmatic";
exports.coin = "Paccoin";
exports.symbol= "$PAC ";
exports.store= "file";
exports.dbsettings = {
    "user": "dbuseradmin",
    "password": "ThisIsDefaultPassword",
    "database": "mymongodb",
    "address": "localhost",
    "port": 27017
};
exports.wallet= {
    "host": "localhost",
    "port": 7112,
    "user": "paccoinrpcuser",
    "pass": "123gfjk33sa"
};
exports.locale = "locale/base.json";




exports.reloadSettings = function(){

    var settingsFileName = "settings.json";
    settingsFileName = "./" + settingsFileName;

    var settingsString ="";
    try{
        settingsString = fs.readFileSync(settingsFilename).toString();
    } catch(e){
        consoleUI.neutralMessage("No settings file found. Continuing using defaults!");
    }


    var settings;

    try {
        if(settingsStr) {
            settingsStr = jsonminify(settingsStr).replace(",]","]").replace(",}","}");
            settings = JSON.parse(settingsStr);
        }
    }catch(e){
        consoleUI.errorMessage('There was an error processing your settings.json file: '+e.message);
        process.exit(1);
    }


    for(var i in settings) {
        if(i.charAt(0).search("[a-z]") !== 0) {
            consoleUI.warningMessage("Settings should start with a low character: '" + i + "'");
        }

        if(exports[i] !== undefined) {
            exports[i] = settings[i];
        } else {
            consoleUI.warningMessage("Unknown Setting: '" + i + "'. This setting doesn't exist or it was removed");
        }
    }

};


exports.reloadSettings();