var Week = require('../models/Week.js');

var WeekCollection = Backbone.Collection.extend({

	model: Week,
	url: '/MAIV/deelexamen/api/weeks',

	initialize: function(){
	},

	//sorteren van weeks, .sort oproepen voor je je weeks rendert
	comparator: function(week) {
		return - week.get("id");
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
			//other ophalen van 1 specifieke week:
			this.url = "/MAIV/deelexamen/api/weeks/others/" + this.other
			return;
		}
		this.url = '/MAIV/deelexamen/api/weeks';

	}*/

});

module.exports = WeekCollection;