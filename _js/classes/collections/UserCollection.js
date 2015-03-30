var User = require('../models/User.js');

var UserCollection = Backbone.Collection.extend({

	model: User,
	url: '/MAIV/deelexamen/api/users',

	initialize: function(options){
		if(options){
			this.week_id = options.week_id;
		}
	},

	//sorteren van users, .sort oproepen voor je je users rendert
	comparator: function(user) {
		if(user.get('total')){
			return - user.get("total");
		}
	},

	methodUrl: function(method){
		//if method === read; = checken als het een GET is! 
		if(method === "read" && this.week_id){
			this.url = "/MAIV/deelexamen/api/week/users/" + this.week_id;
			return;
		}
		this.url = '/MAIV/deelexamen/api/users/';

	},

	sync: function(method, model, options) {
		if(model.methodUrl && model.methodUrl(method.toLowerCase())) {
			options = options || {};
			options.url = model.methodUrl(method.toLowerCase());
		}
    Backbone.Collection.prototype.sync.apply(this, arguments);
	}/*,

	methodUrl: function(method){
		//if method === read; = checken als het een GET is! 
		this.url = '/MAIV/deelexamen/api/users';

	}*/

});

module.exports = UserCollection;