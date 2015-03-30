var Day = Backbone.Model.extend({
	//wat doet dit??
	url: '/MAIV/deelexamen/api/days',

	initialize: function(options){
		if(options){
			this.id = options.id;
			this.user_id = options.user_id;
		}
	},

	methodUrl: function(method){
		//if method === read; = checken als het een GET is! 
		if(method === "read" && this.user_id){
			this.url = "/MAIV/deelexamen/api/days/user/" + this.user_id;
			return;
		}
		if(method === "read"){
			this.url = "/MAIV/deelexamen/api/days/" + this.id;
			console.log(this.url);
			return;
		}
		
		this.url = '/MAIV/deelexamen/api/days/';


	},

	sync: function(method, model, options) {
		if(model.methodUrl && model.methodUrl(method.toLowerCase())) {
			options = options || {};
			options.url = model.methodUrl(method.toLowerCase());
		}
    	Backbone.Collection.prototype.sync.apply(this, arguments);
	}

	



});

module.exports = Day;