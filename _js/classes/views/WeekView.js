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
		'change .cms': 'changeCMS'
	},

	initialize: function(){

		//check if user is logged in
		var loggedIn = $.get('api/me')
		.success(function(data){
			console.log(data);
			if(data.length === 0 || data.week_id === 0){
				console.log('No user logged in. Redirect to #home');
				Window.Application.navigate('home',{trigger:true});
			}else{

				this.role = data.role;
				this.user_id = data.id;
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

	changeCMS: function(){
		console.log('changing the day to '+this.$el.find('.cms').val());
		this.week.set('currentDate',this.$el.find('.cms').val());
		this.week.save();
		this.initialize();

	},

	renderCMS: function(){
		var select = document.createElement('select');
		$(select).addClass('cms');
		for (var i = 0; i <= 5; i++) {
			var option = document.createElement('option');
			$(option).attr('value',i);
			if(i == this.week.get('currentDate')){
				$(option).attr('selected','true');
			}
			$(option).text("Dag "+i);
			if(i == 0){$(option).text("Dag "+i+": Week is nog niet begonnen.");}
			if(i == 5){$(option).text("Dag "+i+": Einde week.");}
			$(select).append(option);
		}
		console.log(select);
		this.$el.prepend(select);

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
			this.$el.find('.winner').addClass('lastDay');
			this.$a.prop("href","#winners");
		}
		this.count = 1;
		this.userCollection.forEach(this.renderUser, this);
		
	},

	renderUser: function(model){
		var active = false;
		var thisDay = false;
		if(this.count <= this.week.get('currentDate')){
			active = true;
		}
		if(this.count == this.week.get('currentDate')){
			thisDay = true;
		}
		var view = new WeekElView({
			model: model,
			startDate: this.week.get('startDate'),
			count: this.count,
			active: active,
			thisDay: thisDay	
		});
		this.count++;
		this.$users.append(view.render().el);
	},

	render: function(){

		this.$el.html(this.template(this.week));
		if(this.role == "admin"){
			this.renderCMS();
		}
		this.$users = this.$el.find('.days');
		this.$a = this.$el.find('.link');
		return this;

	}
});

module.exports = WeekView;