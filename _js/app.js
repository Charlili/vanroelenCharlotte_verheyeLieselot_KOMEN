var Handlebars = require("hbsfy/runtime");
var Application = require("./classes/routers/Application.js");


Handlebars.registerHelper("formatDate", function(date) {

	return moment(date).format("MMMM, YYYY");
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