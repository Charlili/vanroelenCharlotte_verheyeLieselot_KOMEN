var User = require('../models/User.js');

var UserCollection = Backbone.Collection.extend({

	model: User,
	url: '/MAIV/deelexamen/api/users',

	initialize: function(){
	},

	//sorteren van users, .sort oproepen voor je je users rendert
	comparator: function(user) {
		return - user.get("id");
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