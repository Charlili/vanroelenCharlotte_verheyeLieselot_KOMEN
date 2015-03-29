var template = require('../../../_hbs/register.hbs');
var User = require('../models/User.js');
var Week = require('../models/Week.js');
var Vote = require('../models/Vote.js');
var Day = require('../models/Day.js');
var UserCollection = require('../collections/UserCollection.js');
//var bcrypt = require('../../../js/vendor/bcrypt.min.js');

var RegisterView = Backbone.View.extend({

	template: template,
	
	tagName: 'div',
	className: 'register-container',

	events: {
		'click .submit': 'addUser',
		'change .photo-input': 'previewImage'
	},

	initialize: function(){
			this.week;
			this.day;
			this.user;
	},

	render: function(){
		this.$el.html(this.template());
		return this;
	},

	previewImage: function(e){
		console.log('changed');
		var fileB = this.checkFile();
		if(fileB != false){
			$('form').append(fileB);
		}
	},

	checkFile: function(){
		//console.log("checkFile");
		if(this.$el.find('.photo-input')[0].files.length > 0){
			var file = this.$el.find('.photo-input')[0].files[0];
			if(file.type.search('image') != -1) {
				var reader = new FileReader();
				var img = document.createElement('img');
	        	reader.onload = function(event) {
		        	var errorString = "no error in errorString";
			            
		        	img.onload = function() {
			          	if(img.width > 2592 || img.height > 2592) {
			              errorString = 'De afbeelding moet kleiner zijn dan 2593x1936';
			              return;
			            }
			            //console.log(errorString);
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

	addUser: function(e){
		e.preventDefault();
		console.log("RegisterView: addUser");
		var error = false;
		//validation checks
		if(this.$el.find('input').val() === ""){
			this.errorInput();
			error = true;
		}		
		if(!error){
			//check if photo is valid
				//check of user bestaat
			var exist = new User({email: this.$el.find('.email-input').val()});
			exist.fetch({
				success: function(model,response){
					//console.log(response);
					if(response.length === 0){
						console.log('addUser: User doesnt exist. Time to create.!');
						this.saveUser();
					}else{
						console.log('addUser: User exists! Dont create user!');
					}
				}.bind(this)
			});				
			//password hash via js?
			//Becrypt opzoeken
		}		
	},

	saveImage: function(){
		var fileB = this.checkFile();
		if(fileB != false){

			var data = new FormData();
		    data.append('SelectedFile', this.$el.find('.photo-input')[0].files[0]);

		    //data.append('user_id', this.user.get['id']);

		    var request = new XMLHttpRequest();

			request.onreadystatechange = function(){
			    if(request.readyState == 4){
			        try {
			            var resp = JSON.parse(request.response);
			        } catch (e){
			            var resp = {
			                status: 'error',
			                data: request.responseText
			            };
			        }
			        sourceFile = $($(resp.data).get(0)).val();
			        console.log(sourceFile);
			        //var destFile = $($(resp.data).get(1)).val();
			        //console.log(destFile);
			    }
			}.bind(this);
			request.open('POST', 'api/upload/user');
			request.send(data);

			Window.Application.navigate('waiting',{trigger:true});

          	/*$.post('api/upload/user',formData)
			.success(function(data){
				console.log('[RegisterView] Saved image to db');						
			});*/
		}
	},

	saveUser: function(){
		this.user = new User({
			name: this.$el.find('.name-input').val(),
     		 email: this.$el.find('.email-input').val(),
     		 password: this.$el.find('.password-input').val(),
     		 street: this.$el.find('.street-input').val(),
     		 town: this.$el.find('.town-input').val()
		});
		this.user.save();
		this.listenToOnce(this.user,'sync',this.createWeek);
		//this.listenTo(this.user,'sync',this.addToSession);
		
	},

	createWeek: function(){
		//create new week and return week_id
		var week = new Week({register: true});
		week.fetch({
			success: function(model,response){
				console.log(response);
				if(!response){
					console.log('No week exists. Create new week!');
					var date =  new Date('Sun Apr 05 2015');
					date.setDate(date.getDate());
					date.toDateString();
					this.week = new Week({startDate: date});
					console.log('this.week1 = '+ this.week);
					this.week.save();
				}else{
					this.week = week;
					console.log('this.week2 = '+ this.week);
					this.week.save();
				}
				this.listenToOnce(this.week,'sync',this.updateUser);
			}.bind(this)
		});
		
	},

	updateUser: function(){
		console.log("updating user with week_id which is "+this.week.get('id'));
		this.user.set('week_id',this.week.get('id'));
		this.user.save();
		console.log('hello');
		this.listenToOnce(this.user,'sync',this.createDay);
		//Window.Application.navigate('loading',{trigger:true});
	},

	createDay: function(){

		console.log('In createDay function');
		var id = this.user.get('id');
		 for(var i = 1; i <= 4; i++) {
			var day_id = this.week.get('day'+i+'_id');
			if(day_id === 0){
				console.log('day'+i+' is empty. Filling it in.');
				this.usersDay = i;
				var dateDB =  new Date(this.week.get('startDate'));
				dateDB.setDate(dateDB.getDate() + i);
				dateDB.toDateString();

				this.day = new Day({
					user_id: id,
					week_id: this.week.get('id'),
					date: dateDB
				});
				this.day.save();
				this.listenTo(this.day,'sync',this.updateWeek);
				

				if(i == 4){
					//create empty new week
					var newDateDB =  new Date(this.week.get('startDate'));
						newDateDB.setDate(newDateDB.getDate() + 7);
						newDateDB.toDateString();
					var newWeek = new Week({
						startDate: newDateDB
					});
					newWeek.save();
				}
				break;
			}
		}
	},

	updateWeek: function(){
		console.log("this.usersDay: "+this.usersDay);
		console.log('day_id is: '+this.day.get('id'));
		this.week.set('day'+this.usersDay+'_id',this.day.get('id'));
		this.week.save();
		//this.listenTo(this.week,'sync',this.addVoteForSelf);
		this.addVoteForSelf();
		
	},

	addVoteForSelf: function(){
		//make vote for self with values 0 so that the vote-logica blijft werken
		this.vote = new Vote({
			user_id: this.user.get('id'),
			day_id: this.day.get('id'),
			gebak: 0,
			gelach: 0,
			geur: 0
		});
		this.vote.save();
		this.listenToOnce(this.vote,'sync',this.addToSession);
		
	},

	addToSession: function(){
		console.log('RegisterView: addToSession');
		//Window.Application.activeUser = this.user;
		//$.post('login.php',data);
		
		var dataUser = {
			'id': this.user.get('id')			
		};

		$.post('api/me',dataUser)
		.success(function(data){
			console.log('[RegisterView] Saved user to session');
			this.saveImage();
			
			
		}.bind(this));
	},

	getInfo: function(model){
		return model;
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
	}

});

module.exports = RegisterView;