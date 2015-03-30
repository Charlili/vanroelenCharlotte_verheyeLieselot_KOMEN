var template = require('../../../_hbs/winner.hbs');
var Week = require('../models/Week.js');
var UserCollection = require('../collections/UserCollection.js');
var VoteCollection = require('../collections/VoteCollection.js');
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
				this.createCollection();
			}
		}.bind(this)
		);
		//checken of de punten al ingevuld zijn zodat je de juiste classes kan meegeven
	},

	createCollection: function(){
		this.userCollection = new UserCollection({
			week_id:this.week_id
		});
		this.listenTo(this.userCollection, 'sync', function(){
			this.userCollection.forEach(this.createEl, this);
		});
		this.userCollection.fetch();
	},

	createEl: function(model){

		this.dayCollection = new DayCollection({
			week_id:this.week_id
		});
		this.listenTo(this.dayCollection, 'sync', function(day){

			this.day_id = day.get('id');
			console.log(day);
			this.getVotes(this.day_id);
		}.bind(this));
		this.dayCollection.fetch();
	},

	getVotes: function(id){
		var total = 0;
		//console.log(id);
		this.voteCollection = new VoteCollection({
			day_id:id
		});
		this.listenTo(this.voteCollection, 'sync', function(vote){
			//total = this.addTotal(vote.attributes); 
			//model.set('total',total);
			console.log(vote);
			this.userCollection.sort();
		}.bind(this));
		this.voteCollection.fetch();
	},

	addTotal: function(model){
		console.log(model);
		var total = model.gebak + model.gelach + model.geur
		return total;
	},

	render: function(){
		this.$el.html(this.template());
		return this;
	}


});

module.exports = WinnersView;