var template = require('../../../_hbs/register.hbs');
var User = require('../models/User.js');
var Week = require('../models/Week.js');
var UserCollection = require('../collections/UserCollection.js');
//var bcrypt = require('../../../js/vendor/bcrypt.min.js');

var RegisterView = Backbone.View.extend({

	template: template,
	
	tagName: 'div',

	events: {
		'click .submit': 'addUser',
		'change .photo-input': 'previewImage'
	},

	previewImage: function(e){
		console.log('changed');
		var file = this.checkFile();
		console.log(file);
		if(file != false){
			$('form').append(file);
		}
	},

	checkFile: function(){
		console.log("checkFile");
		if(this.$el.find('.photo-input')[0].files.length > 0){
			var file = this.$el.find('.photo-input')[0].files[0];
			if(file.type.search('image') != -1) {
				var reader = new FileReader();
				var img = document.createElement('img');
	        	reader.onload = function(event) {
		        	var errorString = "no error in errorString";
			            
		        	img.onload = function() {
			          	if(img.width > 800 || img.height > 800) {
			              errorString = 'De afbeelding moet kleiner zijn dan 800x800';
			              return;
			              
			            }if(img.width != img.height){
			              errorString = 'De afbeelding moet vierkant zijn';
			              return;
			            }
			            console.log(errorString);
		          	}
		          	img.setAttribute('src', reader.result);
		        };
		        reader.readAsDataURL(file);
		        return img;

			}else{
				this.errorInput();
				return false;
			}
		}else{
			this.errorInput();
			return false;
		}
		return false;
	},

	saveUser: function(){
		console.log('FF User doesn\'t exist');
		//console.log(this);

		//check for last week and get id so we can add it to the user's week_id
		var week = new Week({register: true});
		console.log(week);
		/*week.fetch({
			success: function(model,response){
				console.log(response);
				if(response.length === 0){
					console.log('FF User doesnt exist. Time to create.!');
					this.saveUser();
				}else{
					console.log('FF User exists! Dont create user!');
				}
			}.bind(this)
		});*/

		//var hash = bcrypt.hashSync(this.$el.find('.password-input').val(), 8);
		//console.log(hash);

		var user = new User({
			name: this.$el.find('.name-input').val(),
     		 email: this.$el.find('.email-input').val(),
     		 password: this.$el.find('.password-input').val(),
     		 street: this.$el.find('.street-input').val(),
     		 town: this.$el.find('.town-input').val()
		});
		//console.log(user);
		//user.save();

		//goto  

		this.$el.find('.name-input').val("");
				this.$el.find('.email-input').val("");
				this.$el.find('.password-input').val("");
				this.$el.find('.street-input').val("");
				this.$el.find('.town-input').val("");
				this.hideErrors();
		
	},

	addUser: function(e){
		e.preventDefault();
		console.log("RegisterView: addUser");

		var error = false;

		//

		if(this.$el.find('input').val() === ""){
			this.errorInput();
			error = true;
		}
		//console.log(this.$el.find('.photo-input'));
		
		if(!error){
			var file = this.checkFile();
			if(file != false){

				//check if user exists?
				//check via this.collection -> all users ophalen
				//mogelijk check via dao?
				var exist = new User({email: this.$el.find('.email-input').val()});
				exist.fetch({
					success: function(model,response){
						console.log(response);
						if(response.length === 0){
							console.log('FF User doesnt exist. Time to create.!');
							this.saveUser();
						}else{
							console.log('FF User exists! Dont create user!');
						}
					}.bind(this)
				});
				/*exist = $.get('/api/users/email/'+this.$el.find('.email-input').val());
				//console.log(exist)
				//methodUrl
				exist.done(function(){
					console.log('FF User exists!');
				}).fail(this.saveUser.bind(this));*/

				//password hash via js?
				//Becrypt opzoeken

				
			}
		}
		
	},

	errorInput: function(){
		console.log('error');
		if(this.$el.find('.name-input').val() === ""){
			this.$el.find('.name-input').addClass('error');
		}
		if(this.$el.find('.email-input').val() === ""){
			this.$el.find('.email-input').addClass('error');
		}
		if(this.$el.find('.password-input').val() === ""){
			this.$el.find('.password-input').addClass('error');
		}
		if(this.$el.find('.street-input').val() === ""){
			this.$el.find('.street-input').addClass('error');
		}
		if(this.$el.find('.town-input').val() === ""){
			this.$el.find('.town-input').addClass('error');
		}

	},

	hideErrors: function(){
		console.log('hiding errors');
		if(this.$el.find('.name-input').val() === ""){
			this.$el.find('.name-input').removeClass('error');
		}
		if(this.$el.find('.email-input').val() === ""){
			this.$el.find('.email-input').removeClass('error');
		}
		if(this.$el.find('.password-input').val() === ""){
			this.$el.find('.password-input').removeClass('error');
		}
		if(this.$el.find('.street-input').val() === ""){
			this.$el.find('.street-input').removeClass('error');
		}
		if(this.$el.find('.town-input').val() === ""){
			this.$el.find('.town-input').removeClass('error');
		}
	},

	initialize: function(){
			//view verwijderen:
			//this.listenTo(this.model, 'destroy', this.remove);
			//this.collection = new UserCollection();
			//this.collection.fetch();
			

	},

	render: function(){
		this.$el.html(this.template());
		return this;
	}


});

module.exports = RegisterView;