var User = Backbone.Model.extend({
	//wat doet dit??
	urlRoot: '/MAIV/deelexamen/api/users/',

	initialize: function(options){
		if(options){
			this.email = options.email;
		}
	},

	methodUrl: function(method){
		//if method === read; = checken als het een GET is! 
		if(method === "read" && this.email){
			this.urlRoot = "/MAIV/deelexamen/api/users/" + this.email;
			return;
		}
		this.urlRoot = '/MAIV/deelexamen/api/users/';

	},

	sync: function(method, model, options) {
		if(model.methodUrl && model.methodUrl(method.toLowerCase())) {
			options = options || {};
			options.urlRoot = model.methodUrl(method.toLowerCase());
		}
    Backbone.Collection.prototype.sync.apply(this, arguments);
	}

});

module.exports = User;