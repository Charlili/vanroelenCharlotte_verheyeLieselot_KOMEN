var User = Backbone.Model.extend({
    //wat doet dit??
    urlRoot: '/MAIV/deelexamen/api/images/',

    /*initialize: function(options){
        if(options){
            this.day_id = options.day_id;
            this.name = options.name;
            this.extension = options.extension;
        }
    },*/

    sync: function(method, model, options) {
        if(model.methodUrl && model.methodUrl(method.toLowerCase())) {
            options = options || {};
            options.urlRoot = model.methodUrl(method.toLowerCase());
        }
    Backbone.Collection.prototype.sync.apply(this, arguments);
    }

});

module.exports = User;