!function e(t,i,s){function n(r,o){if(!i[r]){if(!t[r]){var l="function"==typeof require&&require;if(!o&&l)return l(r,!0);if(a)return a(r,!0);var d=new Error("Cannot find module '"+r+"'");throw d.code="MODULE_NOT_FOUND",d}var h=i[r]={exports:{}};t[r][0].call(h.exports,function(e){var i=t[r][1][e];return n(i?i:e)},h,h.exports,e,t,i,s)}return i[r].exports}for(var a="function"==typeof require&&require,r=0;r<s.length;r++)n(s[r]);return n}({1:[function(e){function t(){Window.Application=new s,Backbone.history.start()}var i=e("hbsfy/runtime"),s=e("./classes/routers/Application.js");i.registerHelper("formatWeek",function(e){var t=new Date(e).getDate(),i=new Date(e).getMonth(),s="",n=t+7;switch(i){case 1:s="januari";break;case 2:s="februari";break;case 3:s="maart";break;case 4:s="april";break;case 5:s="mei";break;case 6:s="juni";break;case 7:s="juli";break;case 8:s="augustus";break;case 9:s="september";break;case 10:s="oktober";break;case 11:s="november";break;case 12:s="december"}var a=t+" tot "+n+" "+s;return a}),i.registerHelper("endDate",function(e){var t=new Date(e).getMonth(),i=new Date(e).getDate()+5,s=t.toString(),n=i.toString();10>t&&(s="0"+t),10>i&&(n="0"+i);var a=n+"/"+s;return a}),i.registerHelper("formatDate",function(e){var t=e;return 10>e&&(t="0"+t),t}),i.registerHelper("formatText",function(e){return e.replace(/(\S*)/g,"<a href='#formats/$1'>$1</a>")}),$.ajaxSetup({statusCode:{401:function(){console.log("401 statuscode. There is no user logged in.")},403:function(){console.log("403 statuscode. User is not admin.")}}}),t()},{"./classes/routers/Application.js":15,"hbsfy/runtime":31}],2:[function(e,t){var i=e("hbsfy/runtime");t.exports=i.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,i,s){var n,a="function",r=t.helperMissing,o=this.escapeExpression;return"<h1>"+o((n=null!=(n=t.name||(null!=e?e.name:e))?n:r,typeof n===a?n.call(e,{name:"name",hash:{},data:s}):n))+"</h1>\n<p>"+o((n=null!=(n=t.date||(null!=e?e.date:e))?n:r,typeof n===a?n.call(e,{name:"date",hash:{},data:s}):n))+"</p>\n<div>\n	<h1>"+o((n=null!=(n=t.name||(null!=e?e.name:e))?n:r,typeof n===a?n.call(e,{name:"name",hash:{},data:s}):n))+"</h1>\n	<p>"+o((n=null!=(n=t.street||(null!=e?e.street:e))?n:r,typeof n===a?n.call(e,{name:"street",hash:{},data:s}):n))+",</p>\n	<p>"+o((n=null!=(n=t.town||(null!=e?e.town:e))?n:r,typeof n===a?n.call(e,{name:"town",hash:{},data:s}):n))+'</p>\n	<img src="" alt="foto" title="Dit is een foto van '+o((n=null!=(n=t.name||(null!=e?e.name:e))?n:r,typeof n===a?n.call(e,{name:"name",hash:{},data:s}):n))+"\"/>\n</div>\n<section class='votes'>\n</section>\n<section class='fotos'>\n</section>"},useData:!0})},{"hbsfy/runtime":31}],3:[function(e,t){var i=e("hbsfy/runtime");t.exports=i.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<h1><span>Komen Kaarten</span></h1>\n<p class="info"><a href="">i</a></p> \n<a href=\'#register\' title=\'Klik om te registeren\' class="register">Inschrijven</a>\n\n<p class="login-p gray-p">Al ingeschreven? Log in:</p>\n<form class="login" action="" method="post" accept-charset="utf-8">\n    <input type="text" name="email" placeholder="email@voorbeeld.be" class="email-input default-input"  value=""/>\n    <input type="password" name="password" placeholder="paswoord" class="password-input default-input" value=""/>\n  \n    </select>\n    <input type="submit" class="login-submit" value="Inloggen"/>\n  </form>\n'},useData:!0})},{"hbsfy/runtime":31}],4:[function(e,t){var i=e("hbsfy/runtime");t.exports=i.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<h1><span>Registreer</span></h1>\n<a href="#home" class="terug">terug</a>\n<p class="gray-p">Alle velden zijn verplicht</p>\n<p class="fieldset">Logingegevens</p>\n<form class="register" action="" method="post" enctype="multipart/form-data" accept-charset="utf-8">\n    <input type="text" name="name" placeholder="voornaam achternaam" class="name-input default-input" />\n    <input type="text" name="email" placeholder="e-mailadres" class="email-input default-input"/>\n    <input type="password" name="password" placeholder="wachtwoord" class="password-input default-input" />\n\n    <p class="fieldset fieldset-woonplaats">Woonplaats</p>\n\n    <input type="text" name="street" placeholder="straat + huisnummer" class="street-input default-input" />\n    <div class="group">\n	    <input type="text" name="town" placeholder="postcode" class="town-input default-input" />\n		<button type="button" class="use-location">gebruik mijn locatie</button>\n	</div>\n\n	<div class="center">\n    <div class="group group-photo">\n		<div class="photo-upload">\n	        <input type="file" name="photo" placeholder="photo" class="photo-input" value=""/>\n			<div class="frame"></div>\n		</div>\n	</div>\n\n	<div class="photo-p-div">\n	 <p class="photo-p">Je afbeelding mag niet groter zijn dan 5MB.</p>\n	</div>\n	</div>\n\n\n\n    <input type="submit" class="submit register-submit" value="Registreer"/>\n  </form>'},useData:!0})},{"hbsfy/runtime":31}],5:[function(e,t){var i=e("hbsfy/runtime");t.exports=i.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,i,s){var n,a="function",r=t.helperMissing,o=this.escapeExpression;return"<img href='' src='uploads/users/default.jpg'alt='afbeelding' class=\"img-usr\"/>\n\n<!--<img href='' src='uploads/users/"+o((n=null!=(n=t.id||(null!=e?e.id:e))?n:r,typeof n===a?n.call(e,{name:"id",hash:{},data:s}):n))+".jpg'alt='afbeelding'/>--->\n<p>"+o((n=null!=(n=t.name||(null!=e?e.name:e))?n:r,typeof n===a?n.call(e,{name:"name",hash:{},data:s}):n))+"</p>"},useData:!0})},{"hbsfy/runtime":31}],6:[function(e,t){var i=e("hbsfy/runtime");t.exports=i.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return"<header>\n	<h1>jouw beoordeling</h1>\n</header>\n<ul class='gebak'>\n	<p>Kwaliteit Gebak?</p>\n	<li class='vote'><img class='one' alt='1' title='click to vote'/></li>\n	<li class='vote'><img class='two' alt='2' title='click to vote'/></li>\n	<li class='vote'><img class='three' alt='3' title='click to vote'/></li>\n</ul>\n<ul class='gelach'>\n	<p>Goed gelachen?</p>\n	<li class='vote'><img class='one' alt='1' title='click to vote'/></li>\n	<li class='vote'><img class='two' alt='2' title='click to vote'/></li>\n	<li class='vote'><img class='three' alt='3' title='click to vote'/></li>\n</ul>\n<ul class='geur'>\n	<p>Geur van het huis?</p>\n	<li class='vote'><img class='one' alt='1' title='click to vote'/></li>\n	<li class='vote'><img class='two' alt='2' title='click to vote'/></li>\n	<li class='vote'><img class='three' alt='3' title='click to vote'/></li>\n</ul>"},useData:!0})},{"hbsfy/runtime":31}],7:[function(e,t){var i=e("hbsfy/runtime");t.exports=i.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,i,s){var n,a=t.helperMissing,r=this.escapeExpression;return'<h1><span>Deelnemers</span></h1>\n<p class="date-week">'+r((t.formatWeek||e&&e.formatWeek||a).call(e,null!=(n=null!=e?e.attributes:e)?n.startDate:n,{name:"formatWeek",hash:{},data:s}))+'</p>\n<img src="assets/long-curl-left.png" alt="ornament" class="img-curl" title="ornament" width="146"/> \n<ul class=\'users\'></ul>\n<a class=\'link ga-verder\' href=\'#\' title=\'Klik om verder te gaan.\'>Ga verder</a>'},useData:!0})},{"hbsfy/runtime":31}],8:[function(e,t){var i=e("hbsfy/runtime");t.exports=i.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,i,s){var n,a=t.helperMissing,r=this.escapeExpression;return'<h1 class="header-week"><span>jouw week</span></h1>\n<p class="gray-p">Klik op de pijl om je beoordeling<br/> van die dag te geven</p>\n<ul class=\'days\'></ul>\n<div class="winner">\n	<p>'+r((t.endDate||e&&e.endDate||a).call(e,null!=(n=null!=e?e.attributes:e)?n.startDate:n,{name:"endDate",hash:{},data:s}))+"</p>\n	<a class='link' title='Klik om de winnaar te zien!'>Bekendmaking winnaar</a>\n</div>"},useData:!0})},{"hbsfy/runtime":31}],9:[function(e,t){var i=e("hbsfy/runtime");t.exports=i.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,i,s){var n,a=t.helperMissing,r=this.escapeExpression,o="function";return'<a>\n	<div class="date-overview">\n		<p>'+r((t.formatDate||e&&e.formatDate||a).call(e,null!=e?e.day:e,{name:"formatDate",hash:{},data:s}))+"/"+r((t.formatDate||e&&e.formatDate||a).call(e,null!=e?e.month:e,{name:"formatDate",hash:{},data:s}))+'</p>\n	</div>\n	<div class="info-overview">\n		<h1>'+r((n=null!=(n=t.name||(null!=e?e.name:e))?n:a,typeof n===o?n.call(e,{name:"name",hash:{},data:s}):n))+"</h1>\n		<p>"+r((n=null!=(n=t.street||(null!=e?e.street:e))?n:a,typeof n===o?n.call(e,{name:"street",hash:{},data:s}):n))+",</p>\n		<p>"+r((n=null!=(n=t.town||(null!=e?e.town:e))?n:a,typeof n===o?n.call(e,{name:"town",hash:{},data:s}):n))+"</p>\n	</div>\n</a>"},useData:!0})},{"hbsfy/runtime":31}],10:[function(e,t){var i=e("../models/User.js"),s=Backbone.Collection.extend({model:i,url:"/MAIV/deelexamen/api/users",initialize:function(e){e&&(this.week_id=e.week_id)},methodUrl:function(e){return"read"===e&&this.week_id?void(this.url="/MAIV/deelexamen/api/week/users/"+this.week_id):void(this.url="/MAIV/deelexamen/api/users/")},sync:function(e,t,i){t.methodUrl&&t.methodUrl(e.toLowerCase())&&(i=i||{},i.url=t.methodUrl(e.toLowerCase())),Backbone.Collection.prototype.sync.apply(this,arguments)}});t.exports=s},{"../models/User.js":12}],11:[function(e,t){var i=Backbone.Model.extend({urlRoot:"/MAIV/deelexamen/api/days",initialize:function(e){e&&(this.user_id=e.user_id)},methodUrl:function(e){return"read"===e&&this.user_id?void(this.urlRoot="/MAIV/deelexamen/api/days/"+this.user_id):void(this.urlRoot="/MAIV/deelexamen/api/days/")},sync:function(e,t,i){t.methodUrl&&t.methodUrl(e.toLowerCase())&&(i=i||{},i.urlRoot=t.methodUrl(e.toLowerCase())),Backbone.Collection.prototype.sync.apply(this,arguments)}});t.exports=i},{}],12:[function(e,t){var i=Backbone.Model.extend({urlRoot:"/MAIV/deelexamen/api/users/",initialize:function(e){e&&(this.email=e.email)},methodUrl:function(e){return"read"===e&&this.email?void(this.urlRoot="/MAIV/deelexamen/api/users/"+this.email):void(this.urlRoot="/MAIV/deelexamen/api/users/")},sync:function(e,t,i){t.methodUrl&&t.methodUrl(e.toLowerCase())&&(i=i||{},i.urlRoot=t.methodUrl(e.toLowerCase())),Backbone.Collection.prototype.sync.apply(this,arguments)}});t.exports=i},{}],13:[function(e,t){var i=Backbone.Model.extend({urlRoot:"/MAIV/deelexamen/api/votes/",initialize:function(e){e&&(this.day_id=e.day_id,this.user_id=e.user_id)},methodUrl:function(e){return"read"===e&&this.day_id&&this.user_id?void(this.urlRoot="/MAIV/deelexamen/api/votes/"+this.day_id+"/"+this.user_id):void(this.urlRoot="/MAIV/deelexamen/api/votes/")},sync:function(e,t,i){t.methodUrl&&t.methodUrl(e.toLowerCase())&&(i=i||{},i.urlRoot=t.methodUrl(e.toLowerCase())),Backbone.Collection.prototype.sync.apply(this,arguments)}});t.exports=i},{}],14:[function(e,t){var i=Backbone.Model.extend({urlRoot:"/MAIV/deelexamen/api/weeks",initialize:function(e){e&&(this.register=e.register)},methodUrl:function(e){return"read"===e&&this.register?void(this.urlRoot="/MAIV/deelexamen/api/weeks/last/"):void(this.urlRoot="/MAIV/deelexamen/api/weeks/")},sync:function(e,t,i){t.methodUrl&&t.methodUrl(e.toLowerCase())&&(i=i||{},i.urlRoot=t.methodUrl(e.toLowerCase())),Backbone.Collection.prototype.sync.apply(this,arguments)}});t.exports=i},{}],15:[function(e,t){var i=e("../views/HomeView.js"),s=e("../views/DayView.js"),n=e("../views/WeekView.js"),a=e("../views/RegisterView.js"),r=e("../views/WaitingView.js"),o=Backbone.Router.extend({routes:{home:"home",register:"register",waiting:"waiting",week:"week","day/:day":"day","*actions":"default"},empty:function(){$(".container").empty()},home:function(){this.empty(),this.home=new i,$(".container").append(this.home.render().el)},register:function(){this.empty(),this.register=new a,$(".container").append(this.register.render().el)},week:function(){this.empty(),this.week=new n,$(".container").append(this.week.render().el)},waiting:function(){this.empty(),this.waiting=new r,$(".container").append(this.waiting.render().el)},day:function(e){this.empty(),this.day=new s({id:e}),$(".container").append(this.day.render().el)},"default":function(){this.navigate("home",{trigger:!0}),console.log("defaulting")}});t.exports=o},{"../views/DayView.js":16,"../views/HomeView.js":17,"../views/RegisterView.js":18,"../views/WaitingView.js":21,"../views/WeekView.js":23}],16:[function(e,t){var i=e("../models/Day.js"),s=e("../models/Vote.js"),n=e("../views/VoteView.js"),a=e("../../../_hbs/day.hbs"),r=Backbone.View.extend({template:a,tagName:"div",className:"day-container",events:{},initialize:function(e){e&&e.id&&(this.day=new i({id:e.id}));$.get("api/me").success(function(e){console.log(e),0===e.length?(console.log("No user logged in. Redirect to #home"),Window.Application.navigate("home",{trigger:!0})):(this.me=e.id,this.day.fetch({success:function(e,t){0===t.length?(console.log("Day doesnt exist!"),Window.Application.navigate("week",{trigger:!0})):(console.log("Day exists!"),this.day.get("user_id")!=this.me?this.createVoteView():console.log("Cant vote for yourself dearie."),this.render())}.bind(this)}))}.bind(this))},createVoteView:function(){var e=new s({day_id:this.day.get("id"),user_id:this.day.get("user_id")});this.voteView=new n({model:e,day_id:this.day.get("id"),user_id:this.day.get("user_id"),week_id:this.day.get("week_id"),me:this.me.id}),this.listenTo(this.voteView.model,"sync",this.renderVote)},renderVote:function(){this.$votes.append(this.voteView.render().el)},render:function(){return this.$el.html(this.template(this.day.attributes)),this.$votes=this.$el.find(".votes"),this}});t.exports=r},{"../../../_hbs/day.hbs":2,"../models/Day.js":11,"../models/Vote.js":13,"../views/VoteView.js":20}],17:[function(e,t){var i=e("../models/User.js"),s=e("../../../_hbs/home.hbs"),n=Backbone.View.extend({template:s,tagName:"div",className:"home-container",events:{"click .login-submit":"login"},initialize:function(){},login:function(e){e.preventDefault(),this.hideErrors(),console.log("HomeView: login");var t=!1;this.errorInput()&&(t=!0),t||(this.user=new i({email:this.$el.find(".email-input").val()}),this.user.fetch({success:function(e,t){0===t.length?console.log("User doesnt exist! Error: wrong emailadress"):(console.log("User exists! Check if password matches"),e.get("password")==this.$el.find(".password-input").val()?(console.log("Password matches. Save user in session"),this.addToSession()):console.log("User doesnt exist! Error: wrong emailadress"))}.bind(this)}))},addToSession:function(){console.log("HomeView: login - addToSession");var e={id:this.user.get("id")};$.post("api/me",e).success(function(){Window.Application.navigate("waiting",{trigger:!0})})},errorInput:function(){var e=!1;return""===this.$el.find(".email-input").val()&&(this.$el.find(".email-input").addClass("error"),e=!0),""===this.$el.find(".password-input").val()&&(this.$el.find(".password-input").addClass("error"),e=!0),e},hideErrors:function(){console.log("hiding errors"),""===this.$el.find(".email-input").val()&&this.$el.find(".email-input").removeClass("error"),""===this.$el.find(".password-input").val()&&this.$el.find(".password-input").removeClass("error")},render:function(){return this.$el.html(this.template()),this}});t.exports=n},{"../../../_hbs/home.hbs":3,"../models/User.js":12}],18:[function(e,t){var i=e("../../../_hbs/register.hbs"),s=e("../models/User.js"),n=e("../models/Week.js"),a=e("../models/Vote.js"),r=e("../models/Day.js"),o=(e("../collections/UserCollection.js"),Backbone.View.extend({template:i,tagName:"div",className:"register-container",events:{"click .submit":"addUser","change .photo-input":"previewImage"},initialize:function(){this.week,this.day,this.user},render:function(){return this.$el.html(this.template()),this},previewImage:function(){console.log("changed");var e=this.checkFile();0!=e&&$("form").append(e)},checkFile:function(){if(this.$el.find(".photo-input")[0].files.length>0){var e=this.$el.find(".photo-input")[0].files[0];if(-1!=e.type.search("image")){var t=new FileReader,i=document.createElement("img");return t.onload=function(){var e="no error in errorString";i.onload=function(){return i.width>800||i.height>800?void(e="De afbeelding moet kleiner zijn dan 800x800"):i.width!=i.height?void(e="De afbeelding moet vierkant zijn"):void 0},i.setAttribute("src",t.result)},t.readAsDataURL(e),i}return this.errorInput(),!1}return this.errorInput(),!1},addUser:function(e){e.preventDefault(),console.log("RegisterView: addUser");var t=!1;if(""===this.$el.find("input").val()&&(this.errorInput(),t=!0),!t){var i=this.checkFile();if(0!=i){var n=new s({email:this.$el.find(".email-input").val()});n.fetch({success:function(e,t){0===t.length?(console.log("addUser: User doesnt exist. Time to create.!"),this.saveUser()):console.log("addUser: User exists! Dont create user!")}.bind(this)})}}},saveUser:function(){this.user=new s({name:this.$el.find(".name-input").val(),email:this.$el.find(".email-input").val(),password:this.$el.find(".password-input").val(),street:this.$el.find(".street-input").val(),town:this.$el.find(".town-input").val()}),this.user.save(),this.listenToOnce(this.user,"sync",this.createWeek)},createWeek:function(){var e=new n({register:!0});e.fetch({success:function(t,i){if(console.log(i),i)this.week=e,console.log("this.week2 = "+this.week),this.week.save();else{console.log("No week exists. Create new week!");var s=new Date("Sun Apr 05 2015");s.setDate(s.getDate()),s.toDateString(),this.week=new n({startDate:s}),console.log("this.week1 = "+this.week),this.week.save()}this.listenToOnce(this.week,"sync",this.updateUser)}.bind(this)})},updateUser:function(){console.log("updating user with week_id which is "+this.week.get("id")),this.user.set("week_id",this.week.get("id")),this.user.save(),console.log("hello"),this.listenToOnce(this.user,"sync",this.createDay)},createDay:function(){console.log("In createDay function");for(var e=this.user.get("id"),t=1;4>=t;t++){var i=this.week.get("day"+t+"_id");if(0===i){console.log("day"+t+" is empty. Filling it in."),this.usersDay=t;var s=new Date(this.week.get("startDate"));if(s.setDate(s.getDate()+t),s.toDateString(),this.day=new r({user_id:e,week_id:this.week.get("id"),date:s}),this.day.save(),this.listenTo(this.day,"sync",this.updateWeek),4==t){var a=new Date(this.week.get("startDate"));a.setDate(a.getDate()+7),a.toDateString();var o=new n({startDate:a});o.save()}break}}},updateWeek:function(){console.log("this.usersDay: "+this.usersDay),console.log("day_id is: "+this.day.get("id")),this.week.set("day"+this.usersDay+"_id",this.day.get("id")),this.week.save(),this.addVoteForSelf()},addVoteForSelf:function(){this.vote=new a({user_id:this.user.get("id"),day_id:this.day.get("id"),gebak:0,gelach:0,geur:0}),this.vote.save(),this.listenToOnce(this.vote,"sync",this.addToSession)},addToSession:function(){console.log("RegisterView: addToSession"),Window.Application.activeUser=this.user;var e={id:this.user.get("id")};$.post("api/me",e).success(function(){console.log("[RegisterView] Saved user to session"),Window.Application.navigate("waiting",{trigger:!0})})},getInfo:function(e){return e},errorInput:function(){console.log("error"),""===this.$el.find(".name-input").val()&&this.$el.find(".name-input").addClass("error"),""===this.$el.find(".email-input").val()&&this.$el.find(".email-input").addClass("error"),""===this.$el.find(".password-input").val()&&this.$el.find(".password-input").addClass("error"),""===this.$el.find(".street-input").val()&&this.$el.find(".street-input").addClass("error"),""===this.$el.find(".town-input").val()&&this.$el.find(".town-input").addClass("error")},hideErrors:function(){console.log("hiding errors"),""===this.$el.find(".name-input").val()&&this.$el.find(".name-input").removeClass("error"),""===this.$el.find(".email-input").val()&&this.$el.find(".email-input").removeClass("error"),""===this.$el.find(".password-input").val()&&this.$el.find(".password-input").removeClass("error"),""===this.$el.find(".street-input").val()&&this.$el.find(".street-input").removeClass("error"),""===this.$el.find(".town-input").val()&&this.$el.find(".town-input").removeClass("error")}}));t.exports=o},{"../../../_hbs/register.hbs":4,"../collections/UserCollection.js":10,"../models/Day.js":11,"../models/User.js":12,"../models/Vote.js":13,"../models/Week.js":14}],19:[function(e,t){var i=e("../../../_hbs/user.hbs"),s=Backbone.View.extend({template:i,tagName:"li",initialize:function(){},render:function(){return this.$el.html(this.template(this.model.attributes)),this}});t.exports=s},{"../../../_hbs/user.hbs":5}],20:[function(e,t){var i=e("../../../_hbs/vote.hbs"),s=e("../models/Week.js"),n=Backbone.View.extend({template:i,events:{"click .vote":"addVote"},initialize:function(e){e&&(this.week_id=e.id,this.day_id=e.id,this.user_id=e.id,this.model=e.model,this.me=e.me),this.model.fetch({success:function(e,t){console.log(t),0===t.length&&this.model.save()}.bind(this)}),this.votedYesterday=!0,this.votedTomorrow=!1,this.week=new s({id:this.week_id}),this.week.fetch({success:function(e){var t=e.get("currentDate")-1;if(t>0){var i=new Vote({user_id:this.user_id,day_id:e.get("day"+t+"_id")});i.fetch({success:function(e){(-1==e.get("gebak")||-1==e.get("gelach")||-1==e.get("geur"))&&(this.votedYesterday=!1)}.bind(this)})}var s=e.get("currentDate")+1;if(5>s){{new Vote({user_id:this.user_id,day_id:e.get("day"+s+"_id")})}nextvote.fetch({success:function(e,t){0!=t.length&&(this.votedTomorrow=!0)}.bind(this)})}}.bind(this)})},addVote:function(e){if(e.preventDefault(),this.votedTomorrow&&console.log("You can't change your vote."),this.votedYesterday){console.log("Changing vote");var t=$(e.currentTarget).parent().attr("class"),i=parseInt($(e.currentTarget).find("img").attr("alt"));console.log("votedFor "+t+" and gave "+i+"points"),this.model.set(t,i),this.model.save(),$(e.currentTarget).find("img").removeClass("voted"),$(e.currentTarget).find("img[alt="+i+"]").addClass("voted")}else console.log("Go vote for yesterdag you twip.")},addClasses:function(e){switch(console.log(e),e.gebak){case 1:this.$el.find(".gebak .one").addClass("voted");break;case 2:this.$el.find(".gebak .two").addClass("voted");break;case 3:this.$el.find(".gebak .three").addClass("voted");break;default:this.$el.find(".gebak img").removeClass("voted")}switch(e.gelach){case 1:this.$el.find(".gelach .one").addClass("voted");break;case 2:this.$el.find(".gelach .two").addClass("voted");break;case 3:this.$el.find(".gelach .three").addClass("voted");break;default:this.$el.find(".gelach img").removeClass("voted")}switch(e.geur){case 1:this.$el.find(".geur .one").addClass("voted");break;case 2:this.$el.find(".geur .two").addClass("voted");break;case 3:this.$el.find(".geur .three").addClass("voted");break;default:this.$el.find(".geur img").removeClass("voted")}},render:function(){return console.log("hullo"),this.$el.html(this.template()),this.addClasses(this.model.attributes),this}});t.exports=n},{"../../../_hbs/vote.hbs":6,"../models/Week.js":14}],21:[function(e,t){var i=e("../collections/UserCollection.js"),s=e("./UserView.js"),n=(e("../models/User.js"),e("../models/Week.js")),a=e("../../../_hbs/waiting.hbs"),r=Backbone.View.extend({template:a,tagName:"div",className:"waiting-container",events:{"click .link":"clickLink"},initialize:function(){$.get("api/me").success(function(e){console.log(e),0===e.length?(console.log("No user logged in. Redirect to #home"),Window.Application.navigate("home",{trigger:!0})):(this.week=new n({id:e.week_id}),this.week.fetch(),console.log(this.week),this.listenTo(this.week,"sync",this.render),this.userCollection=new i({week_id:e.week_id}),this.listenTo(this.userCollection,"sync",this.renderUsers),this.userCollection.fetch())}.bind(this))},renderUsers:function(){console.log(this.userCollection),this.userCollection.length<4?(this.$a.prop("disabled","disabled"),this.$a.prop("href","#waiting")):this.$a.prop("href","#week"),this.userCollection.forEach(this.renderUser,this)},clickLink:function(e){e.preventDefault(),Window.Application.navigate("week",{trigger:!0})},renderUser:function(e,t){var i=["frame1","frame2","frame3","frame4"],n=new s({model:e,className:i[t]});this.$users.append(n.render().el)},render:function(){return this.$el.html(this.template(this.week)),this.$users=this.$el.find(".users"),this.$a=this.$el.find(".link"),this}});t.exports=r},{"../../../_hbs/waiting.hbs":7,"../collections/UserCollection.js":10,"../models/User.js":12,"../models/Week.js":14,"./UserView.js":19}],22:[function(e,t){var i=e("../../../_hbs/week_el.hbs"),s=e("../models/Day.js"),n=Backbone.View.extend({template:i,tagName:"li",initialize:function(e){this.startDate=e.startDate,this.count=e.count,this.active=e.active,this.thisDay=e.thisDay,this.model=e.model,this.day=new s({user_id:this.model.get("id")}),this.day.fetch(),this.listenTo(this.day,"sync",this.changeLink),this.d=new Date(this.startDate).getDate()+this.count,this.m=new Date(this.startDate).getMonth()},changeLink:function(){var e="#day/"+this.day.get("id");this.$el.find(".active").prop("href",e)},render:function(){var e={name:this.model.attributes.name,street:this.model.attributes.street,town:this.model.attributes.town,day:this.d,month:this.m};return this.$el.html(this.template(e)),this.active&&(this.thisDay&&this.$el.addClass("thisDay"),this.$el.find("a").addClass("active"),this.$el.find("a").prop("disabled","false")),console.log(this.active),this}});t.exports=n},{"../../../_hbs/week_el.hbs":9,"../models/Day.js":11}],23:[function(e,t){var i=e("../collections/UserCollection.js"),s=e("./WeekElView.js"),n=(e("../models/User.js"),e("../models/Week.js")),a=e("../../../_hbs/week.hbs"),r=Backbone.View.extend({template:a,tagName:"div",className:"week-container",initialize:function(){$.get("api/me").success(function(e){console.log(e),0===e.length?(console.log("No user logged in. Redirect to #home"),Window.Application.navigate("home",{trigger:!0})):(this.user_id=e.id,this.week=new n({id:e.week_id}),this.week.fetch(),console.log(this.week),this.listenTo(this.week,"sync",this.render),this.userCollection=new i({week_id:e.week_id}),this.listenTo(this.userCollection,"sync",this.renderUsers),this.userCollection.fetch())}.bind(this))},renderUsers:function(){console.log(this.userCollection),this.userCollection.length<4&&Window.Application.navigate("waiting",{trigger:!0}),this.week.get("currentDay")<5?this.$a.prop("disabled","disabled"):this.$a.prop("href","#winner"),this.count=1,this.userCollection.forEach(this.renderUser,this)},renderUser:function(e){var t=!1,i=!1;this.count<=this.week.get("currentDate")&&(t=!0),this.count==this.week.get("currentDate")&&(i=!0);var n=new s({model:e,startDate:this.week.get("startDate"),count:this.count,active:t,thisDay:i});this.count++,this.$users.append(n.render().el)},render:function(){return this.$el.html(this.template(this.week)),this.$users=this.$el.find(".days"),this.$a=this.$el.find(".link"),this}});t.exports=r},{"../../../_hbs/week.hbs":8,"../collections/UserCollection.js":10,"../models/User.js":12,"../models/Week.js":14,"./WeekElView.js":22}],24:[function(e,t,i){"use strict";var s=e("./handlebars/base"),n=e("./handlebars/safe-string")["default"],a=e("./handlebars/exception")["default"],r=e("./handlebars/utils"),o=e("./handlebars/runtime"),l=function(){var e=new s.HandlebarsEnvironment;return r.extend(e,s),e.SafeString=n,e.Exception=a,e.Utils=r,e.escapeExpression=r.escapeExpression,e.VM=o,e.template=function(t){return o.template(t,e)},e},d=l();d.create=l,d["default"]=d,i["default"]=d},{"./handlebars/base":25,"./handlebars/exception":26,"./handlebars/runtime":27,"./handlebars/safe-string":28,"./handlebars/utils":29}],25:[function(e,t,i){"use strict";function s(e,t){this.helpers=e||{},this.partials=t||{},n(this)}function n(e){e.registerHelper("helperMissing",function(){if(1===arguments.length)return void 0;throw new r("Missing helper: '"+arguments[arguments.length-1].name+"'")}),e.registerHelper("blockHelperMissing",function(t,i){var s=i.inverse,n=i.fn;if(t===!0)return n(this);if(t===!1||null==t)return s(this);if(h(t))return t.length>0?(i.ids&&(i.ids=[i.name]),e.helpers.each(t,i)):s(this);if(i.data&&i.ids){var r=g(i.data);r.contextPath=a.appendContextPath(i.data.contextPath,i.name),i={data:r}}return n(t,i)}),e.registerHelper("each",function(e,t){if(!t)throw new r("Must pass iterator to #each");var i,s,n=t.fn,o=t.inverse,l=0,d="";if(t.data&&t.ids&&(s=a.appendContextPath(t.data.contextPath,t.ids[0])+"."),c(e)&&(e=e.call(this)),t.data&&(i=g(t.data)),e&&"object"==typeof e)if(h(e))for(var u=e.length;u>l;l++)i&&(i.index=l,i.first=0===l,i.last=l===e.length-1,s&&(i.contextPath=s+l)),d+=n(e[l],{data:i});else for(var p in e)e.hasOwnProperty(p)&&(i&&(i.key=p,i.index=l,i.first=0===l,s&&(i.contextPath=s+p)),d+=n(e[p],{data:i}),l++);return 0===l&&(d=o(this)),d}),e.registerHelper("if",function(e,t){return c(e)&&(e=e.call(this)),!t.hash.includeZero&&!e||a.isEmpty(e)?t.inverse(this):t.fn(this)}),e.registerHelper("unless",function(t,i){return e.helpers["if"].call(this,t,{fn:i.inverse,inverse:i.fn,hash:i.hash})}),e.registerHelper("with",function(e,t){c(e)&&(e=e.call(this));var i=t.fn;if(a.isEmpty(e))return t.inverse(this);if(t.data&&t.ids){var s=g(t.data);s.contextPath=a.appendContextPath(t.data.contextPath,t.ids[0]),t={data:s}}return i(e,t)}),e.registerHelper("log",function(t,i){var s=i.data&&null!=i.data.level?parseInt(i.data.level,10):1;e.log(s,t)}),e.registerHelper("lookup",function(e,t){return e&&e[t]})}var a=e("./utils"),r=e("./exception")["default"],o="2.0.0";i.VERSION=o;var l=6;i.COMPILER_REVISION=l;var d={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:"== 1.x.x",5:"== 2.0.0-alpha.x",6:">= 2.0.0-beta.1"};i.REVISION_CHANGES=d;var h=a.isArray,c=a.isFunction,u=a.toString,p="[object Object]";i.HandlebarsEnvironment=s,s.prototype={constructor:s,logger:f,log:m,registerHelper:function(e,t){if(u.call(e)===p){if(t)throw new r("Arg not supported with multiple helpers");a.extend(this.helpers,e)}else this.helpers[e]=t},unregisterHelper:function(e){delete this.helpers[e]},registerPartial:function(e,t){u.call(e)===p?a.extend(this.partials,e):this.partials[e]=t},unregisterPartial:function(e){delete this.partials[e]}};var f={methodMap:{0:"debug",1:"info",2:"warn",3:"error"},DEBUG:0,INFO:1,WARN:2,ERROR:3,level:3,log:function(e,t){if(f.level<=e){var i=f.methodMap[e];"undefined"!=typeof console&&console[i]&&console[i].call(console,t)}}};i.logger=f;var m=f.log;i.log=m;var g=function(e){var t=a.extend({},e);return t._parent=e,t};i.createFrame=g},{"./exception":26,"./utils":29}],26:[function(e,t,i){"use strict";function s(e,t){var i;t&&t.firstLine&&(i=t.firstLine,e+=" - "+i+":"+t.firstColumn);for(var s=Error.prototype.constructor.call(this,e),a=0;a<n.length;a++)this[n[a]]=s[n[a]];i&&(this.lineNumber=i,this.column=t.firstColumn)}var n=["description","fileName","lineNumber","message","name","number","stack"];s.prototype=new Error,i["default"]=s},{}],27:[function(e,t,i){"use strict";function s(e){var t=e&&e[0]||1,i=c;if(t!==i){if(i>t){var s=u[i],n=u[t];throw new h("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+s+") or downgrade your runtime to an older version ("+n+").")}throw new h("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+e[1]+").")}}function n(e,t){if(!t)throw new h("No environment passed to template");if(!e||!e.main)throw new h("Unknown template object: "+typeof e);t.VM.checkRevision(e.compiler);var i=function(i,s,n,a,r,o,l,c,u){r&&(a=d.extend({},a,r));var p=t.VM.invokePartial.call(this,i,n,a,o,l,c,u);if(null==p&&t.compile){var f={helpers:o,partials:l,data:c,depths:u};l[n]=t.compile(i,{data:void 0!==c,compat:e.compat},t),p=l[n](a,f)}if(null!=p){if(s){for(var m=p.split("\n"),g=0,v=m.length;v>g&&(m[g]||g+1!==v);g++)m[g]=s+m[g];p=m.join("\n")}return p}throw new h("The partial "+n+" could not be compiled when running in runtime-only mode")},s={lookup:function(e,t){for(var i=e.length,s=0;i>s;s++)if(e[s]&&null!=e[s][t])return e[s][t]
},lambda:function(e,t){return"function"==typeof e?e.call(t):e},escapeExpression:d.escapeExpression,invokePartial:i,fn:function(t){return e[t]},programs:[],program:function(e,t,i){var s=this.programs[e],n=this.fn(e);return t||i?s=a(this,e,n,t,i):s||(s=this.programs[e]=a(this,e,n)),s},data:function(e,t){for(;e&&t--;)e=e._parent;return e},merge:function(e,t){var i=e||t;return e&&t&&e!==t&&(i=d.extend({},t,e)),i},noop:t.VM.noop,compilerInfo:e.compiler},n=function(t,i){i=i||{};var a=i.data;n._setup(i),!i.partial&&e.useData&&(a=l(t,a));var r;return e.useDepths&&(r=i.depths?[t].concat(i.depths):[t]),e.main.call(s,t,s.helpers,s.partials,a,r)};return n.isTop=!0,n._setup=function(i){i.partial?(s.helpers=i.helpers,s.partials=i.partials):(s.helpers=s.merge(i.helpers,t.helpers),e.usePartial&&(s.partials=s.merge(i.partials,t.partials)))},n._child=function(t,i,n){if(e.useDepths&&!n)throw new h("must pass parent depths");return a(s,t,e[t],i,n)},n}function a(e,t,i,s,n){var a=function(t,a){return a=a||{},i.call(e,t,e.helpers,e.partials,a.data||s,n&&[t].concat(n))};return a.program=t,a.depth=n?n.length:0,a}function r(e,t,i,s,n,a,r){var o={partial:!0,helpers:s,partials:n,data:a,depths:r};if(void 0===e)throw new h("The partial "+t+" could not be found");return e instanceof Function?e(i,o):void 0}function o(){return""}function l(e,t){return t&&"root"in t||(t=t?p(t):{},t.root=e),t}var d=e("./utils"),h=e("./exception")["default"],c=e("./base").COMPILER_REVISION,u=e("./base").REVISION_CHANGES,p=e("./base").createFrame;i.checkRevision=s,i.template=n,i.program=a,i.invokePartial=r,i.noop=o},{"./base":25,"./exception":26,"./utils":29}],28:[function(e,t,i){"use strict";function s(e){this.string=e}s.prototype.toString=function(){return""+this.string},i["default"]=s},{}],29:[function(e,t,i){"use strict";function s(e){return d[e]}function n(e){for(var t=1;t<arguments.length;t++)for(var i in arguments[t])Object.prototype.hasOwnProperty.call(arguments[t],i)&&(e[i]=arguments[t][i]);return e}function a(e){return e instanceof l?e.toString():null==e?"":e?(e=""+e,c.test(e)?e.replace(h,s):e):e+""}function r(e){return e||0===e?f(e)&&0===e.length?!0:!1:!0}function o(e,t){return(e?e+".":"")+t}var l=e("./safe-string")["default"],d={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},h=/[&<>"'`]/g,c=/[&<>"'`]/;i.extend=n;var u=Object.prototype.toString;i.toString=u;var p=function(e){return"function"==typeof e};p(/x/)&&(p=function(e){return"function"==typeof e&&"[object Function]"===u.call(e)});var p;i.isFunction=p;var f=Array.isArray||function(e){return e&&"object"==typeof e?"[object Array]"===u.call(e):!1};i.isArray=f,i.escapeExpression=a,i.isEmpty=r,i.appendContextPath=o},{"./safe-string":28}],30:[function(e,t){t.exports=e("./dist/cjs/handlebars.runtime")},{"./dist/cjs/handlebars.runtime":24}],31:[function(e,t){t.exports=e("handlebars/runtime")["default"]},{"handlebars/runtime":30}]},{},[1]);
//# sourceMappingURL=app.js.map