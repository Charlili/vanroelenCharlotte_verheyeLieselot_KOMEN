var template = require('../../../_hbs/winner.hbs');
var Week = require('../models/Week.js');
var User = require('../models/User.js');
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
				this.userCollection = new UserCollection();
				this.week_id = data.week_id;
				this.createDayCollection();
			}
		}.bind(this)
		);
		//checken of de punten al ingevuld zijn zodat je de juiste classes kan meegeven
	},

	createDayCollection: function(){
		this.dayCollection = new DayCollection({
			week_id:this.week_id
		});
		this.listenTo(this.dayCollection, 'sync', function(){
			this.dayCollection.forEach(this.getVotes, this);
		});
		this.dayCollection.fetch();
	},


	getVotes: function(model){
		var total = 0;
		this.day = model;
		//console.log(id);
		this.voteCollection = new VoteCollection({
			day_id:model.get('id')
		});
		var total = 0;
		this.listenTo(this.voteCollection, 'sync', this.getTotal);
		this.voteCollection.fetch();
		//console.log(total);
		
		console.log(this.voteCollection);
	},

	getTotal: function(collection){
		//console.log(collection.models[0].attributes);
		var total = this.addTotal(collection.models[0].attributes);
		console.log(total);
		collection.models[0].set('total',total);
		this.day.set('total',total);

		var user = new User({
			id: this.day.get('user_id'),
			total: total
		});
		this.listenTo(user, 'sync', this.sortUsers);
		user.fetch();

	},

	sortUsers: function(model){
		console.log(model);
		this.userCollection.add(model);
		this.listenTo(this.userCollection, 'add', this.sortUsers);

		if(this.userCollection.length >= 4){
			this.userCollection.sort();
		}

		console.log(this.userCollection);

	},


	addTotal: function(model){
		//console.log(model);
		var total = model.gebak + model.gelach + model.geur;
		
		return total;
	},

	render: function(){
		this.$el.html(this.template());
		return this;
	}


});

module.exports = WinnersView;