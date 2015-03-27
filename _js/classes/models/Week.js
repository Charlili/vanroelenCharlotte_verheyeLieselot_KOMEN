var Week = Backbone.Model.extend({
	//wat doet dit??
	urlRoot: '/MAIV/deelexamen/api/weeks',

	initialize: function(options){
		if(options){
			this.register = options.register;
		}
	},

	methodUrl: function(method){
		//if method === read; = checken als het een GET is! 
		if(method === "read" && this.email){
			this.urlRoot = "/MAIV/deelexamen/api/weeks/last/";
			return;
		}
		this.urlRoot = '/MAIV/deelexamen/api/weeks/';

	},

	sync: function(method, model, options) {
		if(model.methodUrl && model.methodUrl(method.toLowerCase())) {
			options = options || {};
			options.urlRoot = model.methodUrl(method.toLowerCase());
		}
    Backbone.Collection.prototype.sync.apply(this, arguments);
	}

	



});

module.exports = Week;