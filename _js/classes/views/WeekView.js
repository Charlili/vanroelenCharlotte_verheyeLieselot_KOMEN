var DayCollection = require('../collections/DayCollection.js');
var DayView = require('./DayView.js');
var template = require('../../../_hbs/week.hbs');

var WeekView = Backbone.View.extend({


	template: template,
	
	events: {
		//'click .tweet': 'addDay',
	},

	initialize: function(){
		this.collection = new DayCollection();
		this.listenTo(this.collection, 'sync', this.renderDays);
		this.collection.fetch();
	},

	renderDays: function(){
		this.$days.empty();
		this.collection.sort();
		this.collection.forEach(this.renderDay, this);
	},

	renderDay: function(model){
		var view = new DayView({
			model: model
		});

		this.$days.append(view.render().el);
	},

	render: function(){
		this.$el.html(this.template());
		this.$days = this.$el.find('.days');

		return this;

	},

	/*addDay: function(e){
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

module.exports = WeekView;