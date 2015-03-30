var template = require('../../../_hbs/vote.hbs');
var Week = require('../models/Week.js');

var VoteView = Backbone.View.extend({

	template: template,
	
	tagName: 'section',
	className: 'votes',
	events:{
		'click .vote': 'addVote'
	},

	initialize: function(options){

		if(options){
			this.week_id = options.id;
			this.day_id = options.id;
			this.user_id = options.id;
			this.model = options.model;
			this.me = options.me;
		}
		//checken of de punten al ingevuld zijn zodat je de juiste classes kan meegeven

		this.model.fetch({
			success: function(model,response){
				console.log(response);
				if(response.length === 0){
					//vote model bestaat nog niet ergo saven
					this.model.save();
				}
			}.bind(this)
		});
		
		
		//checken of er een vote is de dag ervoor en of als alles is ingevuld daar.
		this.votedYesterday = true;
		this.votedTomorrow = false;
		this.week = new Week({id:this.week_id});
		this.week.fetch({
			success:function(week,response){
				var yesterday = week.get('currentDate') - 1;
				if(yesterday > 0){
					var lastVote = new Vote({
						user_id: this.user_id,
						day_id: week.get('day'+yesterday + '_id')
					});
					lastVote.fetch({success:function(vote,response){
						if(vote.get('gebak') == -1 || vote.get('gelach') == -1 ||vote.get('geur') == -1){
							this.votedYesterday = false;
						}
					}.bind(this)});
				}
				var tomorrow = week.get('currentDate') + 1;
				if(tomorrow < 5){
					var nextVote = new Vote({
						user_id: this.user_id,
						day_id: week.get('day'+tomorrow + '_id')
					});
					nextvote.fetch({success:function(vote,response){
						if(response.length != 0){
							this.votedTomorrow = true;
						}
					}.bind(this)});
				}
				//if()
				
			}.bind(this)
		});


	},

	addVote: function(e){
		e.preventDefault();
		if(this.votedTomorrow){
			console.log('You can\'t change your vote.')
		}
		if(!this.votedYesterday){
			console.log('Go vote for yesterdag you twip.')
		}else{
			console.log('Changing vote');
			//
			var votedFor = $(e.currentTarget).parent().attr('class');
			var point = parseInt($(e.currentTarget).find('img').attr('alt'));
			console.log("votedFor " + votedFor + " and gave " + point + "points");

			this.model.set(votedFor,point);
			this.model.save();
			$(e.currentTarget).find('p').removeClass('voted');
			$(e.currentTarget).find('p[value='+point+']').addClass('voted');

			//this.addClasses()
		}

	},

	addClasses: function(model){
		console.log(model);
		switch(model.gebak){
			case 1: this.$el.find('.gebak .one').addClass('voted');break;
			case 2: this.$el.find('.gebak .two').addClass('voted');break;
			case 3: this.$el.find('.gebak .three').addClass('voted');break;
			default: this.$el.find('.gebak p').removeClass('voted');break;
		}
		switch(model.gelach){
			case 1: this.$el.find('.gelach .one').addClass('voted');break;
			case 2: this.$el.find('.gelach .two').addClass('voted');break;
			case 3: this.$el.find('.gelach .three').addClass('voted');break;
			default: this.$el.find('.gelach p').removeClass('voted');break;
		}
		switch(model.geur){
			case 1: this.$el.find('.geur .one').addClass('voted');break;
			case 2: this.$el.find('.geur .two').addClass('voted');break;
			case 3: this.$el.find('.geur .three').addClass('voted');break;
			default: this.$el.find('.geur p').removeClass('voted');break;
		}
	},

	render: function(){
		console.log('hullo');
		this.$el.html(this.template());
		this.addClasses(this.model.attributes);
		return this;
	}


});

module.exports = VoteView;