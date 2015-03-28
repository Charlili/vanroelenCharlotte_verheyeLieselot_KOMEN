var UserCollection = require('../collections/UserCollection.js');
var UserView = require('./UserView.js');
var User = require('../models/User.js');
var Week = require('../models/Week.js');
var template = require('../../../_hbs/waiting.hbs');

var WaitingView = Backbone.View.extend({


	template: template,

	/*model: this.week,*/
	
	events: {
		'click .link': 'clickLink',
	},

	initialize: function(){

		//check if user is logged in
		var loggedIn = $.get('api/me')
		.success(function(data){
			if(data.length === 0){
				console.log('No user logged in. Redirect to #home');
				Window.Application.navigate('home',{trigger:true});
			}else{
				//add user as this.user
				/*this.user = new User({
					id: data.id,
					email: data.email,
					street: data.street,
					town: data.town,
					week_id: data.week_id,
					role: data.role
				});
				console.log(this.user);
				//add week as this.week
				*/
				this.week = new Week({
					id: data.week_id
				});
				this.week.fetch();
				console.log(this.week);
				//add collection of users adhv week
				this.listenTo(this.week, 'sync', this.render);
				this.userCollection = new UserCollection({
					week_id:data.week_id
				});
				this.listenTo(this.userCollection, 'sync', this.renderUsers);
				this.userCollection.fetch();
			}
			
		}.bind(this));
	},

	renderUsers: function(){
		//this.$users.empty();
		//this.collection.sort();
		console.log(this.userCollection);
		if(this.userCollection.length < 4){
			this.$a.prop("disabled", "disabled");
			this.$a.prop("href", '#waiting');
		}else{
			this.$a.prop("href","#week");
		}
		this.userCollection.forEach(this.renderUser, this);
		
	},

	clickLink: function(e){
		e.preventDefault();
		Window.Application.navigate('week',{trigger:true});
	},

	renderUser: function(model){
		var view = new UserView({
			model: model
		});

		this.$users.append(view.render().el);
	},

	render: function(){


		this.$el.html(this.template(this.week));
		this.$users = this.$el.find('.users');
		this.$a = this.$el.find('.link');
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

module.exports = WaitingView;