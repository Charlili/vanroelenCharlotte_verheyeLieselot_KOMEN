var Day = Backbone.Model.extend({
	//wat doet dit??
	urlRoot: '/MAIV/deelexamen/api/days',

	initialize: function(options){
		if(options){
			this.user_id = options.user_id;
		}
	},

	methodUrl: function(method){
		//if method === read; = checken als het een GET is! 
		if(method === "read" && this.user_id){
			this.urlRoot = "/MAIV/deelexamen/api/days/" + this.user_id;
			return;
		}
		this.urlRoot = '/MAIV/deelexamen/api/days/';

	},

	sync: function(method, model, options) {
		if(model.methodUrl && model.methodUrl(method.toLowerCase())) {
			options = options || {};
			options.urlRoot = model.methodUrl(method.toLowerCase());
		}
    Backbone.Collection.prototype.sync.apply(this, arguments);
	}

	



});

module.exports = Day;