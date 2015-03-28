//var UserCollection = require('../collections/UserCollection.js');
//var UserView = require('./UserView.js');
var Day = require('../models/Day.js');
var template = require('../../../_hbs/day.hbs');

var DayView = Backbone.View.extend({

	template: template,

	tagName: 'div',

	className: 'home-container',
	
	events: {
		'click .login-submit': 'login'
	},

	initialize: function(options){

		if(options && options.id){
			this.day = new Day({
				id: options.id
			});
		}
		this.day.fetch({
			success: function(model,response){
				//console.log(response);
				if(response.length === 0){
					console.log('Day doesnt exist!');	
				}else{
					console.log('Day exists!');
					//get user info

					//make Voteview
				}
			}.bind(this)
		});						
	},

	render: function(){
		this.$el.html(this.template(this.day.attributes));
		//this.$users = this.$el.find('.tweets');

		return this;

	}

});

module.exports = DayView;