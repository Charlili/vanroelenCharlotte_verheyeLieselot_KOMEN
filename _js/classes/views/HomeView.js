//var UserCollection = require('../collections/UserCollection.js');
//var UserView = require('./UserView.js');
var User = require('../models/User.js');
var template = require('../../../_hbs/home.hbs');
var bcrypt = require('../../../js/vendor/bcrypt.min.js');

var HomeView = Backbone.View.extend({

	template: template,

	tagName: 'div',

	className: 'home-container',
	
	events: {
		'click .login-submit': 'login',
		'click .info': 'showInfo',
		'click .back': 'removeInfo'
	},

	initialize: function(){
		//if $_session[user] exists: email en pw invullen
		
	},

	login: function(e){
		e.preventDefault();
		//this.hideErrors();
		this.errorInput();

		console.log("HomeView: login");
		var error = false;
		//validation checks
		if(this.errorInput()){
			console.log("errorinput");
			error = true;
		}		
		if(!error){

			this.$el.find('.error-email').removeClass('error');
			this.$el.find('.error-pass').removeClass('error');
			this.$el.find('.email-input').removeClass('error');
			this.$el.find('.password-input').removeClass('error');

			//check if photo is valid
			
			//check of user bestaat
			this.user = new User({email: this.$el.find('.email-input').val()});
			this.user.fetch({
				success: function(model,response){
					//console.log(response);
					if(response.length === 0){
						this.$el.find('.error-email').addClass('error');
						this.$el.find('.error-email').html('U heeft een verkeerd e-mailadres ingegeven.');
						this.$el.find('.email-input').addClass('error');
						console.log('User doesnt exist! Error: wrong emailadress');
						
					}else{
						console.log('User exists! Check if password matches');
						if(bcrypt.compareSync(this.$el.find('.password-input').val(), model.get('password'))){
							console.log('Password matches. Save user in session');
							this.addToSession();
							
						}else{
							this.$el.find('.error-pass').addClass('error');
							this.$el.find('.error-pass').html('U heeft een verkeerd wachtwoord ingegeven.');
							this.$el.find('.password-input').addClass('error');
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
			//console.log('[HomeView] Saved user to session');
			Window.Application.navigate('waiting',{trigger:true});
		});
	},

	errorInput: function(){
		//console.log('error');
		var error = false;
		if(this.$el.find('.email-input').val() === ""){
			this.$el.find('.error-email').addClass('error');
			this.$el.find('.error-email').html('Vul a.u.b. een e-mailadres in');
			this.$el.find('.email-input').addClass('error');
			error = true;
		}
		if(this.$el.find('.password-input').val() === ""){
			this.$el.find('.error-pass').addClass('error');
			this.$el.find('.error-pass').html('Vul a.u.b. een wachtwoord in');
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

	},

	showInfo: function(){
		var $outerdiv = $(document.createElement('div'));
		$outerdiv.addClass('outer');
		var $middiv = $(document.createElement('div'));
		$middiv.addClass('mid');
		var $innerdiv = $(document.createElement('div'));
		$innerdiv.addClass('inner');
		var h1 = document.createElement('h1');
		h1.innerText = "info";

		var $p = $(document.createElement('p'));
		$p.text("Komen kaarten is een variant op Komen Eten. Vier dagen lang ga je met dezelfde mensen kaarten, elke dag bij iemand anders thuis. De winnaar ontvangt een zak kattenkorrels. Zet dus de koffie maar al klaar en vergeet niet je oven te voorverwarmen!");
		var $a = $(document.createElement('a'));
		$a.addClass('back');
		$a.text('Terug');
		$innerdiv.append(h1);
		$innerdiv.append($p);
		$innerdiv.append($a);

		$middiv.append($innerdiv);
		$outerdiv.append($middiv);

		this.$el.append($outerdiv);
	},

	removeInfo: function(){
		$('.outer').remove();
	}


});

module.exports = HomeView;