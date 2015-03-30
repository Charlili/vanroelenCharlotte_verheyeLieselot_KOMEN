var Day = require('../models/Day.js');

var DayCollection = Backbone.Collection.extend({

	model: Day,
	url: '/MAIV/deelexamen/api/days',

	initialize: function(options){
		if(options){
			this.week_id = options.week_id;
		}
	},

	methodUrl: function(method){
		//if method === read; = checken als het een GET is! 
		if(method === "read" && this.week_id){
			this.url = "/MAIV/deelexamen/api/days/week/" + this.week_id;
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
	}/*,

	methodUrl: function(method){
		//if method === read; = checken als het een GET is! 
		if(method === "read" && this.vote){
			//vote ophalen van 1 specifieke day:
			this.url = "/MAIV/deelexamen/api/days/votes/" + this.vote
			return;
		}
		this.url = '/MAIV/deelexamen/api/days';

	}*/

});

module.exports = DayCollection;