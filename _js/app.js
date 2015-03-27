var Handlebars = require("hbsfy/runtime");
var Application = require("./classes/routers/Application.js");


Handlebars.registerHelper("formatDate", function(date) {

	return moment(date).format("MMMM, YYYY");
});

Handlebars.registerHelper("formatText", function(tweet) {
  return tweet.replace(/(\S*)/g,'<a href=\'#formats/$1\'>$1</a>')
});

function init() {

	//nieuwe router aanmaken:
	Window.Application = new Application();
	//backbone gaat router opstarten:
	Backbone.history.start();

}

init();