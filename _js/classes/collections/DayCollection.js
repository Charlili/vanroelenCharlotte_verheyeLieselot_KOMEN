var Day = require('../models/Day.js');

var DayCollection = Backbone.Collection.extend({

	model: Day,
	url: '/MAIV/deelexamen/api/days',

	initialize: function(){
		
	},

	//sorteren van days, .sort oproepen voor je je days rendert
	comparator: function(day) {
		return - day.get("id");
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