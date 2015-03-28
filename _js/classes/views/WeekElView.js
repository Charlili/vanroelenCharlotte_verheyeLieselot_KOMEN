var template = require('../../../_hbs/week_el.hbs');
var Day = require('../models/Day.js');

var UserView = Backbone.View.extend({

	template: template,
	
	tagName: 'li',

	events:{
		'click .link': 'clickLink'
	},

	initialize: function(options){
		//view verwijderen:
		//this.listenTo(this.model, 'destroy', this.remove);
		//console.log(options);
		this.startDate = options.startDate;
		this.count = options.count;
		this.active = options.active;
		this.model = options.model;
		//get day
		this.day = new Day({user_id:this.model.get('id')});
		this.day.fetch();
		this.listenTo(this.day, 'sync', this.changeLink);
		//this.day =  new Date(new Date(this.startDate).getDate() + this.count).getDate();
		this.d = new Date(this.startDate).getDate() + this.count;
		this.mon = new Date(this.startDate).getMonth();
		//this.day.setDate(day);
	},

	clickLink: function(){
		e.preventDefault();
		console.log('clicked link');
		//make DayView
		//get day_id
	},

	changeLink: function(){
		var string = "#day/" + this.day.get('id');
		this.$el.find('.active').prop("href", string);
	},

	render: function(){
		var obj = {
			name: this.model.attributes.name,
			street: this.model.attributes.street,
			town: this.model.attributes.town,
			day: this.d,
			month: this.m
		};
		//console.log(obj)
		this.$el.html(this.template(obj));
		//console.log(this.el);
		if(this.active){
			this.$el.find('a').addClass('active');
			this.$el.find('a').prop("disabled", 'false');
		}
		console.log(this.active);
		return this;
	}


});

module.exports = UserView;