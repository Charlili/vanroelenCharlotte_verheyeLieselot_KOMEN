//var UserCollection = require('../collections/UserCollection.js');
//var UserView = require('./UserView.js');
var User = require('../models/User.js');
var template = require('../../../_hbs/home.hbs');

var HomeView = Backbone.View.extend({

	template: template,
	
	events: {
		'click .login-submit': 'login'
	},

	initialize: function(){
		//if $_session[user] exists: email en pw invullen
		
	},

	login: function(e){
		e.preventDefault();
		this.hideErrors();
		console.log("HomeView: login");
		var error = false;
		//validation checks
		if(!this.errorInput()){
			error = true;
		}		
		if(!error){
			//check if photo is valid
			
			//check of user bestaat
			this.user = new User({email: this.$el.find('.email-input').val()});
			this.user.fetch({
				success: function(model,response){
					//console.log(response);
					if(response.length === 0){
						console.log('User doesnt exist! Error: wrong emailadress');
						
					}else{
						console.log('User exists! Check if password matches');
						if(model.get('password') == this.$el.find('.password-input').val()){
							console.log('Password matches. Save user in session');
							this.addToSession();
							
						}else{
							console.log('User doesnt exist! Error: wrong emailadress');
						}
					}
				}.bind(this)
			});				
				//password hash via js?
				//Becrypt opzoeken
		}
	},

	addToSession: function(){
		console.log('HomeView: login - addToSession');
		//Window.Application.activeUser = this.user;
		//$.post('login.php',data);
		var dataUser = {
			'id': this.user.get('id')			
		};

		$.post('api/me',dataUser)
		.success(function(data){
			//console.log('flowchartId = ' + flowchartId);
			console.log('[HomeView] Saved user to session');
			Window.Application.navigate('waiting',{trigger:true});
		});
	},

	errorInput: function(){
		console.log('error');
		var error = false;
		if(this.$el.find('.email-input').val() === ""){
			this.$el.find('.email-input').addClass('error');
			error = true;
		}
		if(this.$el.find('.password-input').val() === ""){
			this.$el.find('.password-input').addClass('error');
			error = true;
		}
		return error;

	},

	hideErrors: function(){
		console.log('hiding errors');
		if(this.$el.find('.email-input').val() === ""){
			this.$el.find('.email-input').removeClass('error');
		}
		if(this.$el.find('.password-input').val() === ""){
			this.$el.find('.password-input').removeClass('error');
		}
	},

	render: function(){
		this.$el.html(this.template());
		//this.$users = this.$el.find('.tweets');

		return this;

	}

	/*addUser: function(e){
		e.preventDefault();

		if(this.$el.find('.textarea').val() === ""){
			return;
		}

		this.collection.create({
     		 text: this.$el.find('.textarea').val()
		});

		this.$el.find('.textarea').val("");
	
	}*/

});

module.exports = HomeView;