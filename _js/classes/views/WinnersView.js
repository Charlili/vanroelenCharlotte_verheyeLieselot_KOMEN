var template = require('../../../_hbs/winners.hbs');
//var Week = require('../models/Week.js');
var User = require('../models/User.js');
var Day = require('../models/Day.js');
var WinnerView = require('./WinnerView.js');
var UserCollection = require('../collections/UserCollection.js');
//var VoteCollection = require('../collections/VoteCollection.js');
var DayCollection = require('../collections/DayCollection.js');


var WinnersView = Backbone.View.extend({

	template: template,
	
	tagName: 'div',
	className: 'winners-container',
	events:{
		'click .vote': 'addVote'
	},

	initialize: function(){
		var loggedIn = $.get('api/me')
		.success(function(data){
			console.log(data);
			if(data.length === 0 || data.week_id === 0){
				console.log('No user logged in. Redirect to #home');
				Window.Application.navigate('home',{trigger:true});
			}else{
				this.week_id = data.week_id;
				this.dayCollection = new DayCollection({
					week_id: this.week_id
				});
				this.dayCollection.fetch();
				this.listenTo(this.dayCollection, 'sync', this.createEl);
			}
		}.bind(this)
		);
		
		Backbone.on('getInfo',this.getInfo);
		
		
	},

	createEl: function(collection){
		console.log('createEl');
		//this.render();
		//console.log(collection);

		this.dayCollection.each(function(model){
			console.log(model.attributes);

			var winnerView = new WinnerView({
				user_id: model.attributes.user_id,
				day_id: model.attributes.id	,
				parent: this
			});
			winnerView.on('getInfo',this.getInfo);
			

			//this.$winners.append(this.winnerView.render().el);
		
		});
		
	},

	getInfo: function(view){
		if(this.elementsArray === undefined){
			this.elementsArray = [];
		}
		console.log('should get info now');
		//console.log(view);
		var obj = view.getInfo();

		this.elementsArray.push(obj);
		//console.log(this.elementsArray.length);

		if(this.elementsArray.length == 4){
			//console.log('lalala');
			//this.elementsArray.sort();
			this.elementsArray.sort(function(a,b) { return parseFloat(b.total) - parseFloat(a.total) } );
			var i = 1;
			this.elementsArray.forEach(function(obj){
				obj['placed']=i;
				view.render(obj);
				i++;
				//this.$winners.append(view.render().el);
			}, this);
		}
	},

	renderUser: function(model){
		this.$winners.append(view.render().el);
	},

	render: function(){
		this.$el.html(this.template());
		this.$winners = this.$el.find('.winners');
		
		return this;
	}


});

module.exports = WinnersView;