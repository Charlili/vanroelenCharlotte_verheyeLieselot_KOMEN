var template = require('../../../_hbs/winners.hbs');
//var Week = require('../models/Week.js');
var User = require('../models/User.js');
var Day = require('../models/Day.js');
var WinnerView = require('./WinnerView.js');
var UserCollection = require('../collections/UserCollection.js');
//var VoteCollection = require('../collections/VoteCollection.js');
var DayCollection = require('../collections/DayCollection.js');


var WinnersView = Backbone.View.extend({

	template: template,
	
	tagName: 'div',
	className: 'winner-container',
	events:{
		'click .vote': 'addVote'
	},

	initialize: function(){

		var loggedIn = $.get('api/me')
		.success(function(data){
			console.log(data);
			if(data.length === 0 || data.week_id === 0){
				console.log('No user logged in. Redirect to #home');
				Window.Application.navigate('home',{trigger:true});
			}else{
				this.week_id = data.week_id;
				this.dayCollection = new DayCollection({
					week_id: this.week_id
				});
				this.dayCollection.fetch();
				this.listenTo(this.dayCollection, 'sync', this.createEl);
			}
		}.bind(this)
		);
		//checken of de punten al ingevuld zijn zodat je de juiste classes kan meegeven
	},

	createEl: function(collection){
		console.log('createEl');
		this.render();
		//console.log(collection);
		this.dayCollection.each(function(model){
			console.log(model.attributes);

			this.winnerView = new WinnerView({
				user_id: model.attributes.user_id,
				day_id: model.attributes.id	
			});

			//this.$winners.append(this.winnerView.render().el);
		
		});
	},


	render: function(){
		this.$el.html(this.template());
		this.$winners = this.$el.find('.winners');
		
		return this;
	}


});

module.exports = WinnersView;