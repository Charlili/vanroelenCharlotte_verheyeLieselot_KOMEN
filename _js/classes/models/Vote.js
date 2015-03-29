var Vote = Backbone.Model.extend({
	
	urlRoot: '/MAIV/deelexamen/api/votes/',

	initialize: function(options){
		if(options){
			this.day_id = options.day_id;
			this.user_id = options.user_id;
		}
	},

	methodUrl: function(method){
		//if method === read; = checken als het een GET is! 
		if(method === "read" && this.day_id && this.user_id){
			this.urlRoot = "/MAIV/deelexamen/api/votes/" + this.day_id + "/" + this.user_id;
			return;
		}
		this.urlRoot = '/MAIV/deelexamen/api/votes/';

	},

	sync: function(method, model, options) {
		if(model.methodUrl && model.methodUrl(method.toLowerCase())) {
			options = options || {};
			options.urlRoot = model.methodUrl(method.toLowerCase());
		}
    Backbone.Collection.prototype.sync.apply(this, arguments);
	}

});

module.exports = Vote;