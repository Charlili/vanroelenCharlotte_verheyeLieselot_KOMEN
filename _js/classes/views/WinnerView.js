var template = require('../../../_hbs/winner.hbs');
var Week = require('../models/Week.js');
var User = require('../models/User.js');
var UserCollection = require('../collections/UserCollection.js');
var VoteCollection = require('../collections/VoteCollection.js');
var DayCollection = require('../collections/DayCollection.js');

var WinnerView = Backbone.View.extend({

	template: template,
	
	tagName: 'div',
	className: 'winner-container',
	events:{
		'click .vote': 'addVote'
	},

	initialize: function(options){
		//this.parent = options.parent;
		this.user_id = options.user_id;
		this.day_id = options.day_id;
		this.gebakTotaal = 0;
		this.geurTotaal = 0;
		this.gelachTotaal = 0;
		this.total = 0;

		console.log(this.day_id);

		this.voteCollection = new VoteCollection({
			day_id: this.day_id
		});
		this.listenTo(this.voteCollection, 'sync', this.calculateTotal);
		this.voteCollection.fetch();

		
		//checken of de punten al ingevuld zijn zodat je de juiste classes kan meegeven
	},

	calculateTotal: function(collection){
		console.log('[WinnerView] calculateTotal');
		console.log(collection);
		this.voteCollection.each(function(model){
			this.addTotal(model.attributes);
		
		}, this);
		this.user = new User({
			id: this.user_id 
		});
		this.user.fetch();
		this.listenTo(this.user, 'sync', this.triggerParent);

	},

	getTotal: function(){
		return this.total;
	},

	/*sortUsers: function(model){
		console.log(model);
		this.userCollection.add(model);
		this.listenTo(this.userCollection, 'add', this.sortUsers);

		if(this.userCollection.length >= 4){
			this.userCollection.sort();
		}

		console.log(this.userCollection);

	},*/

	addTotal: function(model){
		//console.log(model);
		this.geurTotaal += model.geur;
		this.gebakTotaal += model.gebak;
		this.gelachTotaal += model.gelach;

		var t = model.gebak + model.gelach + model.geur;
		this.total += t;
	},

	triggerParent: function(){
		Backbone.trigger('getInfo',this);
	},

	getInfo: function(){
		var obj = {
			id: this.user.get('id'),
			extension: this.user.get('extension'),
			name: this.user.get('name'),
			geur: this.geurTotaal,
			gebak: this.gebakTotaal,
			gelach: this.gelachTotaal,
			total: this.total
		};
		return obj;
	},

	/*render: function(){
		var obj = {
			id: this.user.get('id'),
			extension: this.user.get('extension'),
			name: this.user.get('name'),
			geur: this.geurTotaal,
			gebak: this.gebakTotaal,
			gelach: this.gelachTotaal,
			total: this.total
		};
		console.log(obj);
		$('.winners').append(this.template(obj));
		return this;
	},*/

	render: function(obj){
		console.log(obj);
		$('.winners').append(this.template(obj));
		return this;
	}


});

module.exports = WinnerView;