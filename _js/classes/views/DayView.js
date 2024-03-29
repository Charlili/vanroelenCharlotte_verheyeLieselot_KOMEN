//var UserCollection = require('../collections/UserCollection.js');
//var UserView = require('./UserView.js');
var Day = require('../models/Day.js');
var User = require('../models/User.js');
var Vote = require('../models/Vote.js');
var VoteView = require('../views/VoteView.js');
var GalleryView = require('../views/GalleryView.js');
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
			if(data.length === 0){
				console.log('No user logged in. Redirect to #home');
				Window.Application.navigate('home',{trigger:true});
			}else{
				//console.log(data);
				this.me = data;
				this.day.fetch({
					success: function(model,response){
						//console.log('in success '+response);
						if(response.length === 0){
							console.log('Day doesnt exist!');
							Window.Application.navigate('week',{trigger:true});	
						}else{
							//console.log(model.get('user_id'));
							
							var user = new User({
								id: model.get('user_id')
							});
							user.fetch();

							this.galleryView = new GalleryView({
								day_id: this.day.get('id')								
							});
							//this.listenTo(this.galleryView.collection,'sync',this.galleryView.render);
							//this.renderGallery();
							this.listenToOnce(user,'sync',function(){
								this.name = user.get('name');
								this.day.set('name',user.get('name'));
								this.day.set('street',user.get('street'));
								this.day.set('town',user.get('town'));
								this.day.set('extension',user.get('extension'));
								this.day.set('user_id',user.get('id'));
								//console.log(this.day.get('user_id'));
								if(this.day.get('user_id') != this.me.id){
									this.createVoteView();
								}else{
									this.listenTo(this.galleryView.collection,'sync',this.renderGallery);
									console.log('Cant vote for yourself dearie.');
								}
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
			user_id: this.me.id
		});
		//make Voteview
		this.voteView = new VoteView({
			model: vote,
			day_id: this.day.get('id'),
			user_id: this.day.get('user_id'),
			week_id: this.day.get('week_id'),
			me: this.me
		});
		this.listenTo(this.voteView.model,'sync',this.renderVote);
	},

	renderVote: function(){
		this.$el.append(this.voteView.render().el);
		this.renderGallery();
	},

	renderGallery: function(){
		console.log('renderGallery');
		this.$el.append(this.galleryView.render().el);
		
	},

	render: function(){

		this.$el.html(this.template(this.day.attributes));
		return this;

	}

});

module.exports = DayView;