!function e(t,i,n){function s(a,o){if(!i[a]){if(!t[a]){var l="function"==typeof require&&require;if(!o&&l)return l(a,!0);if(r)return r(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var c=i[a]={exports:{}};t[a][0].call(c.exports,function(e){var i=t[a][1][e];return s(i?i:e)},c,c.exports,e,t,i,n)}return i[a].exports}for(var r="function"==typeof require&&require,a=0;a<n.length;a++)s(n[a]);return s}({1:[function(e){function t(){Window.Application=new n,Backbone.history.start()}var i=e("hbsfy/runtime"),n=e("./classes/routers/Application.js");i.registerHelper("formatDate",function(e){return moment(e).format("MMMM, YYYY")}),i.registerHelper("formatWeek",function(e){var t=new Date(e).getDate(),i=new Date(e).getMonth(),n="",s=t+7;switch(i){case 1:n="januari";break;case 2:n="februari";break;case 3:n="maart";break;case 4:n="april";break;case 5:n="mei";break;case 6:n="juni";break;case 7:n="juli";break;case 8:n="augustus";break;case 9:n="september";break;case 10:n="oktober";break;case 11:n="november";break;case 12:n="december"}var r=t+" tot "+s+" "+n;return r}),i.registerHelper("formatText",function(e){return e.replace(/(\S*)/g,"<a href='#formats/$1'>$1</a>")}),$.ajaxSetup({statusCode:{401:function(){console.log("401 statuscode. There is no user logged in.")},403:function(){console.log("403 statuscode. User is not admin.")}}}),t()},{"./classes/routers/Application.js":13,"hbsfy/runtime":27}],2:[function(e,t){var i=e("hbsfy/runtime");t.exports=i.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return""},useData:!0})},{"hbsfy/runtime":27}],3:[function(e,t){var i=e("hbsfy/runtime");t.exports=i.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<h1><span>Komen Kaarten</span></h1>\n<p class="info"><a href="">i</a></p> \n<a href=\'#register\' title=\'Klik om te registeren\' class="register">Inschrijven</a>\n\n<p class="login-p">Al ingeschreven? Log in:</p>\n<form class="login" action="" method="post" accept-charset="utf-8">\n    <input type="text" name="email" placeholder="email@voorbeeld.be" class="email-input"  value=""/>\n    <input type="password" name="password" placeholder="paswoord" class="password-input" value=""/>\n    </select>\n    <input type="submit" class="login-submit" value="Log in"/>\n  </form>\n'},useData:!0})},{"hbsfy/runtime":27}],4:[function(e,t){var i=e("hbsfy/runtime");t.exports=i.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<form class="register" action="" method="post" enctype="multipart/form-data" accept-charset="utf-8">\n    <input type="text" name="name" placeholder="Voornaam Achternaam" class="name-input" value="Charlotte Vanroelen"/>\n    <input type="text" name="email" placeholder="emailadres" class="email-input" value="fetch@live.be"/>\n    <input type="password" name="password" placeholder="paswoord" class="password-input" value="1234"/>\n    <input type="file" name="photo" placeholder="photo" class="photo-input" value=""/>\n    <input type="text" name="street" placeholder="street" class="street-input" value="Resedastraat 53"/>\n    <input type="text" name="town" placeholder="8500" class="town-input" value="9000"/>\n    </select>\n    <input type="submit" class="submit" value="register"/>\n  </form>'},useData:!0})},{"hbsfy/runtime":27}],5:[function(e,t){var i=e("hbsfy/runtime");t.exports=i.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,i,n){var s,r="function",a=t.helperMissing,o=this.escapeExpression;return"<img href='' src='uploads/"+o((s=null!=(s=t.id||(null!=e?e.id:e))?s:a,typeof s===r?s.call(e,{name:"id",hash:{},data:n}):s))+".jpg'alt='afbeelding'/>\n<p>"+o((s=null!=(s=t.name||(null!=e?e.name:e))?s:a,typeof s===r?s.call(e,{name:"name",hash:{},data:n}):s))+"</p>"},useData:!0})},{"hbsfy/runtime":27}],6:[function(e,t){var i=e("hbsfy/runtime");t.exports=i.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,i,n){var s,r=t.helperMissing,a=this.escapeExpression;return"<h1>Deelnemers</h1>\n<p>"+a((t.formatWeek||e&&e.formatWeek||r).call(e,null!=(s=null!=e?e.attributes:e)?s.startDate:s,{name:"formatWeek",hash:{},data:n}))+"</p>\n<ul class='users'></ul>\n<a class='link' href='#' title='Klik om verder te gaan.'>Ga verder</a>"},useData:!0})},{"hbsfy/runtime":27}],7:[function(e,t){t.exports=e(2)},{"/Applications/MAMP/htdocs/MAIV/deelexamen/_hbs/day.hbs":2,"hbsfy/runtime":27}],8:[function(e,t){var i=e("../models/Day.js"),n=Backbone.Collection.extend({model:i,url:"/MAIV/deelexamen/api/days",initialize:function(){},comparator:function(e){return-e.get("id")},sync:function(e,t,i){t.methodUrl&&t.methodUrl(e.toLowerCase())&&(i=i||{},i.url=t.methodUrl(e.toLowerCase())),Backbone.Collection.prototype.sync.apply(this,arguments)}});t.exports=n},{"../models/Day.js":10}],9:[function(e,t){var i=e("../models/User.js"),n=Backbone.Collection.extend({model:i,url:"/MAIV/deelexamen/api/users",initialize:function(e){e&&(this.week_id=e.week_id)},methodUrl:function(e){return"read"===e&&this.week_id?void(this.url="/MAIV/deelexamen/api/week/users/"+this.week_id):void(this.url="/MAIV/deelexamen/api/users/")},sync:function(e,t,i){t.methodUrl&&t.methodUrl(e.toLowerCase())&&(i=i||{},i.url=t.methodUrl(e.toLowerCase())),Backbone.Collection.prototype.sync.apply(this,arguments)}});t.exports=n},{"../models/User.js":11}],10:[function(e,t){var i=Backbone.Model.extend({urlRoot:"/MAIV/deelexamen/api/days",initialize:function(e){e&&(this.user_id=e.user_id)},methodUrl:function(e){return"read"===e&&this.user_id?void(this.urlRoot="/MAIV/deelexamen/api/days/"+this.user_id):void(this.urlRoot="/MAIV/deelexamen/api/days/")},sync:function(e,t,i){t.methodUrl&&t.methodUrl(e.toLowerCase())&&(i=i||{},i.urlRoot=t.methodUrl(e.toLowerCase())),Backbone.Collection.prototype.sync.apply(this,arguments)}});t.exports=i},{}],11:[function(e,t){var i=Backbone.Model.extend({urlRoot:"/MAIV/deelexamen/api/users/",initialize:function(e){e&&(this.email=e.email)},methodUrl:function(e){return"read"===e&&this.email?void(this.urlRoot="/MAIV/deelexamen/api/users/"+this.email):void(this.urlRoot="/MAIV/deelexamen/api/users/")},sync:function(e,t,i){t.methodUrl&&t.methodUrl(e.toLowerCase())&&(i=i||{},i.urlRoot=t.methodUrl(e.toLowerCase())),Backbone.Collection.prototype.sync.apply(this,arguments)}});t.exports=i},{}],12:[function(e,t){var i=Backbone.Model.extend({urlRoot:"/MAIV/deelexamen/api/weeks",initialize:function(e){e&&(this.register=e.register)},methodUrl:function(e){return"read"===e&&this.register?void(this.urlRoot="/MAIV/deelexamen/api/weeks/last/"):void(this.urlRoot="/MAIV/deelexamen/api/weeks/")},sync:function(e,t,i){t.methodUrl&&t.methodUrl(e.toLowerCase())&&(i=i||{},i.urlRoot=t.methodUrl(e.toLowerCase())),Backbone.Collection.prototype.sync.apply(this,arguments)}});t.exports=i},{}],13:[function(e,t){var i=e("../views/HomeView.js"),n=e("../views/WeekView.js"),s=e("../views/RegisterView.js"),r=e("../views/WaitingView.js"),a=Backbone.Router.extend({routes:{home:"home",register:"register",waiting:"waiting",week:"week","*actions":"default"},empty:function(){$(".container").empty()},home:function(){this.empty(),this.home=new i,$(".container").append(this.home.render().el)},register:function(){this.empty(),this.register=new s,$(".container").append(this.register.render().el)},week:function(){this.empty(),this.week=new n,$(".container").append(this.week.render().el)},waiting:function(){this.empty(),this.waiting=new r,$(".container").append(this.waiting.render().el)},"default":function(){this.navigate("home",{trigger:!0}),console.log("defaulting")}});t.exports=a},{"../views/HomeView.js":15,"../views/RegisterView.js":16,"../views/WaitingView.js":18,"../views/WeekView.js":19}],14:[function(e,t){var i=e("../../../_hbs/day.hbs"),n=Backbone.View.extend({template:i,tagName:"li",initialize:function(){this.listenTo(this.model,"destroy",this.remove)},render:function(){return this.$el.html(this.template(this.model.attributes)),this}});t.exports=n},{"../../../_hbs/day.hbs":2}],15:[function(e,t){var i=e("../models/User.js"),n=e("../../../_hbs/home.hbs"),s=Backbone.View.extend({template:n,tagName:"div",className:"home-container",events:{"click .login-submit":"login"},initialize:function(){},login:function(e){e.preventDefault(),this.hideErrors(),console.log("HomeView: login");var t=!1;this.errorInput()&&(t=!0),t||(this.user=new i({email:this.$el.find(".email-input").val()}),this.user.fetch({success:function(e,t){0===t.length?console.log("User doesnt exist! Error: wrong emailadress"):(console.log("User exists! Check if password matches"),e.get("password")==this.$el.find(".password-input").val()?(console.log("Password matches. Save user in session"),this.addToSession()):console.log("User doesnt exist! Error: wrong emailadress"))}.bind(this)}))},addToSession:function(){console.log("HomeView: login - addToSession");var e={id:this.user.get("id")};$.post("api/me",e).success(function(){console.log("[HomeView] Saved user to session"),Window.Application.navigate("waiting",{trigger:!0})})},errorInput:function(){var e=!1;return""===this.$el.find(".email-input").val()&&(this.$el.find(".email-input").addClass("error"),e=!0),""===this.$el.find(".password-input").val()&&(this.$el.find(".password-input").addClass("error"),e=!0),e},hideErrors:function(){console.log("hiding errors"),""===this.$el.find(".email-input").val()&&this.$el.find(".email-input").removeClass("error"),""===this.$el.find(".password-input").val()&&this.$el.find(".password-input").removeClass("error")},render:function(){return this.$el.html(this.template()),this}});t.exports=s},{"../../../_hbs/home.hbs":3,"../models/User.js":11}],16:[function(e,t){var i=e("../../../_hbs/register.hbs"),n=e("../models/User.js"),s=e("../models/Week.js"),r=e("../models/Day.js"),a=(e("../collections/UserCollection.js"),Backbone.View.extend({template:i,tagName:"div",className:"register-container",events:{"click .submit":"addUser","change .photo-input":"previewImage"},initialize:function(){this.week,this.day,this.user},render:function(){return this.$el.html(this.template()),this},previewImage:function(){console.log("changed");var e=this.checkFile();0!=e&&$("form").append(e)},checkFile:function(){if(this.$el.find(".photo-input")[0].files.length>0){var e=this.$el.find(".photo-input")[0].files[0];if(-1!=e.type.search("image")){var t=new FileReader,i=document.createElement("img");return t.onload=function(){var e="no error in errorString";i.onload=function(){return i.width>800||i.height>800?void(e="De afbeelding moet kleiner zijn dan 800x800"):i.width!=i.height?void(e="De afbeelding moet vierkant zijn"):void 0},i.setAttribute("src",t.result)},t.readAsDataURL(e),i}return this.errorInput(),!1}return this.errorInput(),!1},addUser:function(e){e.preventDefault(),console.log("RegisterView: addUser");var t=!1;if(""===this.$el.find("input").val()&&(this.errorInput(),t=!0),!t){var i=this.checkFile();if(0!=i){var s=new n({email:this.$el.find(".email-input").val()});s.fetch({success:function(e,t){0===t.length?(console.log("addUser: User doesnt exist. Time to create.!"),this.saveUser()):console.log("addUser: User exists! Dont create user!")}.bind(this)})}}},saveUser:function(){this.user=new n({name:this.$el.find(".name-input").val(),email:this.$el.find(".email-input").val(),password:this.$el.find(".password-input").val(),street:this.$el.find(".street-input").val(),town:this.$el.find(".town-input").val()}),this.user.save(),this.listenToOnce(this.user,"sync",this.createWeek)},createWeek:function(){var e=new s({register:!0});e.fetch({success:function(t,i){if(console.log(i),i)this.week=e,console.log("this.week2 = "+this.week),this.week.save();else{console.log("No week exists. Create new week!");var n=new Date("Sun Apr 05 2015");n.setDate(n.getDate()),n.toDateString(),this.week=new s({startDate:n}),console.log("this.week1 = "+this.week),this.week.save()}this.listenToOnce(this.week,"sync",this.updateUser)}.bind(this)})},updateUser:function(){console.log("updating user with week_id which is "+this.week.get("id")),this.user.set("week_id",this.week.get("id")),this.user.save(),console.log("hello"),this.listenToOnce(this.user,"sync",this.createDay)},createDay:function(){console.log("In createDay function");for(var e=this.user.get("id"),t=1;4>=t;t++){var i=this.week.get("day"+t+"_id");if(0===i){console.log("day"+t+" is empty. Filling it in."),this.usersDay=t;var n=new Date(this.week.get("startDate"));if(n.setDate(n.getDate()+t),n.toDateString(),this.day=new r({user_id:e,week_id:this.week.get("id"),date:n}),this.day.save(),this.listenTo(this.day,"sync",this.updateWeek),4==t){var a=new Date(this.week.get("startDate"));a.setDate(a.getDate()+7),a.toDateString();var o=new s({startDate:a});o.save()}break}}},updateWeek:function(){console.log("this.usersDay: "+this.usersDay),console.log("day_id is: "+this.day.get("id")),this.week.set("day"+this.usersDay+"_id",this.day.get("id")),this.week.save(),this.addToSession()},addToSession:function(){console.log("RegisterView: addToSession"),Window.Application.activeUser=this.user;var e={id:this.user.get("id")};$.post("api/me",e).success(function(){console.log("[RegisterView] Saved user to session"),Window.Application.navigate("waiting",{trigger:!0})})},getInfo:function(e){return e},errorInput:function(){console.log("error"),""===this.$el.find(".name-input").val()&&this.$el.find(".name-input").addClass("error"),""===this.$el.find(".email-input").val()&&this.$el.find(".email-input").addClass("error"),""===this.$el.find(".password-input").val()&&this.$el.find(".password-input").addClass("error"),""===this.$el.find(".street-input").val()&&this.$el.find(".street-input").addClass("error"),""===this.$el.find(".town-input").val()&&this.$el.find(".town-input").addClass("error")},hideErrors:function(){console.log("hiding errors"),""===this.$el.find(".name-input").val()&&this.$el.find(".name-input").removeClass("error"),""===this.$el.find(".email-input").val()&&this.$el.find(".email-input").removeClass("error"),""===this.$el.find(".password-input").val()&&this.$el.find(".password-input").removeClass("error"),""===this.$el.find(".street-input").val()&&this.$el.find(".street-input").removeClass("error"),""===this.$el.find(".town-input").val()&&this.$el.find(".town-input").removeClass("error")}}));t.exports=a},{"../../../_hbs/register.hbs":4,"../collections/UserCollection.js":9,"../models/Day.js":10,"../models/User.js":11,"../models/Week.js":12}],17:[function(e,t){var i=e("../../../_hbs/user.hbs"),n=Backbone.View.extend({template:i,tagName:"li",initialize:function(){},render:function(){return this.$el.html(this.template(this.model.attributes)),this}});t.exports=n},{"../../../_hbs/user.hbs":5}],18:[function(e,t){var i=e("../collections/UserCollection.js"),n=e("./UserView.js"),s=(e("../models/User.js"),e("../models/Week.js")),r=e("../../../_hbs/waiting.hbs"),a=Backbone.View.extend({template:r,tagName:"div",className:"waiting-container",events:{"click .link":"clickLink"},initialize:function(){$.get("api/me").success(function(e){0===e.length?(console.log("No user logged in. Redirect to #home"),Window.Application.navigate("home",{trigger:!0})):(this.week=new s({id:e.week_id}),this.week.fetch(),console.log(this.week),this.listenTo(this.week,"sync",this.render),this.userCollection=new i({week_id:e.week_id}),this.listenTo(this.userCollection,"sync",this.renderUsers),this.userCollection.fetch())}.bind(this))},renderUsers:function(){console.log(this.userCollection),this.userCollection.length<4?(this.$a.prop("disabled","disabled"),this.$a.prop("href","#waiting")):this.$a.prop("href","#week"),this.userCollection.forEach(this.renderUser,this)},clickLink:function(e){e.preventDefault(),Window.Application.navigate("week",{trigger:!0})},renderUser:function(e){var t=new n({model:e});this.$users.append(t.render().el)},render:function(){return this.$el.html(this.template(this.week)),this.$users=this.$el.find(".users"),this.$a=this.$el.find(".link"),this}});t.exports=a},{"../../../_hbs/waiting.hbs":6,"../collections/UserCollection.js":9,"../models/User.js":11,"../models/Week.js":12,"./UserView.js":17}],19:[function(e,t){var i=e("../collections/DayCollection.js"),n=e("./DayView.js"),s=e("../../../_hbs/week.hbs"),r=Backbone.View.extend({template:s,tagName:"div",className:"week-container",events:{},initialize:function(){this.collection=new i,this.listenTo(this.collection,"sync",this.renderDays),this.collection.fetch()},renderDays:function(){this.$days.empty(),this.collection.sort(),this.collection.forEach(this.renderDay,this)},renderDay:function(e){var t=new n({model:e});this.$days.append(t.render().el)},render:function(){return this.$el.html(this.template()),this.$days=this.$el.find(".days"),this}});t.exports=r},{"../../../_hbs/week.hbs":7,"../collections/DayCollection.js":8,"./DayView.js":14}],20:[function(e,t,i){"use strict";var n=e("./handlebars/base"),s=e("./handlebars/safe-string")["default"],r=e("./handlebars/exception")["default"],a=e("./handlebars/utils"),o=e("./handlebars/runtime"),l=function(){var e=new n.HandlebarsEnvironment;return a.extend(e,n),e.SafeString=s,e.Exception=r,e.Utils=a,e.escapeExpression=a.escapeExpression,e.VM=o,e.template=function(t){return o.template(t,e)},e},u=l();u.create=l,u["default"]=u,i["default"]=u},{"./handlebars/base":21,"./handlebars/exception":22,"./handlebars/runtime":23,"./handlebars/safe-string":24,"./handlebars/utils":25}],21:[function(e,t,i){"use strict";function n(e,t){this.helpers=e||{},this.partials=t||{},s(this)}function s(e){e.registerHelper("helperMissing",function(){if(1===arguments.length)return void 0;throw new a("Missing helper: '"+arguments[arguments.length-1].name+"'")}),e.registerHelper("blockHelperMissing",function(t,i){var n=i.inverse,s=i.fn;if(t===!0)return s(this);if(t===!1||null==t)return n(this);if(c(t))return t.length>0?(i.ids&&(i.ids=[i.name]),e.helpers.each(t,i)):n(this);if(i.data&&i.ids){var a=g(i.data);a.contextPath=r.appendContextPath(i.data.contextPath,i.name),i={data:a}}return s(t,i)}),e.registerHelper("each",function(e,t){if(!t)throw new a("Must pass iterator to #each");var i,n,s=t.fn,o=t.inverse,l=0,u="";if(t.data&&t.ids&&(n=r.appendContextPath(t.data.contextPath,t.ids[0])+"."),h(e)&&(e=e.call(this)),t.data&&(i=g(t.data)),e&&"object"==typeof e)if(c(e))for(var d=e.length;d>l;l++)i&&(i.index=l,i.first=0===l,i.last=l===e.length-1,n&&(i.contextPath=n+l)),u+=s(e[l],{data:i});else for(var p in e)e.hasOwnProperty(p)&&(i&&(i.key=p,i.index=l,i.first=0===l,n&&(i.contextPath=n+p)),u+=s(e[p],{data:i}),l++);return 0===l&&(u=o(this)),u}),e.registerHelper("if",function(e,t){return h(e)&&(e=e.call(this)),!t.hash.includeZero&&!e||r.isEmpty(e)?t.inverse(this):t.fn(this)}),e.registerHelper("unless",function(t,i){return e.helpers["if"].call(this,t,{fn:i.inverse,inverse:i.fn,hash:i.hash})}),e.registerHelper("with",function(e,t){h(e)&&(e=e.call(this));var i=t.fn;if(r.isEmpty(e))return t.inverse(this);if(t.data&&t.ids){var n=g(t.data);n.contextPath=r.appendContextPath(t.data.contextPath,t.ids[0]),t={data:n}}return i(e,t)}),e.registerHelper("log",function(t,i){var n=i.data&&null!=i.data.level?parseInt(i.data.level,10):1;e.log(n,t)}),e.registerHelper("lookup",function(e,t){return e&&e[t]})}var r=e("./utils"),a=e("./exception")["default"],o="2.0.0";i.VERSION=o;var l=6;i.COMPILER_REVISION=l;var u={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:"== 1.x.x",5:"== 2.0.0-alpha.x",6:">= 2.0.0-beta.1"};i.REVISION_CHANGES=u;var c=r.isArray,h=r.isFunction,d=r.toString,p="[object Object]";i.HandlebarsEnvironment=n,n.prototype={constructor:n,logger:f,log:m,registerHelper:function(e,t){if(d.call(e)===p){if(t)throw new a("Arg not supported with multiple helpers");r.extend(this.helpers,e)}else this.helpers[e]=t},unregisterHelper:function(e){delete this.helpers[e]},registerPartial:function(e,t){d.call(e)===p?r.extend(this.partials,e):this.partials[e]=t},unregisterPartial:function(e){delete this.partials[e]}};var f={methodMap:{0:"debug",1:"info",2:"warn",3:"error"},DEBUG:0,INFO:1,WARN:2,ERROR:3,level:3,log:function(e,t){if(f.level<=e){var i=f.methodMap[e];"undefined"!=typeof console&&console[i]&&console[i].call(console,t)}}};i.logger=f;var m=f.log;i.log=m;var g=function(e){var t=r.extend({},e);return t._parent=e,t};i.createFrame=g},{"./exception":22,"./utils":25}],22:[function(e,t,i){"use strict";function n(e,t){var i;t&&t.firstLine&&(i=t.firstLine,e+=" - "+i+":"+t.firstColumn);for(var n=Error.prototype.constructor.call(this,e),r=0;r<s.length;r++)this[s[r]]=n[s[r]];i&&(this.lineNumber=i,this.column=t.firstColumn)}var s=["description","fileName","lineNumber","message","name","number","stack"];n.prototype=new Error,i["default"]=n},{}],23:[function(e,t,i){"use strict";function n(e){var t=e&&e[0]||1,i=h;if(t!==i){if(i>t){var n=d[i],s=d[t];throw new c("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+n+") or downgrade your runtime to an older version ("+s+").")}throw new c("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+e[1]+").")}}function s(e,t){if(!t)throw new c("No environment passed to template");if(!e||!e.main)throw new c("Unknown template object: "+typeof e);t.VM.checkRevision(e.compiler);var i=function(i,n,s,r,a,o,l,h,d){a&&(r=u.extend({},r,a));var p=t.VM.invokePartial.call(this,i,s,r,o,l,h,d);if(null==p&&t.compile){var f={helpers:o,partials:l,data:h,depths:d};l[s]=t.compile(i,{data:void 0!==h,compat:e.compat},t),p=l[s](r,f)}if(null!=p){if(n){for(var m=p.split("\n"),g=0,v=m.length;v>g&&(m[g]||g+1!==v);g++)m[g]=n+m[g];p=m.join("\n")}return p}throw new c("The partial "+s+" could not be compiled when running in runtime-only mode")},n={lookup:function(e,t){for(var i=e.length,n=0;i>n;n++)if(e[n]&&null!=e[n][t])return e[n][t]},lambda:function(e,t){return"function"==typeof e?e.call(t):e},escapeExpression:u.escapeExpression,invokePartial:i,fn:function(t){return e[t]},programs:[],program:function(e,t,i){var n=this.programs[e],s=this.fn(e);return t||i?n=r(this,e,s,t,i):n||(n=this.programs[e]=r(this,e,s)),n},data:function(e,t){for(;e&&t--;)e=e._parent;return e},merge:function(e,t){var i=e||t;return e&&t&&e!==t&&(i=u.extend({},t,e)),i},noop:t.VM.noop,compilerInfo:e.compiler},s=function(t,i){i=i||{};var r=i.data;s._setup(i),!i.partial&&e.useData&&(r=l(t,r));var a;return e.useDepths&&(a=i.depths?[t].concat(i.depths):[t]),e.main.call(n,t,n.helpers,n.partials,r,a)};return s.isTop=!0,s._setup=function(i){i.partial?(n.helpers=i.helpers,n.partials=i.partials):(n.helpers=n.merge(i.helpers,t.helpers),e.usePartial&&(n.partials=n.merge(i.partials,t.partials)))},s._child=function(t,i,s){if(e.useDepths&&!s)throw new c("must pass parent depths");return r(n,t,e[t],i,s)},s}function r(e,t,i,n,s){var r=function(t,r){return r=r||{},i.call(e,t,e.helpers,e.partials,r.data||n,s&&[t].concat(s))};return r.program=t,r.depth=s?s.length:0,r}function a(e,t,i,n,s,r,a){var o={partial:!0,helpers:n,partials:s,data:r,depths:a};if(void 0===e)throw new c("The partial "+t+" could not be found");return e instanceof Function?e(i,o):void 0}function o(){return""}function l(e,t){return t&&"root"in t||(t=t?p(t):{},t.root=e),t}var u=e("./utils"),c=e("./exception")["default"],h=e("./base").COMPILER_REVISION,d=e("./base").REVISION_CHANGES,p=e("./base").createFrame;i.checkRevision=n,i.template=s,i.program=r,i.invokePartial=a,i.noop=o},{"./base":21,"./exception":22,"./utils":25}],24:[function(e,t,i){"use strict";function n(e){this.string=e}n.prototype.toString=function(){return""+this.string},i["default"]=n},{}],25:[function(e,t,i){"use strict";function n(e){return u[e]}function s(e){for(var t=1;t<arguments.length;t++)for(var i in arguments[t])Object.prototype.hasOwnProperty.call(arguments[t],i)&&(e[i]=arguments[t][i]);return e}function r(e){return e instanceof l?e.toString():null==e?"":e?(e=""+e,h.test(e)?e.replace(c,n):e):e+""}function a(e){return e||0===e?f(e)&&0===e.length?!0:!1:!0}function o(e,t){return(e?e+".":"")+t}var l=e("./safe-string")["default"],u={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},c=/[&<>"'`]/g,h=/[&<>"'`]/;i.extend=s;var d=Object.prototype.toString;i.toString=d;var p=function(e){return"function"==typeof e};p(/x/)&&(p=function(e){return"function"==typeof e&&"[object Function]"===d.call(e)});var p;i.isFunction=p;var f=Array.isArray||function(e){return e&&"object"==typeof e?"[object Array]"===d.call(e):!1};i.isArray=f,i.escapeExpression=r,i.isEmpty=a,i.appendContextPath=o},{"./safe-string":24}],26:[function(e,t){t.exports=e("./dist/cjs/handlebars.runtime")},{"./dist/cjs/handlebars.runtime":20}],27:[function(e,t){t.exports=e("handlebars/runtime")["default"]},{"handlebars/runtime":26}]},{},[1]);
//# sourceMappingURL=app.js.map