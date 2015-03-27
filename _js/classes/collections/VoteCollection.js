var Vote = require('../models/Vote.js');

var VoteCollection = Backbone.Collection.extend({

	model: Vote,
	url: '/MAIV/deelexamen/api/votes',

	initialize: function(){
	},

	//sorteren van votes, .sort oproepen voor je je votes rendert
	comparator: function(vote) {
		return - vote.get("id");
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
		if(method === "read" && this.other){
			//other ophalen van 1 specifieke vote:
			this.url = "/MAIV/deelexamen/api/votes/others/" + this.other
			return;
		}
		this.url = '/MAIV/deelexamen/api/votes';

	}*/

});

module.exports = VoteCollection;