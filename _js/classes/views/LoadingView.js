var UserCollection = require('../collections/UserCollection.js');
var UserView = require('./UserView.js');
var template = require('../../../_hbs/loading.hbs');

var LoadingView = Backbone.View.extend({


	template: template,
	
	events: {
		//'click .tweet': 'addUser',
	},

	initialize: function(){
		this.collection = new UserCollection();
		this.listenTo(this.collection, 'sync', this.renderUsers);
		this.collection.fetch();
	},

	renderUsers: function(){
		this.$users.empty();
		this.collection.sort();
		this.collection.forEach(this.renderUser, this);
	},

	renderUser: function(model){
		var view = new UserView({
			model: model
		});

		this.$users.append(view.render().el);
	},

	render: function(){
		this.$el.html(this.template());
		this.$users = this.$el.find('.tweets');

		return this;

	},

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

module.exports = LoadingView;