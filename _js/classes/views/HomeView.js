//var UserCollection = require('../collections/UserCollection.js');
//var UserView = require('./UserView.js');
var template = require('../../../_hbs/home.hbs');

var HomeView = Backbone.View.extend({

	template: template,
	
	events: {
		'click .login': 'login'
	},

	initialize: function(){
		
	},

	login: function(e){
		e.preventDefault();
		//login shizzle
	},

	render: function(){
		this.$el.html(this.template());
		//this.$users = this.$el.find('.tweets');

		return this;

	}

	/*addUser: function(e){
		e.preventDefault();

		if(this.$el.find('.textarea').val() === ""){
			return;
		}

		this.collection.create({
     		 text: this.$el.find('.textarea').val()
		});

		this.$el.find('.textarea').val("");
	
	}*/

});

module.exports = HomeView;