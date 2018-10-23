module.exports = {

    getCurrentDatetime : function (){
        now = new Date();
        year = "" + now.getFullYear();
        month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
        day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
        hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
        minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
        second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
        milisecond = ""+now.getMilliseconds(); if(milisecond.length == 1){milisecond="0"+milisecond;}
        return year + "/" + month + "/" + day + " - " + hour + ":" + minute + ":" + second+':'+ milisecond+' -> ';
    },


    getDateFromTimestamp : function(timestamp){
        var d = new Date(timestamp * 1000);

        var year = d.getFullYear();
        var month = ("0" + (d.getMonth() + 1)).slice(-2);
        var day = d.getDate();
        var hours = d.getHours();
        var minutes = d.getMinutes();
        var seconds = d.getSeconds();

        return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    }

};