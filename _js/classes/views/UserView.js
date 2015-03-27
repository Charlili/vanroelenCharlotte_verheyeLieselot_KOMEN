var template = require('../../../_hbs/user.hbs');

var UserView = Backbone.View.extend({

	template: template,
	
	tagName: 'li',

	initialize: function(){
			//view verwijderen:
			this.listenTo(this.model, 'destroy', this.remove);
	},

	render: function(){
		this.$el.html(this.template(this.model.attributes));
		return this;
	}


});

module.exports = UserView;