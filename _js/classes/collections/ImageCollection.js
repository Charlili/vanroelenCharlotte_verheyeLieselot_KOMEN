var Image = require('../models/Image.js');

var ImageCollection = Backbone.Collection.extend({

	model: Image,
	url: '/MAIV/deelexamen/api/images',

	initialize: function(options){
        if(options){
            this.day_id = options.day_id;
        }
    },

	methodUrl: function(method){
		//if method === read; = checken als het een GET is! 
		if(method === "read" && this.day_id){
			this.url = "/MAIV/deelexamen/api/images/" + this.day_id;
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
	}

});

module.exports = ImageCollection;