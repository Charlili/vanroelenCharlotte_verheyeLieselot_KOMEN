var UserCollection = require('../collections/UserCollection.js');
var WeekElView = require('./WeekElView.js');
var User = require('../models/User.js');
var Week = require('../models/Week.js');
var template = require('../../../_hbs/week.hbs');

var WeekView = Backbone.View.extend({


	template: template,

	/*model: this.week,*/
	tagName: 'div',
	className: 'week-container',

	
	events: {
		'click .link': 'clickLink',
	},

	initialize: function(){

		//check if user is logged in
		var loggedIn = $.get('api/me')
		.success(function(data){
			console.log(data);
			if(data.length === 0){
				console.log('No user logged in. Redirect to #home');
				Window.Application.navigate('home',{trigger:true});
			}else{
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
		if(this.userCollection.length <4){
			Window.Application.navigate('waiting',{trigger:true});
		}
		if(this.week.get('currentDay') < 5){
			this.$a.prop("disabled", "disabled");
			//this.$a.prop("href", '#waiting');
		}else{
			this.$a.prop("href","#winner");
		}
		this.count = 1;
		this.userCollection.forEach(this.renderUser, this);
		
	},

	clickLink: function(e){
		e.preventDefault();
		Window.Application.navigate('week',{trigger:true});
	},

	renderUser: function(model){
		var view = new WeekElView({
			model: model,
			startDate: this.week.get('startDate'),
			count: this.count
		});
		this.count++;
		this.$users.append(view.render().el);
	},

	render: function(){

		this.$el.html(this.template(this.week));
		this.$users = this.$el.find('.days');
		this.$a = this.$el.find('.link');
		return this;

	}
});

module.exports = WeekView;