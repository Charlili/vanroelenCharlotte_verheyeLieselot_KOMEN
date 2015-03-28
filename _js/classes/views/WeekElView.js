var template = require('../../../_hbs/week_el.hbs');

var UserView = Backbone.View.extend({

	template: template,
	
	tagName: 'li',

	initialize: function(options){
		//view verwijderen:
		//this.listenTo(this.model, 'destroy', this.remove);
		//console.log(options);
		this.startDate = options.startDate;
		this.count = options.count;
		this.model = options.model;

		//this.day =  new Date(new Date(this.startDate).getDate() + this.count).getDate();
		this.day = new Date(this.startDate).getDate() + this.count;
		this.month = new Date(this.startDate).getMonth();
		//this.day.setDate(day);
	},

	render: function(){
		var obj = {
			name: this.model.attributes.name,
			street: this.model.attributes.street,
			town: this.model.attributes.town,
			day: this.day,
			month: this.month
		};
		//console.log(obj)
		this.$el.html(this.template(obj));
		return this;
	}


});

module.exports = UserView;