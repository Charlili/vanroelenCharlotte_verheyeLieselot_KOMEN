//var UserCollection = require('../collections/UserCollection.js');
//var UserView = require('./UserView.js');
var Day = require('../models/Day.js');
var User = require('../models/User.js');
var Vote = require('../models/Vote.js');
var VoteView = require('../views/VoteView.js');
var template = require('../../../_hbs/day.hbs');

var DayView = Backbone.View.extend({

	template: template,

	tagName: 'div',

	className: 'day-container',
	
	events: {
		
	},

	initialize: function(options){

		if(options && options.id){
			this.day = new Day({
				id: options.id
			});
		}
		var loggedIn = $.get('api/me')
		.success(function(data){
			//console.log(data);
			if(data.length === 0){
				console.log('No user logged in. Redirect to #home');
				Window.Application.navigate('home',{trigger:true});
			}else{
				this.me = data.id;
				this.day.fetch({
					success: function(model,response){
						//console.log(response);
						if(response.length === 0){
							console.log('Day doesnt exist!');
							Window.Application.navigate('week',{trigger:true});	
						}else{
							console.log(this.day.get('user_id'));
							

							//alleen voten op dagen die niet van jou zijn
							

							var user = new User({
								id: this.day.get('user_id')
							});
							user.fetch();
							this.listenToOnce(user,'sync',function(){
								this.name = user.get('name');
								this.render();
							}.bind(this));
						}
					}.bind(this)
				});
			}
		}.bind(this));							
	},

	createVoteView: function(){
		var vote = new Vote({
			day_id: this.day.get('id'),
			user_id: this.day.get('user_id')
		});
		//make Voteview
		this.voteView = new VoteView({
			model: vote,
			day_id: this.day.get('id'),
			user_id: this.day.get('user_id'),
			week_id: this.day.get('week_id'),
			me: this.me.id
		});
		this.listenTo(this.voteView.model,'sync',this.renderVote);
	},

	renderVote: function(){
		this.$votes.append(this.voteView.render().el);
	},

	render: function(){


		this.day.set('name',this.name);
		console.log(this.day);
		this.$el.html(this.template(this.day.attributes));
		this.$votes = this.$el.find('.votes');

		if(this.day.get('user_id') != this.me){
			this.createVoteView();
		}else{
			console.log('Cant vote for yourself dearie.')
		}

		return this;

	}

});

module.exports = DayView;