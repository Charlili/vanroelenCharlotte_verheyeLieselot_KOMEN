
var HomeView = require('../views/HomeView.js');
var WeekView = require('../views/WeekView.js');
var RegisterView = require('../views/RegisterView.js');
var WaitingView = require('../views/WaitingView.js');
//var OtherView = require('../views/OtherView.js');

var Application = Backbone.Router.extend({

	routes: {
		//pagina: functie
		"home": "home",
		"register": "register",
		"waiting": "waiting",
		"week": "week",
		"*actions": "default"
	},

	empty: function(){
		//container clearen
		$('.container').empty();
	},

	home: function(){
		this.empty();
		this.home = new HomeView();
		$('.container').append(this.home.render().el);
	},

	register: function(){
		this.empty();
		this.register = new RegisterView();
		$('.container').append(this.register.render().el);
	},

	week: function(){
		this.empty();
		this.week = new WeekView();
		$('.container').append(this.week.render().el);
	},

	waiting: function(){
		this.empty();
		this.waiting = new WaitingView();
		$('.container').append(this.waiting.render().el);
	},

	default: function(){
		//trigger om overview functie uit te voeren. eerste argument gaat enkel url wijzigen.
		//tweede moet de functie oproepen
		this.navigate("home", {trigger: true});
		console.log("defaulting");
		
	}

});

module.exports = Application;