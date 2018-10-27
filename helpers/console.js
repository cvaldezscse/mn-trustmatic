var clicolor = require('cli-color');


module.exports= {

    sMsg : function(msg) {
        console.log(clicolor.green(msg));
    },

    eMsg: function(msg) {
        console.log(clicolor.red(msg));
    },

    wMsg: function(msg){
        console.log(clicolor.yellow(msg));
    },

    nMsg: function(msg){
        console.log(clicolor.white(msg));
    },

    separatorMessage: function(){
        console.log(clicolor.white(`---------------------------------------------------------------------------------`));
    }

};