var Handlebars = require("hbsfy/runtime");
var Application = require("./classes/routers/Application.js");


Handlebars.registerHelper("formatDate", function(date) {

	return moment(date).format("MMMM, YYYY");
});

Handlebars.registerHelper("formatWeek", function(date) {

    //return moment(date).format("MMMM, YYYY");
    var day = new Date(date).getDate();
    var m = new Date(date).getMonth();
    var month = "";

    var nextday =  day + 7;

    switch(m){
        case 1: month= 'januari'; break;
        case 2: month= 'februari'; break;
        case 3: month= 'maart'; break;
        case 4: month= 'april'; break;
        case 5: month= 'mei'; break;
        case 6: month= 'juni'; break;
        case 7: month= 'juli'; break;
        case 8: month= 'augustus'; break;
        case 9: month= 'september'; break;
        case 10: month= 'oktober'; break;
        case 11: month= 'november'; break;
        case 12: month= 'december'; break;
    }
    var string = day + " tot " + nextday + " " + month;
    return string;
});

Handlebars.registerHelper("formatText", function(tweet) {
  return tweet.replace(/(\S*)/g,'<a href=\'#formats/$1\'>$1</a>')
});

$.ajaxSetup({
    statusCode: {
        401: function(){
            // Redirec the to the login page.
            //window.location.replace('/#login');
            console.log("401 statuscode. There is no user logged in.")        
        },
        403: function() {
            // 403 -- Access denied
            //window.location.replace('/#home');
            console.log("403 statuscode. User is not admin.")
        }
    }
});

function init() {

	//nieuwe router aanmaken:
	Window.Application = new Application();
	//backbone gaat router opstarten:
	Backbone.history.start();

}

init();