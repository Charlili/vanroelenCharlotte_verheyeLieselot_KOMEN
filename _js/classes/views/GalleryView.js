var template = require('../../../_hbs/gallery.hbs');
var Image = require('../models/Image.js');
var ImageCollection = require('../collections/ImageCollection.js');

var GalleryView = Backbone.View.extend({

	template: template,
	
	tagName: 'section',
	className: 'gallery',
	events:{
		'click .photo-upload': 'addImage'
	},

	initialize: function(options){

		if(options){
			this.day_id = options.day_id;
			//this.collection = options.collection;
		}
		//collectio vullen met images 
		//console.log(this.day_id);
		this.collection = new ImageCollection({
			day_id: this.day_id
		});
		this.listenTo(this.collection, 'sync', this.renderImages);
		this.collection.fetch({success:function(model,response){
			if(response.length === 0){
				console.log('empty collection');
			}
		}});


	},

	renderImages: function(){
		//this.$users.empty();
		//this.collection.sort();
		console.log(this.collection);
		this.collection.forEach(this.renderImage, this);
		
	},

	renderImage: function(model, key){

		var $img = $(document.createElement('img'));
		$img.addClass('image');
		var href = 'uploads/' + model.get('name') + model.get('extension');
		$img.attr('href',href);
		$img.attr('alt','image');
		$img.attr('title','Klik om te zien.');

		this.$el.append($img);
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
			        //console.log(sourceFile);
			        //var destFile = $($(resp.data).get(1)).val();
			        //console.log(destFile);
			    }
			}.bind(this);
			request.open('POST', 'api/upload/user');
			request.send(data);
			
			Window.Application.navigate('waiting',{trigger:true});
			//Window.Application.navigate('waiting',{trigger:true});
		}
	},

	checkFile: function(){
		console.log(this.$el.find('.photo-input'));
		if(this.$el.find('.photo-input')[0].files.length > 0){
			var file = this.$el.find('.photo-input')[0].files[0];
			var filename = file.val();
	        this.extension = filename.replace(/^.*\./, '.');
	        this.name = filename.replace(/^.\.*/, '');
	        console.log(this.name);
			
			if(file.type.search('image') != -1) {
				var reader = new FileReader();
				var img = document.createElement('img');
				$(img).addClass('photo-preview');
	        	reader.onload = function(event) {
		        	var errorString = "no error in errorString";
		        	img.onload = function() {
			          	if(img.width > 2592 || img.height > 2592) {
			              errorString = 'De afbeelding moet kleiner zijn dan 2593x1936';
			              return;
			            }
			            console.log(errorString);
		          	}
		          	img.setAttribute('src', reader.result);
		        };
		        reader.readAsDataURL(file);
		        return img;
			}else{
				return false;
			}
		}else{
			
			return false;
		}
		return false;
	},

	addImage: function(e){
		console.log('changed');
		var fileB = this.checkFile();
		console.log(fileB);
		if(fileB != false){
			this.collection.create({
				day_id: this.day_id,
				name: this.name,
				extension: this.extension
			});
			//this.$el.find('.photo-input').remove();
			this.$el.find('.preview-cont').append(fileB);

			//make 
		}
	},

	render: function(){
		console.log('hullo');
		this.$el.html(this.template());
		console.log(this.$el);
		return this;
	}


});

module.exports = GalleryView;